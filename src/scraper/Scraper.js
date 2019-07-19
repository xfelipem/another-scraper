// INTERNAL DEPENDENCIES
import { withStore } from "../helper";

export class Scraper {
    scrapLoadedHtml() {
        return this.scrap(this.get('html'));
    }

    scrap(html) {
        const extractors = this.get('extractors');
        const engine = this.get('engine');
        const extract = engine.start(extractors);

        return extract(html);
    }

    loadEngine(Engine) {
        this.update({ 'engine': new Engine() });

        return this;
    }

    loadExtractors(extractors) {
        this.update({ extractors });

        return this;
    }

    loadHtml(html) {
        this.update({ html });

        return this;
    }
}

export const createScraper = function (extractors, Engine, html) {
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