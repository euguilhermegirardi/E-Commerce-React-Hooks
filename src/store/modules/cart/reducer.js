// Index.js (Home) connected with Redux.
// Component triggers an action, the action tells to the Reducer...
// Reducer edit whatever it needs, then Redux send the new information to all components that need it.

import produce from 'immer';

// Initial state as an empty array and receive the action.
export default function cart(state = [], action) {
  // Created "switch" cos the "cart reducer" wants to listen only the actions about the cart.
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      // draft is a copy of the state.
      return produce(state, draft => {
        const { product } = action;
        draft.push(product)
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id)

        // To remove the product.
        // 'splice' to remove. 'productIndex' to get the product. '1' quant. that you will delete.
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    // After do the action, you have to do the reducer, to increment or decrement.
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {

        // Get the index of the product. The product itself.
        const productIndex = draft.findIndex(p => p.id === action.id)

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }

    default:
      return state;
  }
}
