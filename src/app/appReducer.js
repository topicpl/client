import { ADD_LANG } from './AppActions';

const app = (state = [], action) => {
  switch (action.type) {
  case ADD_LANG:
    return { ...state, lang: action.lang };
  default:
    return state;
  }
};

export default app;
