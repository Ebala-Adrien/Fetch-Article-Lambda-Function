// Terra Page Scraper - for all Terra pages
import { load } from 'cheerio';

const terraPageScraper = async (url, category) => {
    const startTime = Date.now();
  
    try {
      console.log(`Scraping Terra page: ${url}${category ? ` (${category})` : ''}`);
  
      // Fetch page HTML
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        cache: 'no-store'
      });
      const html = await res.text();
      const $ = load(html);
  
      // Extract articles from all news cards
      const articles = [];
      $('.card.card-news').each((index, card) => {
        try {
          const $card = $(card);
          const title = $card.find('h3').text().trim();
          const href = $card.find('.card-news__text--title').attr('href') || '';
          const imageUrl = $card.find('.card-news__image img').attr('src') || '';
  
          if (!title) {
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
            url: href.startsWith('http') ? href : `https://www.terra.com.br${href}`,
            imageUrl,
            description: '', // Not available in Terra structure
            publishedDate: new Date().toISOString(),
            category,
            language: 'pt',
            source: 'terra'
          });
        } catch (error) {
          console.error('Error processing Terra article element:', error);
        }
      });
  
      return {
        success: true,
        articles,
        metadata: {
          totalFound: articles.length,
          processingTime: Date.now() - startTime,
          source: 'terra',
          category
        }
      };
  
    } catch (error) {
      console.error('Error in Terra scraper:', error);
      return {
        success: false,
        articles: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          totalFound: 0,
          processingTime: Date.now() - startTime,
          source: 'terra',
          category
        }
      };
    }
  };

  export default terraPageScraper;