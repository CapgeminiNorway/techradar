import { combineReducers } from 'redux';
import radar from './radar.reducer';
import gui from './gui.reducer';
import user from './user.reducer';

/**
 * These values are referenced in mapStateToProps
 */
export default combineReducers({
  radar,
  gui,
  user,
});
