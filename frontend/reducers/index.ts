import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    if(action.type === HYDRATE) {
      console.log('HYDRATE', action);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return { ...state, ...action.payload };
    }
    return state;
  },
  user,
  post,
});

export default rootReducer;

