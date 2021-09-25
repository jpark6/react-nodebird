import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';

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

export type RootState = ReturnType<typeof rootReducer>;

