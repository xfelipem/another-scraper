/**
 * High Order Function which allow an object to store values privatly.
 * 
 * @param {Object} initialState Initial state of the store
 */
const withStore = (object, initialState) => {
  let store = {};

  const get = (key) => {
    if (key) {
      return store[key];
    } else {
      return store;
    }
  }

  const update = (newState) => Object.keys(newState).forEach((key) => {
    store[key] = newState[key];
  });

  if (initialState) {
    update(initialState);
  }

  object.get = get;
  object.update = update;

  return object;
};

module.exports = {
  withStore
};
