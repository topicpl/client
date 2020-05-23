import { ADD_CATEGORY } from './CategoriesActions.js';

const categories = (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return Object.assign({}, state, {
        category: action.category,
      });
    default:
      return state;
  }
};

export default categories;
