
// Importamos el módulo nativo para requerir un html.
import request from 'request';
// Incluimos servicio.
import { createScraper } from './Scraper';
//Incluimos los motores de parseo
import CheerioEngine from '../engine/CheerioEngine';
// Definimos una promesa y hacemos la llamada a nuestro sitio de prueba.
let htmlPromise = new Promise((resolve, reject) => {
    request('http://www.imdb.com/title/tt1229340/', (error, response, html) => {
        if (!error) {
            resolve(html);
        } else {
            reject({ error, response });
        }
    });
});
// Definimos los extractores.
const dataMovieCheerioExtractors = {
    title($) {
        const $wrapper = $('.title_wrapper');
        const title = $wrapper.find('h1').text();

        return title;
    },
    release($) {
        return $('.summary_text').text();
    },
    rating($) {
        const rating = $('.ratingValue').find('strong').find('span').text();

        return rating;
    }
};

// Creamos un grupo de pruebas para el módulo Scraper.
describe('Scraper', () => {
    // Creamos un subgrupo de pruebas para testear nuestro primer requerimiento:
    // extraer un conjunto de datos de un html.
    describe('Extracción de datos de html.', () => {

        test('El objeto de extractores y el resultante de la extracción deben tener las mismas keys', () => {
            // Colocamos nuestro caso de prueba dentro del callback de la resolución de la promesa.
            return htmlPromise.then(html => {
                // Esto nos permite evaluar todos los casos verdaderos de createScraper.
                let dataMovieCheerioScraper = createScraper(dataMovieCheerioExtractors, CheerioEngine, html);
                // Evaluamos el método que extrae datos del html guardado en el estado.
                let extractedData = dataMovieCheerioScraper.scrapLoadedHtml();
                // Verificamos la integridad del objeto retornado por el scraper.
                Object.keys(extractedData).forEach(key => {
                    expect(dataMovieCheerioExtractors).toHaveProperty(key);
                });
            });
        });

        test('Los valores del objeto resultante de la extracción ser strings', () => {
            // Colocamos nuestro caso de prueba dentro del callback de la resolución de la promesa.
            return htmlPromise.then(html => {
                // Esto nos permite evaluar todos los casos falsos de createScraper.
                let scraper = createScraper();
                // Las siguientes dos lineas evaluan metodos que fueron probados en el
                // uso de createScraper en el test anterior.
                let cherioScraper = scraper.loadExtractors(dataMovieCheerioExtractors);
                let dataMovieCheerioScraper = cherioScraper.loadEngine(CheerioEngine);
                // Este método ya lo evaluamos en el test anterior, ya que internamente
                // scrapLoadedHtml utiliza extractedData.
                let extractedData = dataMovieCheerioScraper.scrap(html);
                // Verificamos la integridad del objeto retornado por el scraper.
                Object.keys(extractedData).forEach(key => {
                    expect(typeof extractedData[key]).toBe('string');
                });
            });
        });
    });
});