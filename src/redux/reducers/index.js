import { combineReducers } from 'redux';
import global from './global';
import currentUser from './currentUser';
import ui from './ui';
import data from './data';
import units from './units';

export default combineReducers({
  global,
  currentUser,
  ui,
  data,
  units
});
