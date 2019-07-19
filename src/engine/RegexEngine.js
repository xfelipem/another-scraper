// INTERNAL DEPENDENCIES
import Engine from './EngineInterface';

class RegexEngine extends Engine {
    extractData(html, dataExtractors) {
        let extractedData = {};

        Object.keys(dataExtractors).forEach((name) => {
            const extractor = dataExtractors[name];
            const titleData = extractor(html);

            extractedData[name] = titleData
        });

        return extractedData;
    }
}

export default RegexEngine;
