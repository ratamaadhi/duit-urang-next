import { AUTH_IS_READY, LOGIN, LOGOUT, SET_THEME } from "./AuthConst";

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AUTH_IS_READY:
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      }

    default:
      return state;
  }
};