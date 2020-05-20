import { ADD_LANG } from './AppActions.js';

const app = (state = [], action) => {
  switch (action.type) {
    case ADD_LANG:
      return Object.assign({}, state, {
        lang: action.lang,
      });
    default:
      return state;
  }
};

export default app;
