import { newsSources } from '../../data/index.js';
export const determineSourcesToScrape = (sources, languages) => {
    // Determine which sources to scrape
    let sourcesToScrape = newsSources;
    
    if (!sources.includes('all')) {
      // Filter sources based on requested source IDs
      sourcesToScrape = newsSources.filter((source) => sources.includes(source.id));
    }

    // Filter by languages if specified
    if (!languages.includes('all')) {
      sourcesToScrape = sourcesToScrape.filter((source) => languages.includes(source.language));
    }

    return sourcesToScrape;
}