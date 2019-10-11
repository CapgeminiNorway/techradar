import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import { loadState, saveState } from './session-storage';
import RootReducer from '../reducers/root-reducer';

const persistedUserState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  RootReducer,
  persistedUserState,
  composeEnhancers(applyMiddleware(promise, thunk, logger)),
);

store.subscribe(() => {
  const state = {
    user: store.getState().user,
  };
  saveState(state);
});

export default store;
