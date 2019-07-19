// THIRD PARTY DEPENDENCIES
const axios = require('axios');

// INTERNAL DEPENDENCIES
const { createCheerioScraper, createRegexScraper } = require('../index');

// Data extractors
const dataMovieCheerioExtractors = {
  title: ($) => $('.title_wrapper').find('h1').text(),
  release: ($) => $('.summary_text').text(),
  rating: ($) => $('.ratingValue').find('strong').find('span').text()
};
const dataUrlsRegexpExtractors = {
  urls: (html) => html.match(/(https?:\/\/[^\s]+)/g)
};
// Get the website
axios.get('http://www.imdb.com/title/tt1229340/')
  .then((response) => {
    const { data: html } = response;

    if (html) {
      // Create scraper
      const dataMovieCheerioScraper = createCheerioScraper(dataMovieCheerioExtractors, html);
      const dataUrlsRegexpScraper = createRegexScraper(dataUrlsRegexpExtractors, html);
      // Scrap
      const extractedData = {
        ...dataMovieCheerioScraper.scrapLoadedHtml(), ...dataUrlsRegexpScraper.scrapLoadedHtml()
      };
      // Show data
      console.log({ extractedData });
    }
  });
