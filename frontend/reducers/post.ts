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
  mainPosts: [{
    id: shortId.generate(),
    User: {
      id: 1,
      nickname: 'jpark',
    },
    content: 'First Post #Hash #express',
    Images: [{
      id: shortId.generate(),
      src:'https://acaroom.net/sites/default/files/styles/blog_featured_adaptive/public/images/blogs/reactintroduction.png',
    }, {
      id: shortId.generate(),
      src: 'https://media.vlpt.us/images/dongha1992/post/d31e5f57-14c8-495e-867b-b5b6cadee525/next.js.png'
    }, {
      id: shortId.generate(),
      src: 'https://media.vlpt.us/images/taeg92/post/a0e7e32b-49ee-4f17-ad61-a89f481521e3/Typescript.jpg'
    }],
    Comments: [
      {
        id: shortId.generate(),
        User: {
          nickname: 'damian',
        },
        content: 'Hello World;'
      },
      {
        id: shortId.generate(),
        User: {
          nickname: 'TESLA',
        },
        content: 'Model S Plaid'
      },
    ],
  },{
    id: shortId.generate(),
    User: {
      id: 1,
      nickname: 'tomcat',
    },
    content: '#cat #cuty #LionOnHouse',
    Images: [{
      id: shortId.generate(),
      src:'https://i.ytimg.com/vi/jHWKtQHXVJg/maxresdefault.jpg',
    }, {
      id: shortId.generate(),
      src: 'https://i.ytimg.com/vi/2AzW2HxN5lE/maxresdefault.jpg'
    }, {
      id: shortId.generate(),
      src: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F6082931ef598a85b055afe77%2Ftwo-month-old-Ragdoll-kitten-at-home%2F960x0.jpg%3FcropX1%3D0%26cropX2%3D3475%26cropY1%3D182%26cropY2%3D2137'
    }],
    Comments: [
      {
        id: shortId.generate(),
        User: {
          nickname: 'dog',
        },
        content: 'cuty!!!!'
      },
      {
        id: shortId.generate(),
        User: {
           nickname: 'haha',
         },
        content: 'haha! hahaha!'
      },
    ],
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};


initialState.mainPosts = initialState.mainPosts.concat(
  Array(100).fill({}).map(() => ({
    id: shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
      id: shortId.generate(),
      src: faker.image.imageUrl(),
    }],
    Comments: [{
      id: shortId.generate(),
      User: {
        nickname: faker.name.findName(),
      },
      content: faker.lorem.sentence(),
    }],
})),
);
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

const dummyPost = (data: { id: string, content: string }): PostState => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'jpark',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data: any) => ({
  id: shortId.generate(),
  User: {
    id: 1,
    nickname: 'jpark',
  },
  content: data,
});

const reducer = (state = initialState, action: {type: string, data:any, error: Record<string,unknown>}): MainPostProps => (
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
          draft.addPostLoading = false;
          draft.addPostDone = true;
          draft.mainPosts.unshift(dummyPost(action.data));
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
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post?.Comments?.unshift(dummyComment(action.data.content));
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
