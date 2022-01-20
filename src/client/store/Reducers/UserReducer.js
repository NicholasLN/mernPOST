const initialState = {
  user: {},
  isLoggedIn: false,
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        alertMessage: "Successfully logged out",
        alertType: "success",
      };
    case "CLEAR_ALERT":
      return {
        ...state,
        alertMessage: null,
        alertType: null,
      };
    default:
      return state;
  }
}
