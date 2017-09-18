/**
 * 
 */
import fs from 'fs';
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
            //Load html
            this.loadCurrentHtml(html);

            //extract data;
            const extractedData = this.extractData();
            //Parse data
            const parsedData = this.parseData(extractedData);
            //Store into database / file
            this.storeData(parsedData);
            //User notification
            this.notifyUser('Chajá');
        }
    }

    parseData(data) {
        const parsedData = data;
        //console.log('parseData', { parsedData });
        return parsedData;
    }

    storeData(data) {
        //console.log('storeData', { data });
        fs.writeFile('other-scraper_database.json', JSON.stringify(data, null, 4), (error) => {
            if (error) {
                console.error('Hubo un error', { error })
            } else {
                this.notifyUser('Exito, other-scraper_database.json se creado/actualizado.');
            }
        })
    }

    notifyUser(message) {
        //const rsp = this.lastScrapRequest.response;

        //if (rsp) {
        //    rsp.send(message);
        //} else {
        console.log(message)
        //}
    }

    htmlRequestErrorHandler(error, data) {
        console.log('htmlRequestErrorHandler', { error, data });
    }

    loadCurrentHtml(html) {
        //console.log('loadCurrentHtml', { html });
        this.currentHtml = cheerio.load(html);
    }

    extractData() {
        //console.log('extractData')
        const $ = this.currentHtml;
        let extractedData = [];

        forEach(this.dataExtractors, (extractor, title) => {
            console.log('forEach CB', { extractor, title });

            extractedData.push({
                title,
                data: extractor($)
            });
        });

        console.log({ extractedData });

        return extractedData;
    }

    setDataExtractors(extractors) {
        this.dataExtractors = extractors;
    }
}

export default Scraper;