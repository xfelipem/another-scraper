// INTERNAL DEPENDENCIES
import Engine from './EngineInterface';

class RegexEngine extends Engine {
    extractData(html, dataExtractors) {
        let extractedData = {};

        Object.keys(dataExtractors).forEach((name) => {
            const extractor = dataExtractors[name];

            extractedData[name] = extractor(html);
        });

        return extractedData;
    }
}

export default RegexEngine;
