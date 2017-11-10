/**
 * class Engine
 * 
 * Contiene la lógica básica común a todos los Engines,
 * técnicamente sería el equivalente a una clase abstracta,
 * ya que tiene métodos concretos definidos, siendo utilizada
 * como interfaz.
 * 
 * Si bien el lenjuage está limitado en la creación de interfaces,
 * muy posiblemente no las utilizaría en este caso.
 * 
 */
export class Engine {
    /**
     * @function start Retorna una función llamada "extract", la cual acepta
     * el parámetro "html" a parsear.
     * 
     * Esto está hecho así, porque se pensó dentro del patrón de diseño "strategy",
     * implementado en la aplicación a travez del estado del mismo.
     * 
     * @param {object} extractors Conjunto de métodos que devuelven un valor.
     */
    start(extractors) {
        return this.storeHtmlInClosure(extractors)
    }

    /**
     * @function storeHtmlInClosure Retorna una función, la cual acepta
     * el parámetro "html" a parsear. Funciona como clouse para contener
     * los extractores y poder reutilizarlos en distintos html.
     * 
     * Si se intenta utilizar la interfaz directamente imprime un error
     * en la consola.
     * 
     * @param {object} extractors Conjunto de métodos que devuelven un valor.
     */
    storeHtmlInClosure(extractors) {
        return (html) => {
            return this.extractData(html, extractors);
        };
    }

}

export default Engine;