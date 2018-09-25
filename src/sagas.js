import {
  put, call, takeEvery, select, takeLatest, race, take,
} from 'redux-saga/effects';
import { delay, eventChannel, END } from 'redux-saga';
import {
  FETCH_POSTS_REQUEST,
  FILTER_CHANGED,
  DELETE_POST_REQUEST,
  DELETE_POST_CANCELLED,
  DELETE_POST_ERROR,
  DELETE_POST_CONFIRMED,
  FILTER_POSTS,
} from './actions/types';
import { getPosts } from './reducers';
import { fetchPostsApi, deletePost } from './actions';
import { CANCEL_TIME } from './utils';
import {
  postsReceived,
  postsFailed,
  filterPosts,
  countdownSeconds,
  deletePostSuccess,
  deletePostError,
} from './actions/actionCreators';

const countdown = seconds => eventChannel((emitter) => {
  let secs = seconds;
  const iv = setInterval(() => {
    secs -= 1;
    if (secs > 0) {
      emitter(secs);
    } else {
      emitter(END);
    }
  }, 1000);
  return () => {
    clearInterval(iv);
  };
});

export function* fetchPostSaga() {
  try {
    const posts = yield call(fetchPostsApi);
    yield put(postsReceived(posts));
  } catch (error) {
    yield put(postsFailed(error));
  }
}

export function* filterPostsSaga({ name }) {
  yield call(delay, 500);
  const searchName = name.toLowerCase();
  const posts = yield select(getPosts);
  const filteredPosts = posts.filter(post => post.name.toLowerCase().includes(searchName));
  yield put(filterPosts(filteredPosts));
}

export function* countdownSaga() {

}

export function* performDelete(id) {

}

export function* removePost({ id }) {

}

export default function* rootSaga() {
  yield takeEvery(FETCH_POSTS_REQUEST, fetchPostSaga);
  yield takeLatest(FILTER_CHANGED, filterPostsSaga);
}
