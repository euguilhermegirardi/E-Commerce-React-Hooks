// If we had another reducer, we just had to put the other one in here.

import { combineReducers } from 'redux';
import cart from './cart/reducer';

export default combineReducers({
  cart,
})
