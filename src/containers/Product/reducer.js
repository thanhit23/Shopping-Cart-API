/*
 * cartReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

import { FETCH_PRODUCT, PRODUCT_DELETE } from './constants';
import { findIndex } from 'lodash';
import { PRODUCT_UPDATE } from '../AddProductPage/constants';

const initialState = [];

const cartReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PRODUCT:
        const { products } = action;
        draft = products;
        return [...draft];
      case PRODUCT_DELETE:{
        const { id } = action;
        const index = findIndex(draft, ({ id: idProduct }) => id === idProduct);
        draft.splice(index, 1);
        break;
      }
      case PRODUCT_UPDATE:
        const { product } = action;
        const { id } = product;
        const index = findIndex(draft, ({ id: idProduct }) => Number(id) === idProduct);
        draft.splice(index, 1, product)
        break;
    }
  });

export default cartReducer;
