import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { loadState, saveState } from './session-storage';
import RootReducer from '../reducers/root-reducer';

const persistedUserState = loadState();

const store = createStore(
  RootReducer,
  persistedUserState,
  compose(applyMiddleware(promise, thunk)),
);

store.subscribe(() => {
  const state = {
    user: store.getState().user,
  };
  saveState(state);
});

export default store;
