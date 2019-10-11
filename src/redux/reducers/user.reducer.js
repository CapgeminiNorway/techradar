import * as types from '../types/user.type';

export const initialState = {
  currentUser: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
