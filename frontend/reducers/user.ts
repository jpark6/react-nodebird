// eslint-disable-next-line import/prefer-default-export
export const initialState = {
  isLoggedIn: false,
  user: {},
  signUpData: {},
  loginData: {},
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const loginAction = (data) => ({
  type: 'LOGIN',
  data
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const logoutAction = () => ({
  type: 'LOGOUT',
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-ts-comment
// @ts-ignore
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
