import React from 'react';
import { Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Utils
import History from '../../utils/history';

export default props => (
  <div className="bas-bundle-item" onClick={() => History.push(`/bundles/${props.bundle._id}`)}>
    <Row>
      <Col>Image</Col>
    </Row>
    <Row>
      <Col>{props.bundle.name}</Col>
      <Col>{props.bundle.discountPercentage}</Col>
    </Row>
  </div>
);
