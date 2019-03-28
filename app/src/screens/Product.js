import React, { Component } from 'react';
import { Container } from 'reactstrap';

// Containers
import Cart from '../containers/Cart';
import BundlesGroup from '../containers/Bundles';
import ProductDetails from '../containers/ProductDetails';

// Components
import ContentWrapper from '../components/ContentWrapper';

// Services
import BundleService from '../services/bundleService';
import ProductService from '../services/productService';

// Utils
import Config from '../utils/config';

export default class Products extends Component {
  state = {
    loading: true,
    errorProducts: null,
    errorBundles: null,
    product: {},
    bundles: [],
    getBundlesByProductId: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const { productId } = this.props.match.params;
    await this.getProduct(productId);
    await this.getBundles();
    await this.getBundlesByProductId(productId);

    setTimeout(() => {
      this.setState({ loading: false });
    }, Config.SPINNER_TIME);
    window.scrollTo(0, 0); // I hate doing this but it's late
  }

  /**
   * Loads a specific product.
   */
  getProduct = async productId =>
    await ProductService.getProduct(productId)
      .then(product => this.setState({ product }))
      .catch(() => this.setState({ errorProducts: true }));

  /**
   * Loads all the bundles.
   */
  getBundles = async () =>
    await BundleService.getBundles()
      .then(bundles => this.setState({ bundles }))
      .catch(() => this.setState({ errorBundles: true }));

  /**
   * Loads all the existing that have a specific product.
   */
  getBundlesByProductId = async productId =>
    await BundleService.getBundlesByProductId(productId)
      .then(getBundlesByProductId => this.setState({ getBundlesByProductId }))
      .catch(() => this.setState({ errorBundles: true }));

  render() {
    const {
      loading,
      errorProducts,
      errorBundles,
      product,
      bundles,
      getBundlesByProductId,
    } = this.state;

    return (
      <Container style={{ display: 'flex' }}>
        <ContentWrapper>
          <Container>
            <ProductDetails loading={loading} error={errorProducts} product={product} />
            <BundlesGroup
              loading={loading}
              error={errorBundles}
              title="ASSOCIATED BUNDLES"
              emptyMessage="There are currently no bundles that include this product."
              bundles={getBundlesByProductId}
            />
          </Container>
        </ContentWrapper>
        <Cart bundles={bundles} />
      </Container>
    );
  }
}
