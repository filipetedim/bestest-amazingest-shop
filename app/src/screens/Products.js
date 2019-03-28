import React, { Component } from 'react';
import { Container } from 'reactstrap';

// Containers
import Cart from '../containers/Cart';
import BundlesGroup from '../containers/Bundles';
import ProductsGroup from '../containers/Products';

// Components
import ContentWrapper from '../components/ContentWrapper';

// Services
import BundleService from '../services/bundleService';
import ProductService from '../services/productService';

// Utils
import Config from '../utils/config';

export default class Products extends Component {
  state = { loading: true, errorProducts: null, errorBundles: null, products: [], bundles: [] };

  async componentDidMount() {
    this.setState({ loading: true });

    await this.getProducts();
    await this.getBundles();

    setTimeout(() => {
      this.setState({ loading: false });
    }, Config.SPINNER_TIME);
    window.scrollTo(0, 0); // I hate doing this but it's late
  }

  /**
   * Loads all the existing products.
   */
  getProducts = async () =>
    await ProductService.getProducts()
      .then(products => this.setState({ products }))
      .catch(() => this.setState({ errorProducts: true }));
  /**
   * Loads all the existing bundles.
   */
  getBundles = async () =>
    await BundleService.getBundles()
      .then(bundles => this.setState({ bundles }))
      .catch(() => this.setState({ errorBundles: true }));

  render() {
    const { loading, errorProducts, errorBundles, products, bundles } = this.state;

    return (
      <Container style={{ display: 'flex' }}>
        <ContentWrapper>
          <Container>
            <BundlesGroup loading={loading} error={errorBundles} bundles={bundles} />
            <ProductsGroup loading={loading} error={errorProducts} products={products} />
          </Container>
        </ContentWrapper>
        <Cart bundles={bundles} />
      </Container>
    );
  }
}
