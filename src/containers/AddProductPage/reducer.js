/*
 * cartReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

import { PRODUCT_ADD, PRODUCT_GET } from './constants';

const initialState = [];

const cartReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case PRODUCT_ADD: {
        const { product } = action;
        state.push(product);
        break;
      }
      case PRODUCT_GET:
        const { product: getProduct } = action;
        draft.splice(0, 1, getProduct)
        break;
    }
  });

export default cartReducer;
