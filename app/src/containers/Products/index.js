import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Components
import ProductItem from '../../components/ProductItem';

// Utils
import History from '../../utils/history';

export default class Products extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col className="pl-0">Products</Col>
        </Row>
        <Row>
          <Col className="pl-0">
            <ProductItem />
          </Col>
          <Col className="pl-0">
            <ProductItem />
          </Col>
          <Col className="pl-0">
            <ProductItem />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
