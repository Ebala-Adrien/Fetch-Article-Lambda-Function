// BBC Sports Page Scraper - for BBC Sports pages
import { load } from 'cheerio';
import { ArticleCategory } from '../../data/index.js';

const bbcSportsPageScraper = async (url) => {
  const startTime = Date.now();

  try {
    console.log(`Scraping BBC Sports page: ${url}`);

    // Fetch page HTML
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      },
      cache: 'no-store'
    });
    const html = await res.text();
    const $ = load(html);

    // Sports page scraping - uses data-testid="promo" + type="article" pattern
    console.log(`🏈 Using Sports page scraper with promo + type="article" pattern`);

    const articles = [];
    $('[data-testid="promo"][type="article"]').each((index, el) => {
      try {
        const $el = $(el);
        const title = $el.find('.ssrcss-1b1mki6-PromoHeadline').text().trim();
        const description = $el.find('.ssrcss-1q0x1qg-Paragraph').text().trim();
        const link = $el.find('a[href]').attr('href') || '';

        // Find the best image (avoid placeholders)
        let img = '';
        const $imgs = $el.find('img');
        $imgs.each((i, imgEl) => {
          const src = $(imgEl).attr('src');
          if (src && !src.includes('placeholder')) {
            img = src;
            return false; // break loop
          }
        });

        // Fallback: if no non-placeholder found, check for srcset or use first image
        if (!img && $imgs.length > 0) {
          // Try to get from srcset of the second image if available (often the real one)
          const srcSet = $imgs.eq(1).attr('srcset');
          if (srcSet) {
            // Extract the last URL from srcset (usually the largest)
            const matches = srcSet.match(/https?:\/\/[^\s]+/g);
            if (matches && matches.length > 0) {
              img = matches[matches.length - 1];
            }
          }

          if (!img) {
            img = $imgs.attr('src') || '';
          }
        }

        if (!title) {
          console.log(`⚠️ Skipping article at index ${index + 1}: Missing title`);
          return
        };

        if (!link) {
          console.log(`⚠️ Skipping article "${title}": Missing link`);
          return
        };

        // For now article without images will be skipped. Only to keep a nice format in the database.
        if (!img) return;

        articles.push({
          title,
          url: link.startsWith('http') ? link : `https://www.bbc.com${link}`,
          imageUrl: img?.startsWith('http') ? img : (img ? `https:${img}` : undefined),
          description,
          publishedDate: new Date().toISOString(),
          language: 'en',
          source: 'bbc',
          category: ArticleCategory.SPORTS
        });

      } catch (e) {
        console.error(`❌ Error processing sports article ${index + 1}:`, e);
      }
    });

    console.log(`📊 Scraped ${articles.length} articles from BBC Sports page`);

    return {
      success: true,
      articles,
      metadata: {
        totalFound: articles.length,
        processingTime: Date.now() - startTime,
        source: 'bbc',
        category: ArticleCategory.SPORTS
      }
    };

  } catch (error) {
    console.error('Error in BBC Sports page scraper:', error);
    return {
      success: false,
      articles: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: {
        totalFound: 0,
        processingTime: Date.now() - startTime,
        source: 'bbc',
        category: ArticleCategory.SPORTS
      }
    };
  }
};

export default bbcSportsPageScraper;