import React from 'react';
import { Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Utils
import History from '../../utils/history';

export default props => (
  <div className="bas-product-item" onClick={() => History.push(`/products/${props.product._id}`)}>
    <Row>
      <Col>Image</Col>
    </Row>
    <Row>
      <Col>{props.product.name}</Col>
      <Col>{props.product.price}</Col>
    </Row>
  </div>
);
