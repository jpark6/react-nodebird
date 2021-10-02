import produce from 'immer';

export interface MeState {
  nickname: string,
  id: number,
  Posts: {id: string}[],
  Followings: {id: string}[],
  Followers: {id: string}[],
}

interface UserState {
  followLoading?: boolean,
  followDone?: boolean,
  followError?: Record<string, unknown>|null,
  unfollowLoading?: boolean,
  unfollowDone?: boolean,
  unfollowError?: Record<string, unknown>|null,
  logInLoading?: boolean,
  logInDone?: boolean,
  logInError?: Record<string, unknown>|null,
  logOutLoading?: boolean,
  logOutDone?: boolean,
  logOutError?: Record<string, unknown>|null,
  signUpLoading?: boolean,
  signUpDone?: boolean,
  signUpError?: Record<string, unknown>|null,
  changeNicknameLoading?: boolean,
  changeNicknameDone?: boolean,
  changeNicknameError?: Record<string, unknown>|null,
  me: {
    nickname: string,
    id: number,
    Posts: {id: string}[],
    Followings: {id: string}[],
    Followers: {id: string}[],
  }|null,
  signUpData?: Record<string, unknown>|null,
  logInData?: Record<string, unknown>|null,
}

const initialState: UserState = {
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  signUpData: null,
  logInData: null,
  me: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const dummyUser = (data: Record<string, string>) => ({
  ...data,
  nickname: 'jpark',
  id: 1,
  Posts: [{ id: '1' }],
  Followings: [{ id: 'zerocho' }, { id: 'dlwlrma' }, { id: 'hmson' }],
  Followers: [{ id: 'zerocho' }, { id: 'dlwlrma' }, { id: 'hmson' }, { id: 'messi' }],
});

export const logInRequestAction = (data: any) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = ( state = initialState, action: {data: any, type: string, error: Record<string, unknown>}) : UserState => (
  produce(state, (draft) => {
    switch (action.type) {
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me?.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        draft.followDone = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        draft.me.Followings = draft.me?.Followings.filter((v) => v.id !== action.data);
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowDone = false;
        draft.unfollowError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInDone = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.me = null;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.me = null;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft?.me?.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_OF_ME:
        draft.me?.Posts.filter((v) => v.id !== action.data);
        break;
      default:
        break;
    }
  })
);

export default reducer;
