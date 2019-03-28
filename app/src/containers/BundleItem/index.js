import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheck } from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';

// Components
import Image from '../../components/Image';

// Stores
import CartStore from '../../stores/cartStore';

// utils
import ExtraDataImages from '../../utils/extraData';
import Currency from '../../utils/currencyParser';

export default class BundleItem extends Component {
  state = { addedToCart: false, bundle: { products: [] } };

  componentDidMount() {
    this.setState({ bundle: this.props.bundle });
  }

  componentWillReceiveProps(props) {
    this.setState({ bundle: props.bundle });
  }

  /**
   * Returns the price of the bundle.
   */
  getPrice = bundle => bundle.products.reduce((price, product) => price + product.price, 0);

  /**
   * Returns the discounted price.
   * Percentage multiplier is (100 - discountPercentage) / 100.
   */
  getPriceWithDiscount = bundle =>
    (this.getPrice(bundle) * (100 - bundle.discountPercentage || 0)) / 100;

  /**
   * Returns a string with all the product names
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
        <Col xs={12} className="pl-0 pr-0">
          <Image src={ExtraDataImages[bundle._id]} />
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
            {Currency.get(this.getPrice(bundle))}
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
                Currency.get(this.getPriceWithDiscount(bundle))
              )}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
