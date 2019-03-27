import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Utils
import History from '../../utils/history';

export default class Cart extends Component {
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
            <Col>Item 1</Col>
          </Row>

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
