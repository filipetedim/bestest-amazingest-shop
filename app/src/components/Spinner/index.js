import React from 'react';
import { Row, Col, Spinner } from 'reactstrap';

// Theme
import './style.scss';

export default props => (
  <Row>
    <Col className="pl-0 pt-4 pb-4">
      <Spinner className="bas-spinner-icon" />
      <div className="bas-spinner-text">{props.text}</div>
    </Col>
  </Row>
);
