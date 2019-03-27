import React from 'react';
import { Row, Col } from 'reactstrap';

// Theme
import './style.scss';

export default () => (
  <div className="bas-product-item">
    <Row>
      <Col>Image</Col>
    </Row>
    <Row>
      <Col>Name</Col>
      <Col>Price</Col>
    </Row>
  </div>
);
