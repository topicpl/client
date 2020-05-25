import { ADD_CATEGORY } from './CategoriesActions';

const categories = (state = [], action) => {
  switch (action.type) {
  case ADD_CATEGORY:
    return { ...state, category: action.category };
  default:
    return state;
  }
};

export default categories;
