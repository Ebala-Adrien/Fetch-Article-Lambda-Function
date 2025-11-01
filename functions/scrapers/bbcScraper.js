// BBC Page Scraper - for English pages (Business, Homepage, Innovation)
import { load } from 'cheerio';

const bbcPageScraper = async (url, category) => {
    const startTime = Date.now();
  
    try {
      console.log(`Scraping BBC English page: ${url}`);
  
      // Fetch page HTML
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        cache: 'no-store'
      });
      const html = await res.text();
      const $ = load(html);
  
      // Get all articles content
      const articles = [];
      $('[data-testid*="-card"]').has('[data-testid*="-article"]').each((index, el) => {
        try {
          const $el = $(el);
          const title = $el.find('[data-testid="card-headline"]').text().trim();
          const description = $el.find('[data-testid="card-description"]').text().trim();
          const link = $el.find('a[href*="/articles/"]').attr('href') || '';
          const img = $el.find('img').attr('src') || '';
  
          if (!title) {
            console.log(`⚠️ Skipping article at index ${index + 1}: Missing title`);
            return
          };
  
          if (!link) {
            console.log(`⚠️ Skipping article "${title}": Missing link`);
            return
          };
  
          // For now articles without description will be skipped. Only to keep a nice format in the database.
          if (!description) {
            console.log(`⚠️ Skipping article "${title}": Missing description`);
            return
          }
  
          // For now article without images will be skipped. Only to keep a nice format in the database.
          if (!img) return;
  
          articles.push({
            title,
            url: link.startsWith('http') ? link : `https://www.bbc.com${link}`,
            imageUrl: img?.startsWith('http') ? img : (img ? `https:${img}` : undefined),
            description,
            publishedDate: new Date().toISOString(),
            category,
            language: 'en',
            source: 'bbc'
          });
  
          console.log(`✅ English article ${index + 1}: "${title}"`);
  
        } catch (e) {
          console.error(`❌ Error processing English article ${index + 1}:`, e);
        }
      });
  
      console.log(`📊 Scraped ${articles.length} articles from BBC English page`);
  
      return {
        success: true,
        articles,
        metadata: {
          totalFound: articles.length,
          processingTime: Date.now() - startTime,
          source: 'bbc',
          category: undefined
        }
      };
  
    } catch (error) {
      console.error('Error in BBC English page scraper:', error);
      return {
        success: false,
        articles: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          totalFound: 0,
          processingTime: Date.now() - startTime,
          source: 'bbc'
        }
      };
    }
  };

export default bbcPageScraper;