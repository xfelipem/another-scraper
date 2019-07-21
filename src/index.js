// INTERNAL DEPENDENCIES
import { createScraper } from './scraper/Scraper';
import CheerioEngine from './engine/CheerioEngine';
import EngineInterface from './engine/EngineInterface';
import JsonEngine from './engine/JsonEngine';
import RegexEngine from './engine/RegexEngine'
import Scraper from './scraper/Scraper';

// HELPERS
const createCheerioScraper = (extractors, html) => createScraper(extractors, CheerioEngine, html);
const createJsonScraper = (extractors, html) => createScraper(extractors, JsonEngine, html);
const createRegexScraper = (extractors, html) => createScraper(extractors, RegexEngine, html);

// EXPORT
export {
    createCheerioScraper,
    createJsonScraper,
    createRegexScraper,
    createScraper,
    CheerioEngine,
    EngineInterface,
    JsonEngine,
    RegexEngine,
    Scraper
};
