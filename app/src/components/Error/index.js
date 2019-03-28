import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';

export default props => (
  <Row>
    <Col className="pl-0 pt-4 pb-4">
      <FontAwesomeIcon className="bas-error-icon" icon={faExclamationCircle} size="2x" />
      <div className="bas-error-text">{props.text}</div>
    </Col>
  </Row>
);
