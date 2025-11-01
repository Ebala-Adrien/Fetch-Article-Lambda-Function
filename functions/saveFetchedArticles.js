import connectDB from "../database/connection.js";
import Article from "../database/models/Article.js";


const saveFetchedArticles = async (articles) => {
    await connectDB();

    console.log(`🔍 Checking for duplicates among ${articles.length} articles`);

    // Process articles with duplicate detection
    const savedArticles = [];
    const seenUrls = new Set();
    let duplicateCount = 0;
    let savedCount = 0;

    for (const article of articles) {
        try {
            // Skip if URL already processed in this batch
            if (seenUrls.has(article.url)) {
                duplicateCount++;
                continue;
            }

            // Check if article already exists in database
            const existingArticle = await Article.findOne({ url: article.url });
            if (existingArticle) {
                duplicateCount++;
                continue;
            }

            // Save article to database
            const savedArticle = await Article.create({
                title: article.title,
                url: article.url,
                author: article.author || 'unknown',
                description: article.description || '',
                imageUrl: article.imageUrl,
                publicationDate: article.publishedDate || Date.now(),
                category: article.category,
                language: article.language,
                source: article.source,
                status: 'pending' // Will be processed by background job
            });

            savedArticles.push(savedArticle);
            seenUrls.add(article.url);
            savedCount++;
            console.log(`✅ Saved article: ${article.title} (${article.category || 'no category'})`);
        } catch (error) {
            console.error(`❌ Error processing article ${article.title}:`, error);
        }
    }

    console.log(`📊 Summary: ${savedCount} saved, ${duplicateCount} duplicates skipped`);

    return {
        savedArticles,
        savedCount,
        duplicateCount,
    };
}

export default saveFetchedArticles;