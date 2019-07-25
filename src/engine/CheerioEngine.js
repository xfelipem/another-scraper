// THIRD PARTY DEPENDENCIES
const cheerio = require('cheerio');

// INTERNAL DEPENDENCIES
const Engine = require('./EngineInterface');

class CheerioEngine extends Engine {
    extractData(html, dataExtractors) {
        const $html = cheerio.load(html);
        let extractedData = {};

        Object.keys(dataExtractors).forEach((name) => {
            const extractor = dataExtractors[name];

            extractedData[name] = extractor($html)
        });

        return extractedData;
    }
}

module.exports = CheerioEngine;
