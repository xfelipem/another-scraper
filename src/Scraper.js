/**
 * 
 */
import request from 'request';
import cheerio from 'cheerio';
import { forEach } from 'helper-tools/src/object';
import State from './State';
import Kernel from './Kernel';

/**
 * 
 */
export class Scraper {
    constructor(props) {
        console.log('Scraper constructor');
        this.setInitialState(props);
        this.loadKernel(Kernel);
    }

    setInitialState(props) {
        //console.log('setInitialState');
        this.state = new State(props);
    }

    loadKernel(Kernel) {
        //console.log('loadKernel');
        const kernel = new Kernel({
            requestHandlers: {
                '/': this.onScrapRequest
            }
        });

        this.kernel = kernel;

        return kernel;
    }

    scrap(url, extractors) {
        //console.log('scrap', { url });
        this.setDataExtractors(extractors);
        return this.requestHtml(url);
    }

    onScrapRequest(request, response) {
        //console.log('onScrapRequest', { request, response });
        this.lastScrapRequest = { request, response };

        return this.requestHtml(url);
    }

    requestHtml(url) {
        //console.log('requestHtml', { url });
        return request(url, this.onHtmlReady.bind(this));
    }

    onHtmlReady(error, response, html) {
        //console.log('onHtmlReady', { error, response, html });
        const hasError = error;
        //Error handler
        if (hasError) {
            this.htmlRequestErrorHandler(error, { req, res, response, html });
        } else {
            this.htmlRequestSuccessHandler(html);
        }
    }

    htmlRequestSuccessHandler(html) {
        //Extract data;
        const extractedData = this.extractData(html, 'cheerio');

        //Save data
        this.saveData(extractedData);
    }

    extractData(html, engine) {
        switch (engine) {
            case 'cheerio':
                //Wrap html
                const wrappedHtml = this.wrapHtmlWithCheerio(html);

                return this.extractDataWithCheerio(wrappedHtml)
                break
        }

    }

    saveData(data) {
        //Parse data as string
        const parsedDataAsString = this.parseDataAsString(extractedData);

        //Store into mongo database
        this.storeDataInMongoDB(parsedDataAsString);
    }

    extractDataWithCheerio($html) {
        //console.log('extractData')
        const dataExtractors = this.state.get('extractors');
        let extractedData = [];

        forEach(dataExtractors, (extractor, title) => {
            console.log('forEach CB', { extractor, title });

            extractedData.push({
                title,
                data: extractor($html)
            });
        });

        console.log({ extractedData });

        return extractedData;
    }

    parseDataAsString(data) {
        const parsedData = JSON.stringify(data, null, 4);
        //console.log('parseData', { parsedData });
        return parsedData;
    }

    storeDataInMongoDB(parsedData) {
        console.log('storeDataInMongoDB', { parsedData });

        return parsedData;
    }

    htmlRequestErrorHandler(error, data) {
        console.log('htmlRequestErrorHandler', { error, data });
    }

    wrapHtmlWithCheerio(html) {
        //console.log('loadCurrentHtml', { html });
        return cheerio.load(html);
    }

    setDataExtractors(extractors) {
        this.state.set({ extractors });
    }
}

export default Scraper;