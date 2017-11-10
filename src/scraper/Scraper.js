/**
 * 
 */
import State from '../state/State';

/**
 * 
 */
export class Scraper {
    scrapLoadedHtml() {
        return this.scrap(this.state.get('html'));
    }

    scrap(html) {
        const extractors = this.state.get('extractors');
        const engine = this.state.get('engine');
        const extract = engine.start(extractors);

        return extract(html);
    }

    loadEngine(Engine) {
        this.state.set({ 'engine': new Engine() });

        return this;
    }

    loadExtractors(extractors) {
        this.state.set({ extractors });

        return this;
    }

    loadHtml(html) {
        this.state.set({ html });

        return this;
    }
}

export const createScraper = function (extractors, Engine, html) {
    //console.log('Scraper createScraper');
    let scraper = new Scraper();

    scraper.state = new State();

    if (extractors) {
        scraper.loadExtractors(extractors);
    }

    if (Engine) {
        scraper.loadEngine(Engine);
    }

    if (html) {
        scraper.loadHtml(html);
    }

    return scraper;
}

export default Scraper;