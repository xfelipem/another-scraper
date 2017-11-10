import Engine from './EngineInterface';

export class RegexEngine extends Engine {
    extractData(html, dataExtractors) {
        const testHtmlForRexep = html.match;
        let extractedData = [];

        forEach(dataExtractors, (extractor, title) => {
            console.log('forEach CB', { extractor, title });

            extractedData.push({
                title,
                data: extractor(testHtmlForRexep)
            });
        });

        return extractedData;
    }
}

export default RegexEngine;