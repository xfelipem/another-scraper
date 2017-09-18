/**
 * 
 */
import express from 'express';
import { forEach } from 'helper-tools/src/object';
import State from './State';

/**
 * 
 */
export class Kernel {
    /**
     * 
     * @param {object} props 
     */
    constructor(props) {
        this.setInitialState(props);
        this.initializeLibraries();
        this.attachHtmlRequest();
    }

    /**
     * 
     * @param {object} props 
     */
    setInitialState(props) {
        this.state = new State(props);
    }

    /**
     * 
     */
    initializeLibraries() {
        //Separar en un modulo "api" o "htmlServer"
        this.urlHandler = express();
    }

    /**
     * 
     */
    attachHtmlRequest() {
        const requestHandlers = this.state.get('requestHandlers');
        //console.log('attachHtmlRequest', { requestHandlers });
        forEach(requestHandlers, (handler, route) => {
            this.urlHandler.get(route, handler);
        });
    }
}

export default Kernel;