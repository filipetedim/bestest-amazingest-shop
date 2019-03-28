import React, { Component } from 'react';
import { Container } from 'reactstrap';

// Containers
import Cart from '../containers/Cart';
// import BundlesGroup from '../containers/Bundles';
import ProductDetails from '../containers/ProductDetails';

// Components
import ContentWrapper from '../components/ContentWrapper';

// Services
import BundleService from '../services/bundleService';
import ProductService from '../services/productService';

// Utils
import Config from '../utils/config';

export default class Products extends Component {
  state = { loading: true, errorProducts: null, errorBundles: null, product: {}, bundles: [] };

  async componentDidMount() {
    this.setState({ loading: true });

    const { productId } = this.props.match.params;
    console.log(productId);

    await this.getProduct(productId);
    await this.getBundlesWithProduct(productId);

    setTimeout(() => {
      this.setState({ loading: false });
    }, Config.SPINNER_TIME);
  }

  /**
   * Loads a specific product.
   */
  getProduct = async productId =>
    await ProductService.getProduct(productId)
      .then(product => this.setState({ product }))
      .catch(() => this.setState({ errorProducts: true }));
  /**
   * Loads all the existing that have a specific product.
   */
  getBundlesWithProduct = async productId =>
    await BundleService.getBundlesWithProduct(productId)
      .then(bundles => this.setState({ bundles }))
      .catch(() => this.setState({ errorBundles: true }));

  render() {
    const { loading, errorProducts, errorBundles, product, bundles } = this.state;

    return (
      <Container style={{ display: 'flex' }}>
        <ContentWrapper>
          <Container>
            <ProductDetails
              loading={loading}
              error={errorProducts}
              bundles={bundles}
              product={product}
            />
            {/* <BundlesGroup
              loading={loading}
              error={errorBundles}
              bundles={bundles}
              product={product}
            /> */}
          </Container>
        </ContentWrapper>
        <Cart bundles={bundles} />
      </Container>
    );
  }
}
