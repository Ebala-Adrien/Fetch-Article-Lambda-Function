import { determineSourcesToScrape } from './functions/utility/index.js';
import scrapeSources from './functions/scrapers/scrapeSources.js';
import saveFetchedArticles from './functions/saveFetchedArticles.js';
import validateArticles from './functions/utility/validateArticles.js';

export const handler = async (event) => {
    if (event.body) {
        event = JSON.parse(event.body);
    }

    const { sources = ['all'], languages = ['en', 'sp', 'pt'], categories = ['all'], articles } = event;

    let allArticles = [];
    let errors = [];
    let totalFetched = 0;

    if (articles && Array.isArray(articles) && articles.length > 0) {
        console.log(`🚀 Starting direct articles save with ${articles.length} items`);

        // Validate articles
        const validationResult = validateArticles(articles);

        if (validationResult.validationErrors.length > 0) errors.push(...validationResult.validationErrors)

        // Directly save the provided valid articles, skipping the scraping process
        // Map source IDs to database enums (e.g. bbc-en -> bbc)
        allArticles = validationResult.validArticles.map(article => {
            let dbSource = article.source;
            if (article.source.startsWith('bbc-')) {
                dbSource = 'bbc';
            }
            return { ...article, source: dbSource };
        });

        totalFetched = allArticles.length;

    } else {
        console.log(`🚀 Starting latest news fetch with sources: ${sources.join(', ')}`);
        const sourcesToScrape = determineSourcesToScrape(sources, languages);
        console.log(`📋 Sources to scrape: ${sourcesToScrape.map((s) => s.name).join(', ')}`);

        const scrapeResult = await scrapeSources(sourcesToScrape, categories);
        allArticles = scrapeResult.allArticles;
        if (scrapeResult.errors) {
            errors.push(...scrapeResult.errors);
        }
        totalFetched = scrapeResult.totalFetched;
    }

    console.log(`\n ✅ Successfully processed ${totalFetched} articles`);
    console.log(`✅ Got ${allArticles.length} valid articles`);

    const { savedArticles, savedCount, duplicateCount } = await saveFetchedArticles(allArticles);

    console.log(`\n ✅ Successfully saved ${savedCount} articles`);
    console.log(`✅ Skipped ${duplicateCount} duplicate articles`);

    const response = {
        statusCode: 200,
        body: JSON.stringify({ totalFetched, savedCount, duplicateCount, errors, allArticles, savedArticles }),
    };
    return response;
};