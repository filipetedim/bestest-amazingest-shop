import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Components
import BundleItem from '../../components/BundleItem';

// Utils
import History from '../../utils/history';

export default class Bundles extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col className="pl-0">Bundles</Col>
        </Row>
        <Row>
          <Col className="pl-0">
            <BundleItem />
          </Col>
          <Col className="pl-0">
            <BundleItem />
          </Col>
          <Col className="pl-0">
            <BundleItem />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
