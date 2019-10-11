import * as types from '../types/gui.type';

export const initialState = {
  userHasVisited: false,
  userWarning: '',
  loading: false,
  ModalComponent: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_IS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.TOGGLE_USER_HAS_VISITED:
      return {
        ...state,
        userHasVisited: !state.userHasVisited,
      };
    case types.SHOW_USER_WARNING:
      return {
        ...state,
        userWarning: '' || action.payload,
      };
    case types.SET_MODAL:
      return {
        ...state,
        ModalComponent: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
