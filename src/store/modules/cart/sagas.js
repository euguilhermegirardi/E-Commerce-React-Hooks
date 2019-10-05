// Redux-Saga has the middlewares that intercept the action to get more information.
// When the action is triggered it will get some info from the API to show in the product info (home), for example...
// the middleware intercept this action and get more info to put in the cart, for example, weight of the product, stock and more...

import api from '../../../services/api';
import history from '../../../services/history';
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { addToCartSuccess, updateAmountSuccess } from './actions';
import { formatPrice } from '../../../util/format';
import { toast } from 'react-toastify';

// function* = 'generator' = async / yield = await.
// call = to get the info from api.
// put = to trigger an action.
// 'id' from Home/index.js.
function* addToCart({ id }) {

  // To not duplicate the product when the user select more than one in 'Home/index.js'.
  // It will sum inside of the cart.
  // select = search for some informations in the state.
  const productExists = yield select(
    state => state.cart.find(p => p.id === id),
  );

  // Checking the stock.
  // call the API.
  const stock = yield call(api.get, `/stock/${id}`);

  // Get the amount in the stock.
  const stockAmount = stock.data.amount;

  // If 'productExists' is not null, use 'productExists.amoun' otherwise, use '0'.
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Out of stock!')
    return;
  }

  // To increment the quantity inside of the 'cart'.
  if (productExists) {

    yield put(updateAmountSuccess(id, amount))

  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    }

    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Out of stock!')
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

// export default all = To connect 'SAGA' with the actions that will be listened by the Home/index.js.
// User will click the button, SAGA will listen to the action, will get the info from API, then will pass to the reducer.
// all = to register many listeners.
// takeLatest = To control when the user clicks too fast in the button.
// ...it will register only one click.
export default all([
  //takeLastest('action from REDUX, SAGA wants to listen' = @cart/ADD_REQUEST, which function SAGA needs to trigger = addToCart).
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount)
])
