// BBC Spanish and Portuguese Page Scraper - for BBC Portuguese and BBC Spanish (Mundo)
import { load } from 'cheerio';

const bbcSpanishAndPortugueseOtherPagesScraper = async (url, category) => {
    const startTime = Date.now();
  
    try {
      console.log(`Scraping BBC Spanish/Portuguese page: ${url}${category ? ` (${category})` : ''}`);
  
      // Detect language from URL
      const isPortuguese = url.includes('/portuguese');
      const language = isPortuguese ? 'pt' : 'sp';
  
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
  
      // Extract articles from all topic-promos lists
      $('ul[data-testid="topic-promos"] li').each((index, li) => {
        try {
          const $li = $(li);
          const titleLink = $li.find('a').first();
          const title = titleLink.text().trim();
          const href = titleLink.attr('href') || '';
          const imageUrl = $li.find('.promo-image img').attr('src') || '';
          const description = $li.find('.promo-paragraph').text().trim();
  
          if(!title){
            console.log(`⚠️ Skipping article at index ${index + 1}: Missing title`);
            return
          }
  
          if(!href){
            console.log(`⚠️ Skipping article "${title}": Missing link`);
            return
          }
  
          if(!imageUrl){
            console.log(`⚠️ Skipping article "${title}": Missing image`);
            return
          }
        
          articles.push({
            title,
            url: href.startsWith('http') ? href : `https://www.bbc.com${href}`,
            imageUrl,
            description,
            publishedDate: new Date().toISOString(),
            language,
            source: 'bbc'
          });
        } catch (error) {
          console.error('Error processing article element:', error);
        }
      });
  
      return {
        success: true,
        articles,
        metadata: {
          totalFound: articles.length,
          processingTime: Date.now() - startTime,
          source: 'bbc',
          category
        }
      };
  
    } catch (error) {
      console.error('Error in BBC Spanish/Portuguese scraper:', error);
      return {
        success: false,
        articles: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          totalFound: 0,
          processingTime: Date.now() - startTime,
          source: 'bbc',
          category
        }
      };
    }
  };

  export default bbcSpanishAndPortugueseOtherPagesScraper;