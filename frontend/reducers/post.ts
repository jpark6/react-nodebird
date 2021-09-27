export interface PostState {
  id: number;
  User: {
    id: number;
    nickname: string;
  };
  content: string;
  Images?: {src: string}[];
  Comments?: {
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
  addCommentLoading?: boolean;
  addCommentDone?: boolean;
  addCommentError?: Record<string, unknown>|null;
}

export const initialState: MainPostProps = {
  mainPosts: [{
    id:1,
    User: {
      id: 1,
      nickname: 'jpark',
    },
    content: 'First Post #Hash #express',
    Images: [{
      src:'https://acaroom.net/sites/default/files/styles/blog_featured_adaptive/public/images/blogs/reactintroduction.png',
    }, {
      src: 'https://media.vlpt.us/images/dongha1992/post/d31e5f57-14c8-495e-867b-b5b6cadee525/next.js.png'
    }, {
      src: 'https://media.vlpt.us/images/taeg92/post/a0e7e32b-49ee-4f17-ad61-a89f481521e3/Typescript.jpg'
    }],
    Comments: [
      {
        User: {
          nickname: 'damian',
        },
        content: 'Hello World;'
      },
      {
        User: {
          nickname: 'TESLA',
        },
        content: 'Model S Plaid'
      },
    ],
  },{
    id:2,
    User: {
      id: 1,
      nickname: 'tomcat',
    },
    content: '#cat #cuty #LionOnHouse',
    Images: [{
      src:'https://i.ytimg.com/vi/jHWKtQHXVJg/maxresdefault.jpg',
    }, /*{
      src: 'https://i.ytimg.com/vi/2AzW2HxN5lE/maxresdefault.jpg'
    }, {
      src: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F6082931ef598a85b055afe77%2Ftwo-month-old-Ragdoll-kitten-at-home%2F960x0.jpg%3FcropX1%3D0%26cropX2%3D3475%26cropY1%3D182%26cropY2%3D2137'
    }*/],
    Comments: [
      {
        User: {
          nickname: 'dog',
        },
        content: 'cuty!!!!'
      },
      {
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
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data: Record<string, unknown>) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data: Record<string, unknown>) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 3,
  User: {
    id: 1,
    nickname: 'jpark',
  },
  content: 'HELLO',
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action: {type: string, error: Record<string,unknown>}) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;

export type MainPostState = ReturnType<typeof reducer>;
