// INTERNAL DEPENDENCIES
const { createScraper } = require('./scraper/Scraper');
const CheerioEngine = require('./engine/CheerioEngine');
const EngineInterface = require('./engine/EngineInterface');
const RegexEngine = require('./engine/RegexEngine');
const Scraper = require('./scraper/Scraper');

// HELPERS
const createCheerioScraper = (extractors, html) => createScraper(extractors, CheerioEngine, html);
const createRegexScraper = (extractors, html) => createScraper(extractors, RegexEngine, html);

// EXPORT
module.exports = {
    createCheerioScraper,
    createRegexScraper,
    createScraper,
    CheerioEngine,
    EngineInterface,
    RegexEngine,
    Scraper
};
