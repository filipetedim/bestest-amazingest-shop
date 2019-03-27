import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faMinus,
  faPlus,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';

// Stores
import CartStore from '../../stores/cartStore';

// Utils
import History from '../../utils/history';

class Cart extends Component {
  state = { toggle: false, bundles: [] };

  componentWillReceiveProps(props) {
    this.setState({ bundles: props.bundles });
  }

  /**
   * Toggles the cart on and off in mobile.
   */
  toggleCart = () => this.setState({ toggle: !this.state.toggle });

  /**
   * Groups the cart.
   */
  groupCart = () => {
    const newCart = CartStore.cart.reduce((cart, product) => {
      const exists = cart.filter(cartItem => cartItem._id.toString() === product._id.toString())[0];

      if (exists) {
        exists.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      return cart;
    }, []);
    return newCart;
  };

  /**
   * Gets the total price. This is where the calculations for the bundle happen.
   */
  getTotalPrice = () =>
    CartStore.cart.reduce((totalPrice, product) => totalPrice + product.price, 0);

  /**
   * Link to checkout.
   */
  goToCheckout = () =>
    window.open(
      'https://support.wwf.org.uk/donate-to-wwf?pc=ASF001001&ds_medium=cpc&&ds_rl=1263317'
    );

  render() {
    const { toggle } = this.state;

    return (
      <div className="bas-cart">
        <Container fluid>
          {/* Header */}
          <Row className="bas-cart-title" onClick={this.toggleCart}>
            <Col>
              <FontAwesomeIcon size="1x" icon={faShoppingCart} /> Basket
            </Col>
            <Col className="text-center bar-cart-title-toggle">
              {toggle ? (
                <FontAwesomeIcon size="1x" icon={faChevronDown} />
              ) : (
                <FontAwesomeIcon size="1x" icon={faChevronUp} />
              )}
            </Col>
            <Col className="text-right bar-cart-title-total">Total: {this.getTotalPrice()}</Col>
          </Row>

          {/* Content */}
          <Row className={`bas-cart-content ${toggle && 'show'}`}>
            {this.groupCart(CartStore.cart).map((product, i) => (
              <Col key={i} xs={12} className="bas-cart-item">
                <div>{product.name}</div>
                <Row>
                  <Col xs={8}>
                    <FontAwesomeIcon
                      size="1x"
                      icon={faMinus}
                      onClick={() => CartStore.removeProduct(product)}
                      className="bas-cart-item-icon"
                    />
                    <span className="mr-2 ml-2 bas-cart-item-quantity">{product.quantity}</span>
                    <FontAwesomeIcon
                      size="1x"
                      icon={faPlus}
                      onClick={() => CartStore.addProduct(product)}
                      className="bas-cart-item-icon"
                    />
                  </Col>
                  <Col xs={4} className="text-right">
                    {product.price * product.quantity}
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>

          {/* Price and View Price */}
          <Row className={`bas-cart-footer ${toggle && 'show'}`}>
            <Col className="bar-cart-footer-total">Total</Col>
            <Col className="text-right bar-cart-footer-total">{this.getTotalPrice()}</Col>
            <Col xs={12} className="mt-2">
              <Button color="warning" block onClick={this.goToCheckout}>
                Checkout
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default observer(Cart);
