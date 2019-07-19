// INTERNAL DEPENDENCIES
import Scraper from './scraper/Scraper';
import { createScraper } from './scraper/Scraper';
import CheerioEngine from './engine/CheerioEngine';
import RegexEngine from './engine/RegexEngine'
import EngineInterface from './engine/EngineInterface';

// FUNCTIONS
const createCheerioScraper = (extractors, html) => createScraper(extractors, CheerioEngine, html);
const createRegexScraper = (extractors, html) => createScraper(extractors, RegexEngine, html);

// EXPORT
export {
    createCheerioScraper,
    createRegexScraper,
    createScraper,
    CheerioEngine,
    EngineInterface,
    RegexEngine,
    Scraper
};
