import { newsSources } from '../../data/index.js';

/**
 * Validates a list of articles against the defined news sources.
 * Checks if the source exists and if the language matches the source configuration.
 * 
 * @param {Array} articles - List of articles to validate
 * @returns {Object} - { validArticles, validationErrors }
 */
const validateArticles = (articles) => {
    const validArticles = [];
    const validationErrors = [];

    for (const article of articles) {
        const { source: sourceId, language, url, title } = article;

        // Check if source exists
        const sourceConfig = newsSources.find(s => s.id === sourceId);

        if (!sourceConfig) {
            validationErrors.push(`Invalid source '${sourceId}' for article: ${title || url}`);
            continue;
        }

        // Check if language matches source
        if (sourceConfig.language !== language) {
            validationErrors.push(`Language mismatch for article: ${title || url}. Expected '${sourceConfig.language}' for source '${sourceId}', but got '${language}'`);
            continue;
        }

        validArticles.push(article);
    }

    return { validArticles, validationErrors };
};

export default validateArticles;
