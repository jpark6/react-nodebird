import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';

const configureStore = () => {
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware())
    : compose(composeWithDevTools(applyMiddleware()));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const store = createStore(reducer, enhancer);

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
