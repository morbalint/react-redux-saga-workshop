import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleWare)));

sagaMiddleWare.run(rootSaga);
export default store;
