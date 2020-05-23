import { combineReducers } from 'redux';
import app from '../pages/app/appReducer.js';
import categories from '../pages/categories/categoriesReducer.js';

export default combineReducers({
  app,
  categories,
});
