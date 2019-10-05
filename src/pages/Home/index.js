import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    // Config the format price when we get the info from the API.
    // Do it before the info goes to the render.
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data })
  }

  handleAddProcuts = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={() => this.handleAddProcuts(product.id)}>
              <div>
                <MdShoppingCart size={16} color="#FFF" />
                {amount[product.id] || 0}
              </div>
              <span>Add to cart</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

// Convert 'state' into props.
// To show the quantity of products the user has. It will show in the small cart in 'home'.
const mapStateToProps = state => ({
  // amount = id of the product and the quantity.
  amount: state.cart.reduce((amount, product) => {
    (amount[product.id] = product.amount);
    return amount;
  }, {}) // To initialize the amount as 'zero'.
});

// Convert 'actions' into props.
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
// If you don't have 'StateToProps' or 'DispatchToProps', you have to pass 'null'.
// export default connect(null, mapDispatchToProps)(Home);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
