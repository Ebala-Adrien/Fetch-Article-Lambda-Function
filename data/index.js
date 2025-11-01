export const ArticleCategory = {
    SPORTS: 'sports',
    BUSINESS: 'business',
    TECHNOLOGY: 'technology',
    SCIENCE: 'science',
    POLITICS: 'politics',
    HEALTH: 'health',
}

export const newsSources = [
    // {
    //     id: "bbc-en",
    //     name: "BBC English",
    //     language: "en",
    //     pages: [
    //         {
    //             category: null, // General BBC page
    //             url: "https://www.bbc.com",
    //             scraper: "bbcPageScraper"
    //         },
    //         {
    //             category: ArticleCategory.SPORTS,
    //             url: "https://www.bbc.com/sport",
    //             scraper: "bbcSportsPageScraper"
    //         },
    //         {
    //             category: ArticleCategory.BUSINESS,
    //             url: "https://www.bbc.com/business",
    //             scraper: "bbcPageScraper"
    //         },
    //         {
    //             category: ArticleCategory.TECHNOLOGY,
    //             url: "https://www.bbc.com/innovation",
    //             scraper: "bbcPageScraper"
    //         }
    //     ]
    // },
    {
        id: "bbc-sp",
        name: "BBC Spanish",
        language: "sp",
        pages: [
            {
                category: null, // General BBC page
                url: "https://www.bbc.com/mundo",
                scraper: "bbcSpanishAndPortugueseHomepageScraper"
            },
            // {
            //     category: ArticleCategory.SPORTS,
            //     url: "https://www.bbc.com/mundo/topics/cr50y726329t",
            //     scraper: "bbcSpanishAndPortugueseOtherPagesScraper"
            // },
            // {
            //     category: ArticleCategory.BUSINESS,
            //     url: "https://www.bbc.com/mundo/topics/c06gq9v4xp3t",
            //     scraper: "bbcSpanishAndPortugueseOtherPagesScraper"
            // },
            // {
            //     category: ArticleCategory.TECHNOLOGY,
            //     url: "https://www.bbc.com/mundo/topics/cyx5krnw38vt",
            //     scraper: "bbcSpanishAndPortugueseOtherPagesScraper"
            // },
            // {
            //     category: ArticleCategory.SCIENCE,
            //     url: "https://www.bbc.com/mundo/topics/ckdxnw959n7t",
            //     scraper: "bbcSpanishAndPortugueseOtherPagesScraper"
            // }
        ]
    },
    // {
    //     id: "bbc-pt",
    //     name: "BBC Portuguese",
    //     language: "pt",
    //     pages: [
    //         {
    //             category: null, // General BBC page
    //             url: "https://www.bbc.com/portuguese",
    //             scraper: "bbcSpanishAndPortugueseHomepageScraper"
    //         },
    //         {
    //             category: ArticleCategory.BUSINESS,
    //             url: "https://www.bbc.com/portuguese/topics/cvjp2jr0k9rt",
    //             scraper: "bbcSpanishAndPortugueseOtherPagesScraper"
    //         },
    //         {
    //             category: ArticleCategory.TECHNOLOGY,
    //             url: "https://www.bbc.com/portuguese/topics/c404v027pd4t",
    //             scraper: "bbcSpanishAndPortugueseOtherPagesScraper"
    //         },
    //         {
    //             category: ArticleCategory.SCIENCE,
    //             url: "https://www.bbc.com/portuguese/topics/cr50y580rjxt",
    //             scraper: "bbcSpanishAndPortugueseOtherPagesScraper"
    //         }
    //     ]
    // },
    // {
    //     id: "terra",
    //     name: "Terra",
    //     language: "pt",
    //     pages: [
    //         {
    //             category: null, // General Terra page
    //             url: "https://www.terra.com.br/",
    //             scraper: "terraPageScraper"
    //         },
    //         {
    //             category: ArticleCategory.SPORTS,
    //             url: "https://www.terra.com.br/esportes/",
    //             scraper: "terraPageScraper"
    //         },
    //         {
    //             category: ArticleCategory.BUSINESS,
    //             url: "https://www.terra.com.br/economia/",
    //             scraper: "terraPageScraper"
    //         },
    //         {
    //             category: ArticleCategory.TECHNOLOGY,
    //             url: "https://www.terra.com.br/byte/",
    //             scraper: "terraPageScraper"
    //         }
    //     ]
    // }
]
