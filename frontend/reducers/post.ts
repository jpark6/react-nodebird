import shortId from 'shortid';
import faker from 'faker';
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
};
export const generateDummyPost = (number: number) => Array(number).fill({}).map(() => ({
    id: shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
      id: shortId.generate(),
      src: [faker.image.imageUrl(), `t=${shortId.generate()}`].join('?'),
    },{
      id: shortId.generate(),
      src: [faker.image.imageUrl(), `t=${shortId.generate()}`].join('?'),
    }],
    Comments: [{
      id: shortId.generate(),
      User: {
        nickname: faker.name.findName(),
      },
      content: faker.lorem.sentence(),
    }],
}));

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

export const addPost = (data: string) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data: Record<string, unknown>) => ({
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
        draft.mainPosts = draft.mainPosts.concat(action.data);
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
      default:
        break;
    }
  })
);

export default reducer;

export type MainPostState = ReturnType<typeof reducer>;
