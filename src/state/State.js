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
        Object.keys(newState).forEach((key) => {
            this.state[key] = newState[key];
        });
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