/**
 * 
 */
import { forEach } from 'helper-tools/src/object';

/**
 * 
 */
export class State {
    constructor(props) {
        this.setInitialState(props);
    }

    setInitialState(props) {
        this.state = {};

        if (props) {
            this.set(props);
        }
    }

    set(newState) {
        //console.log('State:set', { newState })
        forEach(newState, (value, key) => {
            //console.log('State:set:forEach:cb', { value, key })
            this.state[key] = value;
        })
    }

    get(key) {
        //console.log('State:get', {key});
        if (key) {
            return this.state[key];
        } else {
            return this.state;
        }
    }
}

export default State;