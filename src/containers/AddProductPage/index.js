import React, { Component } from 'react';
import { compose } from 'redux';
import { useParams, useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import { actAddProductReq, actGetProductReq } from './actions';
import { actUpdateProductReq } from '../Product/actions';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} useNavigate={useNavigate()} />;
}

class AddProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nameProduct: '',
      priceProduct: 0,
      checkboxStatus: false,
    };
  }

  componentDidMount() {
    const { params: { id: idProduct } } = this.props;
    if (idProduct) {
      this.props.onGetProduct(idProduct);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { addProducts } = nextProps;
    if (addProducts) {
      const { id, name, price, status } = addProducts[0];
      this.setState({
        id,
        nameProduct: name,
        priceProduct: price,
        checkboxStatus: status,
      });
    }
  }

  onChange = ({ target: { name, type, checked, value } }) => {
    const values = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: values,
    });
  };

  onSave = e => {
    e.preventDefault();
    const { useNavigate } = this.props;
    const { id, nameProduct: name, priceProduct: price, checkboxStatus: status } = this.state;
    const product = {
      id,
      name,
      price,
      status,
    };
    if (id) {
      this.props.onUpdateProduct(product);
    } else {
      this.props.onAddProduct(product);
    }
    useNavigate('/product');
  };

  render() {
    const { nameProduct, priceProduct, checkboxStatus } = this.state;

    return (
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <form>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput90"
              placeholder="Name"
              name="nameProduct"
              value={nameProduct}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput91"
              placeholder="Price"
              name="priceProduct"
              value={priceProduct}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group mb-6">
            <p>Trạng Thái</p>
            <label>
              Đã Hết
              <input
                type="checkbox"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput91"
                name="checkboxStatus"
                value={checkboxStatus}
                onChange={this.onChange}
                checked={checkboxStatus}
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn-submit w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={this.onSave}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { addProducts } = state;
  return {
    addProducts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: product => dispatch(actAddProductReq(product)),
    onGetProduct: id => dispatch(actGetProductReq(id)),
    onUpdateProduct: product => dispatch(actUpdateProductReq(product)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'addProducts', reducer });

export default withParams(compose(withReducer, withConnect)(AddProductPage));
