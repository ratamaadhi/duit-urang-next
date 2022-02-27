export const initialState = {
  document: null,
  isPending: false,
  error: null,
  isSuccess: null,
};

export const firestoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        ...state,
        isPending: true,
        document: null,
        isSuccess: false,
        error: null
      };
    case "ADDED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        isSuccess: true,
        error: null
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        document: null,
        isSuccess: false,
        error: action.payload,
      }
    default:
      return state;
  }
};