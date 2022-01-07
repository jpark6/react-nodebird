import produce from 'immer';

export interface PostState {
  id: string;
  User: {
    id: string|number;
    nickname: string;
  };
  content: string;
  Images?: {
    id: string,
    src: string
  }[];
  Comments?: {
    id: string,
    User: {
      nickname: string;
    };
    content: string;
  }[];
  Likers?: {
    id: string
  }[];
}

interface MainPostProps {
  mainPosts: PostState[];
  imagePaths: {src: string}[],
  hasMorePost: boolean,
  loadPostsLoading?: boolean;
  loadPostsDone?: boolean;
  loadPostsError?: Record<string, unknown>|null;
  addPostLoading?: boolean;
  addPostDone?: boolean;
  addPostError?: Record<string, unknown>|null;
  removePostLoading?: boolean;
  removePostDone?: boolean;
  removePostError?: Record<string, unknown>|null;
  addCommentLoading?: boolean;
  addCommentDone?: boolean;
  addCommentError?: Record<string, unknown>|null;
  likePostLoading?: boolean;
  likePostDone?: boolean;
  likePostError?: Record<string, unknown>|null;
  unlikePostLoading?: boolean;
  unlikePostDone?: boolean;
  unlikePostError?: Record<string, unknown>|null;
}

export const initialState: MainPostProps = {
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const addPost = (data: string): { type: string, data: unknown } => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data: Record<string, unknown>): { type: string, data: unknown }  => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action: {type: string, data:any, error: Record<string,unknown>}): MainPostProps => (
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
          draft.addPostLoading = false;
          draft.addPostDone = true;
          draft.mainPosts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
          draft.addPostLoading = false;
          draft.addPostError = action.error;
          break;
      case REMOVE_POST_REQUEST:
          draft.removePostLoading = true;
          draft.removePostDone = false;
          draft.removePostError = null;
          break;
      case REMOVE_POST_SUCCESS:
          draft.mainPosts = draft.mainPosts.filter(
            (v) => v.id !== action.data
          );
          draft.removePostLoading = false;
          draft.removePostDone = true;
          break;
      case REMOVE_POST_FAILURE:
          draft.removePostLoading = false;
          draft.removePostError = action.error;
          break;
      case ADD_COMMENT_REQUEST:
          draft.addCommentLoading = true;
          draft.addCommentDone = false;
          draft.addCommentError = null;
          break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post?.Comments?.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        draft.likePostLoading = false;
        draft.likePostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post?.Likers?.push({ id: action.data.UserId });
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        if(post && post.Likers){
          post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
        }
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      default:
        break;
    }
  })
);

export default reducer;

export type MainPostState = ReturnType<typeof reducer>;
