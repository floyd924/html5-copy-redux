// DUCKS - Redux Reducer Bundles - https://github.com/erikras/ducks-modular-redux#example

// Actions
const CHANGE_NAME = 'example/CHANGE_NAME';

// Reducer
export function reducer(state = {}, action = {}) {
  switch (action.type) {
    case CHANGE_NAME:
      return { name: action.name };
    default:
      return state;
  }
}

// Action Creators
export function changeName(name) {
  return { type: CHANGE_NAME, name };
}