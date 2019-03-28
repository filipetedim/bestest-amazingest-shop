import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheck } from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';

// Stores
import CartStore from '../../stores/cartStore';

export default class BundleItem extends Component {
  state = { addedToCart: false, bundle: { products: [] } };

  componentDidMount() {
    this.setState({ bundle: this.props.bundle });
  }

  componentWillReceiveProps(props) {
    this.setState({ bundle: props.bundle });
  }

  /**
   * Gets the price of the bundle.
   */
  getPrice = bundle => bundle.products.reduce((price, product) => price + product.price, 0);

  /**
   * Returns the discounted price.
   * Percentage multiplier is (100 - discountPercentage) / 100.
   */
  getPriceWithDiscount = bundle =>
    (this.getPrice(bundle) * (100 - bundle.discountPercentage || 0)) / 100;

  /**
   * Gets a string with all the product names
   */
  getProductNames = bundle =>
    bundle.products.reduce(
      (text, product) => (text += text === '' ? product.name : ', ' + product.name),
      ''
    );

  /**
   * Adds all the products in the bundle to the cart.
   */
  addToCart = event => {
    this.setState({ addedToCart: true });

    this.state.bundle.products.forEach(product => CartStore.addProduct(product));

    setTimeout(() => {
      this.setState({ addedToCart: false });
    }, 2000);
  };

  render() {
    const { addedToCart, bundle } = this.state;

    return (
      <div className="mb-3 bas-bundle-item">
        {/* Image */}
        <Col xs={12}>
          <div className="bas-bundle-discount" />
          Image
        </Col>

        {/* Details */}
        <Col xs={12} className="bas-bundle-name">
          {bundle.name}
        </Col>
        <Col xs={12} className="bas-bundle-products">
          includes: {this.getProductNames(bundle)}
        </Col>
        <Row>
          <Col xs={12} className="text-right bas-bundle-price-old">
            {this.getPrice(bundle)}
          </Col>
          <Col xs={6} className="bas-bundle-discount">
            <span>{bundle.discountPercentage} %</span>
          </Col>
          <Col xs={6} className="text-right bas-bundle-price">
            <Button
              size="sm"
              color="light"
              className={`bas-bundle-price-button ${addedToCart && 'loading'}`}
              onClick={this.addToCart}
            >
              {addedToCart ? (
                <React.Fragment>
                  <FontAwesomeIcon icon={faCheck} /> <FontAwesomeIcon icon={faShoppingCart} />
                </React.Fragment>
              ) : (
                this.getPriceWithDiscount(bundle)
              )}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
