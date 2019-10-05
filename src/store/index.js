// Initial configuration of REDUX.

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

// Config. first at ReactotronConfig.js.
// Give more informations about the actions in Reactotron.
const sagaMonitor = process.env.NODE_ENV === 'development'
  ? console.tron.createSagaMonitor()
  : null;

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

// To connect the Redux with REACTOTRON.
// 'compose' to merge Reactotron with SAGA. Otherwise it would have a conflict.
const enhancer = process.env.NODE_ENV === 'development'
  ? compose(
    console.tron.createEnhancer(),
    applyMiddleware(sagaMiddleware)
  )
  : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

// to run.
sagaMiddleware.run(rootSaga);

export default store;
