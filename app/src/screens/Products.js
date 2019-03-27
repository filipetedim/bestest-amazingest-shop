import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

// Containers
import Cart from '../containers/Cart';
import BundlesGroup from '../containers/Bundles';
import ProductsGroup from '../containers/Products';

// Components
import ContentWrapper from '../components/ContentWrapper';

export default class Products extends Component {
  render() {
    return (
      <Container style={{ background: 'red' }}>
        <ContentWrapper>
          <Container>
            <BundlesGroup />
            <ProductsGroup />
          </Container>
        </ContentWrapper>
        <Cart />
      </Container>
    );
  }
}
