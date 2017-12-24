import Scraper from './scraper/Scraper';

import {
    createScraper as create
} from './scraper/Scraper';
import {
    CheerioEngine as Cheerio
} from './engine/CheerioEngine';
import {
    RegexEngine as Regex
} from './engine/RegexEngine'
import {
    EngineInterface as Engine
} from './engine/EngineInterface';

export let EngineInterface = Engine;
export let CheerioEngine = Cheerio;
export let RegexEngine = Regex;

export const createScraper = create;

export const createCheerioScraper = (extractors, html) => {
    return createScraper(extractors, CheerioEngine, html);
}

export const createRegexScraper = (extractors, html) => {
    return createScraper(extractors, RegexEngine, html);
}

export default Scraper;