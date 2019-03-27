import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Stores
import CartStore from '../../stores/cartStore';

// Utils
import History from '../../utils/history';

class Cart extends Component {
  render() {
    return (
      <div className="bas-cart">
        <Container fluid>
          {/* Header */}
          <Row>
            <Col>Cart</Col>
          </Row>

          {/* Content */}
          <Row>
            {CartStore.cart.map((product, i) => (
              <Col key={i} xs={12}>
                {product.name}
                <button onClick={() => CartStore.removeProduct(product)}>X</button>
              </Col>
            ))}
          </Row>
          <button onClick={() => CartStore.clearCart()}>Clear</button>

          {/* Price */}
          <Row>
            <Col>Total price</Col>
          </Row>

          {/* View basket */}
          <Row>
            <Col>View basket</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default observer(Cart);
