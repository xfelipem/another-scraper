// INTERNAL DEPENDENCIES
import { withStore } from "../helper";

export class Scraper {
    scrapLoadedHtml() {
        return this.scrap(this.state.get('html'));
    }

    scrap(html) {
        const extractors = this.get('extractors');
        const engine = this.get('engine');
        const extract = engine.start(extractors);

        return extract(html);
    }

    loadEngine(Engine) {
        this.set({ 'engine': new Engine() });

        return this;
    }

    loadExtractors(extractors) {
        this.set({ extractors });

        return this;
    }

    loadHtml(html) {
        this.set({ html });

        return this;
    }
}

export const createScraper = function (extractors, Engine, html) {
    //console.log('Scraper createScraper');
    let scraperWithState = withStore(new Scraper());

    if (extractors) {
        scraperWithState.loadExtractors(extractors);
    }

    if (Engine) {
        scraperWithState.loadEngine(Engine);
    }

    if (html) {
        scraperWithState.loadHtml(html);
    }

    return scraperWithState;
};

export default Scraper;