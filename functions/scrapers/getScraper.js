import bbcPageScraper from './bbcScraper.js';
import bbcSportsPageScraper from './bbcSportsScraper.js';
import bbcSpanishAndPortugueseHomepageScraper from './bbcSpanishAndPortugueseHomepageScraper.js';
import bbcSpanishAndPortugueseOtherPagesScraper from './bbcSpanishAndPortugueseOtherPagesScraper.js';
import terraPageScraper from './terraScraper.js';

// Scraper Registry - maps scraper names to functions
const pageScrapers = {
    bbcPageScraper,
    bbcSportsPageScraper,
    bbcSpanishAndPortugueseHomepageScraper,
    bbcSpanishAndPortugueseOtherPagesScraper,
    terraPageScraper,
};

// Function to get scraper by name
const getScraper = (scraperName) => {
    return pageScrapers[scraperName];
};

export default getScraper;
