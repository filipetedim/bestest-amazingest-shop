import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Components
import BundleItem from '../../containers/BundleItem';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

export default class Bundles extends Component {
  state = { loading: true, error: null, bundles: [] };

  componentWillReceiveProps(props) {
    const { loading, error, bundles, products } = props;
    const bundlesWithProducts = bundles.map(bundle => this.bundleWithProducts(bundle, products));
    this.setState({ loading, error, bundles: bundlesWithProducts });
  }

  /**
   * Matches the bundle with its product ids.
   */
  bundleWithProducts = (bundle, products) => {
    const { products: bundleProducts, ...bundleProps } = bundle;

    const bundleProductsWithData = bundleProducts.map(
      productId => products.filter(product => product._id.toString() === productId.toString())[0]
    );

    return {
      ...bundleProps,
      products: bundleProductsWithData,
    };
  };

  render() {
    const { loading, error, bundles } = this.state;

    return (
      <React.Fragment>
        {/* Title */}
        <Row>
          <Col className="pl-0 mt-4 bas-bundles-title">
            <h5>BUNDLES</h5>
          </Col>
        </Row>

        {/* Loading */}
        {loading && <Spinner text="Making you richer" />}

        {/* Error */}
        {!loading && error && <Error text={error} />}

        {/* Bundles */}
        {!loading && !error && (
          <Row>
            {bundles.map(bundle => (
              <Col xs={12} sm={12} lg={6} xl={4} key={bundle._id} className="pl-0">
                <BundleItem bundle={bundle} />
              </Col>
            ))}
          </Row>
        )}
      </React.Fragment>
    );
  }
}
