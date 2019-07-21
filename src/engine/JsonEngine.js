// THIRD PARTY DEPENDENCIES
import { parse as parseHtml } from 'himalaya';

// INTERNAL DEPENDENCIES
import Engine from './EngineInterface';

class JsonEngine extends Engine {
  extractData(html, dataExtractors) {
    const json = parseHtml(html);
    let extractedData = {};

    Object.keys(dataExtractors).forEach((name) => {
      const extractor = dataExtractors[name];

      extractedData[name] = extractor(json)
    });

    return extractedData;
  }
}

export default JsonEngine;
