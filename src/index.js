import Scraper from './Scraper';

const anotherScraper = new Scraper();
const extractors = {
    title($) {
        console.log('title');

        const $wrapper = $('.title_wrapper');
        const title = $wrapper.find('h1').text();

        return title;
    },

    release($) {
        console.log('release');

        return $('.summary_text').text();
    },

    rating($) {
        console.log('rating');

        const rating = $('.ratingValue').find('strong').find('span').text();

        return rating;
    }
};

anotherScraper.scrap('http://www.imdb.com/title/tt1229340/', extractors);