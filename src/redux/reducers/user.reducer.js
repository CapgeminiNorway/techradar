import * as types from '../types/user.type';

export const initialState = {
  currentUser: {},
  allUsers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

      case types.SET_ALL_USERS:
        return {
          ...state,
          allUsers: action.payload,
        };
  
    default:
      return state;
  }
};

export default reducer;
