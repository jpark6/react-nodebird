import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  user: {
    isLoggedIn: false,
    user: {},
    signUpData: {},
    loginData: {},
    post: {
      mainPosts: [],
    }
  }
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const rootReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYD', action);
      return { ...state, ...action.payload };
    case 'LOGIN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        }
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        }
      };
    default:
      return state;
  }
};

export default rootReducer;

