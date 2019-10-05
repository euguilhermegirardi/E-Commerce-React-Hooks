import { all } from 'redux-saga/effects';
import cart from './cart/sagas';

// all = to combine all sagas.
export default function* rootSaga() {
  return yield all([cart])
}
