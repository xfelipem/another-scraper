import cheerio from 'cheerio';
import Engine from './EngineInterface';
const forEach = function (object, method) {
    Object.keys(object).forEach(function (key) {
        let parameter = object[key];

        method(parameter, key, object);
    });

    return object;
}

export class CheerioEngine extends Engine {
    extractData(html, dataExtractors) {
        const $html = cheerio.load(html);
        let extractedData = {};

        forEach(dataExtractors, (extractor, dataTitle) => {
            //console.log('forEach CB', { extractor, title });
            extractedData[dataTitle] = extractor($html)
        });

        return extractedData;
    }
}

export default CheerioEngine;