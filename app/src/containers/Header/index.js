import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Utils
import History from '../../utils/history';

export default class Header extends Component {
  loadPage = path => History.push(path);

  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <h3>Bestest Amazingest Shop</h3>
          </Col>
        </Row>
        <Row>
          <Col style={{ border: '1px solid red' }} onClick={() => this.loadPage('/products')}>
            Products
          </Col>
          <Col style={{ border: '1px solid red' }} onClick={() => this.loadPage('/admin')}>
            Admin
          </Col>
        </Row>
      </Container>
    );
  }
}
