import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';

// Stores
import CartStore from '../../stores/cartStore';

// Utils
import History from '../../utils/history';

class Cart extends Component {
  parseCartToHtml = () => {
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

  getTotalPrice = () =>
    CartStore.cart.reduce((totalPrice, product) => totalPrice + product.price, 0);

  goToCheckout = () =>
    window.open(
      'https://support.wwf.org.uk/donate-to-wwf?pc=ASF001001&ds_medium=cpc&&ds_rl=1263317'
    );

  render() {
    return (
      <div className="bas-cart">
        <Container fluid>
          {/* Header */}
          <Row className="bas-cart-title">
            <Col>
              <FontAwesomeIcon size="1x" icon={faShoppingCart} /> Basket
            </Col>
          </Row>

          {/* Content */}
          <Row className="bas-cart-content">
            {this.parseCartToHtml(CartStore.cart).map((product, i) => (
              <Col key={i} xs={12} className="bas-cart-item">
                <div>{product.name}</div>
                <Row>
                  <Col>
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
                  <Col className="text-right">{product.price * product.quantity}</Col>
                </Row>
              </Col>
            ))}
          </Row>

          {/* Price and View Price */}
          <Row className="bas-cart-footer">
            <Col>Total</Col>
            <Col className="text-right">{this.getTotalPrice()}</Col>
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
