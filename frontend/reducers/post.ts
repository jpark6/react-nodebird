
export const initialState = {
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
    Comments: [{
       User: {
         nickname: 'damian',
       },
      content: 'Hello World;'
    }],
  }],
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: 'jpark',
  },
  Images: [],
  Comments: [],
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
