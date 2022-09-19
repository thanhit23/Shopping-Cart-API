import { FETCH_PRODUCT, PRODUCT_DELETE, PRODUCT_UPDATE } from './constants';
import CallAPI from '../../utils/CallAPI';

export const actFetchProductReq = () => {
  return dispatch => {
    return CallAPI('products', 'GET', null).then(({ data }) => {
      dispatch(actFetchProduct(data));
    })
  }
}

export const actFetchProduct = products => {
  return {
    type: FETCH_PRODUCT,
    products
  }
}

export const actDeleteProductReq = id => {
  return dispatch => {
    return CallAPI(`products/${id}`, 'DELETE', null).then(() => {
      dispatch(actDeleteProduct(id));
    })
  }
}

export const actDeleteProduct = id => {
  return {
    type: PRODUCT_DELETE,
    id
  }
}

export const actUpdateProductReq = product => {
  return dispatch => {
    const { id } = product;
    console.log(id);
    return CallAPI(`products/${id}`, 'PUT', product).then(({ data }) => {
      dispatch(actUpdateProduct(data));
    })
  }
}

export const actUpdateProduct = product => {
  return {
    type: PRODUCT_UPDATE,
    product
  }
}
