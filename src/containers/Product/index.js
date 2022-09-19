import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';
import { Link } from 'react-router-dom';

import CallAPI from '../../utils/CallAPI';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import ProductItem from '../ProductItem';
import ProductList from '../ProductList';
import { actDeleteProductReq, actFetchProductReq, loadingReq } from './actions';

class Product extends Component {
  showProducts(products) {
    let result = null;
    if (products) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            key={index}
            product={product}
            index={index}
            onDelete={this.onDelete}
          />
        );
      });
    }
    return result;
  }

  componentDidMount() {
    this.props.fetchAllProduct();
  }

  onDelete = id => {
    this.props.deleteProduct(id);
  };

  render() {
    const { products } = this.props;
    const elementProduct = this.showProducts(products);

    return (
      <>
        <div className="flex flex-col w-[1000px] m-auto">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <Link to="/product/add">
                  <button type="button" className="btn-product">
                    Add Product
                  </button>
                </Link>
                <ProductList>
                  {elementProduct}
                </ProductList>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { products } = state;
  return {
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProduct: () => dispatch(actFetchProductReq()),
    deleteProduct: id => dispatch(actDeleteProductReq(id)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'products', reducer });

export default compose(withReducer, withConnect)(Product);
