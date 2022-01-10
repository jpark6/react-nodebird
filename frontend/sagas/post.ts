import axios from 'axios';
import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axoisRequest from './request';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function* loadPosts(action: { data: string }) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(axoisRequest, '/posts', 'get', action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err,
    });
  }
}

function addPostAPI(data: string) {
  return axios.post('/post', { content: data });
}

function* addPost(action: {data: string}) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call( addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.me,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err,
    });
  }
}

function removePostAPI(data: string) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action: { data: string }) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err,
    });
  }
}

function addCommentAPI(data: {content: string, postId: string, userId: string}) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action: {data: {content: string, postId: string, userId: string}}) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(
      addCommentAPI,
      action.data
    );
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err,
    });
  }
}

function likePostAPI(data: {content: string, postId: string, userId: string}) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action: {data: {content: string, postId: string, userId: string}}) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(
      likePostAPI,
      action.data
    );
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LIKE_POST_FAILURE,
      data: err,
    });
  }
}

function unlikePostAPI(data: {content: string, postId: string, userId: string}) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action: {data: {content: string, postId: string, userId: string}}) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(
      unlikePostAPI,
      action.data
    );
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      data: err,
    });
  }
}

function* watchLoadPosts() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLikePost() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
export default function* postSaga(): Generator {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ]);
}

