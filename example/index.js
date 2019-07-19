// THIRD PARTY DEPENDENCIES
const axios = require('axios');

// INTERNAL DEPENDENCIES
const { createScraper, CheerioEngine } = require('../index');

// Data extractors
const dataMovieCheerioExtractors = {
  title: ($) => $('.title_wrapper').find('h1').text(),
  release: ($) => $('.summary_text').text(),
  rating: ($) => $('.ratingValue').find('strong').find('span').text()
};

// Get the website
axios.get('http://www.imdb.com/title/tt1229340/')
  .then((response) => {
    const { data: html } = response;
    
    console.log(response);

    if (html) {
      // Create scraper
      const dataMovieCheerioScraper = createScraper(dataMovieCheerioExtractors, CheerioEngine, html);
      // Scrap
      const extractedData = dataMovieCheerioScraper.scrapLoadedHtml();
      // Show data
      console.log({ extractedData });
    }
  });
