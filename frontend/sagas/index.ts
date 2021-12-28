import { all, fork } from 'redux-saga/effects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosAdapter } from 'axios';

// eslint-disable-next-line import/no-cycle
import userSaga from './user';
// eslint-disable-next-line import/no-cycle
import postSaga from './post';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export default function* rootSaga(): Generator {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
