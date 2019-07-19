// THIRD PARTY DEPENDENCIES
import cheerio from 'cheerio';

// INTERNAL DEPENDENCIES
import Engine from './EngineInterface';

export class CheerioEngine extends Engine {
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

export default CheerioEngine;
