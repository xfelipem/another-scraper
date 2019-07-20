// THIRD PARTY DEPENDENCIES
const axios = require('axios');

// INTERNAL DEPENDENCIES
const { createCheerioScraper, RegexEngine } = require('../index');

/**
 * @const {Object} dataMovieCheerioExtractors Extractors for cheerio engine.
 */
const dataMovieCheerioExtractors = {
  title: ($) => $('.title_wrapper').find('h1').text(),
  release: ($) => $('.summary_text').text(),
  rating: ($) => $('.ratingValue').find('strong').find('span').text()
};
/**
 * @const {Object} dataMovieCheerioExtractors Extractors for cheerio engine.
 */
const dataUrlsRegexpExtractors = {
  urls: (html) => html.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)
};

// Get the website
axios.get('http://www.imdb.com/title/tt1229340/')
  .then((response) => {
    const { data: html } = response;

    if (html) {
      // Create scraper, load extractors and html
      const dataMovieCheerioScraper = createCheerioScraper(dataMovieCheerioExtractors, html);
      // Scrap
      const dataMovieFromCheerio = dataMovieCheerioScraper.scrapLoadedHtml();
      const dataMovieFromRegex = dataMovieCheerioScraper
        // Change Engine
        .loadEngine(RegexEngine)
        // Load extractors
        .loadExtractors(dataUrlsRegexpExtractors)
        // Scrap
        .scrapLoadedHtml();
        
      // Show data
      console.log({
        ...dataMovieFromCheerio,
        // Remember, identical keys will override the dataMovieFromCheerio values.
        ...dataMovieFromRegex
      });
    }
  });
