import CallAPI from '../../utils/CallAPI';
import { PRODUCT_ADD, PRODUCT_GET } from './constants';

export const actAddProductReq = product => {
  return dispatch => {
    return CallAPI('products', 'POST', product).then(({ data }) => {
      dispatch(actAddProduct(data));
    })
  }
}

export const actAddProduct = product => {
  return {
    type: PRODUCT_ADD,
    product
  }
}

export const actGetProductReq = id => {
  return dispatch => {
    return CallAPI(`products/${id}`, 'GET', null).then(({ data }) => {
      dispatch(actGetProduct(data));
    })
  }
}

export const actGetProduct = product => {
  return {
    type: PRODUCT_GET,
    product
  }
}
