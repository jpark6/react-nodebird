// eslint-disable-next-line import/prefer-default-export
export const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  me : {},
  signUpData: {},
  loginData: {},
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const loginRequestAction = (data) => ({
  type: 'LOG_IN_REQUEST',
  data,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const logoutRequestAction = () => ({
  type: 'LOG_OUT_REQUEST',
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const reducer = (state = initialState, action: {data: Record<string, unknown>, type: string}) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      return {
        ...state,
        isLoggingIn: true,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: 'jpark' },
      };
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
        me: null,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;
