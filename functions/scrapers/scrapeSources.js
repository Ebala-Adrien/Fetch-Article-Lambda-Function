import getScraper from './getScraper.js';

const scrapeSources = async (sourcesToScrape, categories) => {
    let allArticles = [];
    const errors = [];
    let totalFetched = 0;

    // Scrape each source
    for (const source of sourcesToScrape) {
        console.log(`🔍 Scraping source: ${source.name} (${source.language})`);

        for (const page of source.pages) {
            try {
                // Skip if category filtering is specified and doesn't match
                if (!categories.includes('all') && page.category && !categories.includes(page.category)) {
                    console.log(`⏭️ Skipping ${page.url} - category ${page.category} not requested`);
                    continue;
                }

                console.log(`📄 Scraping page: ${page.url} (${page.category || 'general'})`);

                // Get the appropriate scraper
                const scraper = getScraper(page.scraper);
                if (!scraper) {
                    console.error(`❌ Scraper not found: ${page.scraper}`);
                    errors.push(`Scraper not found: ${page.scraper}`);
                    continue;
                }

                // Run the scraper
                const result = await scraper(page.url, page.category ? (page.category) : undefined);

                if (result.success) {
                    console.log(`✅ Successfully scraped ${result.articles.length} articles from ${page.url}`);

                    // Add source and page info to each article
                    const articlesWithMetadata = result.articles.map((article) => ({
                        ...article,
                        sourceName: source.name,
                    }));

                    allArticles.push(...articlesWithMetadata);
                    totalFetched += result.articles.length;
                } else {
                    console.error(`❌ Failed to scrape ${page.url}: ${result.error}`);
                    errors.push(`Failed to scrape ${page.url}: ${result.error}`);
                }
            } catch (error) {
                console.error(`❌ Error scraping ${page.url}:`, error);
                errors.push(`Error scraping ${page.url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
    }

    // Sort articles by category priority (articles with category first)
    allArticles = allArticles.sort((a, b) => {
        // Articles with category come first (higher priority)
        if (a.category && !b.category) return -1;
        if (!a.category && b.category) return 1;
        return 0; // Same priority, maintain original order
    });

    return {
        allArticles,
        errors,
        totalFetched
    }
}

export default scrapeSources;