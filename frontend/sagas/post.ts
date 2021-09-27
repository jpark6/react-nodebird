import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS
} from '../reducers/post';

function* addPost(action: {data: string}) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err,
    });
  }
}

function* addComment(action: {data: {content: string, postId: string, userId: string}}) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga(): Generator {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}

