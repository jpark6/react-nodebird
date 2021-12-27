import { all, fork } from 'redux-saga/effects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosAdapter } from 'axios';

// eslint-disable-next-line import/no-cycle
import userSaga from './user';
// eslint-disable-next-line import/no-cycle
import postSaga from './post';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export function axiosRequest(method: string, uri: string, data: unknown) : unknown {
  switch(method.toUpperCase()) {
    case 'GET': return axios.get(uri);
    case 'POST': return axios.post(uri, data);
    default: return axios.get(uri);
  }
}

export default function* rootSaga(): Generator {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
