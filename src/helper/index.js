/**
 * High Order Function which allow an object to store values privatly.
 * 
 * @param {Object} initialState Initial state of the store
 */
export const withStore = (object, initialState) => {
  let state = {};

  const get = (key) => {
    if (key) {
      return state[key];
    } else {
      return state;
    }
  }

  const update = (newState) => Object.keys(newState).forEach((key) => {
    this.state[key] = newState[key];
  });

  if (initialState) {
    update(initialState);
  }

  object.get = get;
  object.update = update;

  return object;
};
