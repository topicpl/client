import { combineReducers } from 'redux';
import app from '../app/appReducer';
import categories from '../pages/categories/categoriesReducer';

export default combineReducers({
  app,
  categories,
});
