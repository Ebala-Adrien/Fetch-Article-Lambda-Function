import { determineSourcesToScrape } from './functions/utility/index.js';
import scrapeSources from './functions/scrapers/scrapeSources.js';
import saveFetchedArticles from './functions/saveFetchedArticles.js';

export const handler = async (event) => {

    const { sources = ['all'], languages = ['en', 'sp', 'pt'], categories = ['all'] } = event;

    console.log(`🚀 Starting latest news fetch with sources: ${sources.join(', ')}`);

    const sourcesToScrape = determineSourcesToScrape(sources, languages);

    console.log(`📋 Sources to scrape: ${sourcesToScrape.map((s) => s.name).join(', ')}`);

    const { allArticles, errors, totalFetched } = await scrapeSources(sourcesToScrape, categories);

    console.log(`\n ✅ Successfully scraped ${totalFetched} articles`);
    console.log(`✅ Got ${allArticles.length} valid articles`);

    const { savedArticles, savedCount, duplicateCount } = await saveFetchedArticles(allArticles);

    console.log(`\n ✅ Successfully saved ${savedCount} articles`);
    console.log(`✅ Skipped ${duplicateCount} duplicate articles`);

    const response = {
        statusCode: 200,
        body: { totalFetched, savedCount, duplicateCount, errors, allArticles,  savedArticles },
    };
    return response;
};

