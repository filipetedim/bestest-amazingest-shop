import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faMinus,
  faPlus,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';

// Stores
import CartStore from '../../stores/cartStore';

// Utils
import Currency from '../../utils/currencyParser';

class Cart extends Component {
  state = { toggle: false, bundles: [] };

  componentWillReceiveProps(props) {
    this.setState({ bundles: props.bundles });
  }

  /**
   * Toggles the cart on and off in mobile.
   */
  toggleCart = () => this.setState({ toggle: !this.state.toggle });

  /**
   * Returns the available discounts given the current products in the cart.
   */
  getAvailableDiscounts = () => {
    const { bundles } = this.state;

    // Deep clone
    const productCartCopy = JSON.parse(JSON.stringify(CartStore.cart));
    const bundleCopy = JSON.parse(JSON.stringify(bundles));
    const bundleCart = [];

    bundleCopy.forEach(bundle => {
      let indexesToRemove;
      let addedToBundle;
      do {
        indexesToRemove = [];
        addedToBundle = false;

        // Searches cart to see if product exists and store its index
        for (let bundleIndex = 0; bundleIndex < bundle.products.length; bundleIndex++) {
          for (let i = productCartCopy.length - 1; i > -1; i--) {
            if (productCartCopy[i]._id.toString() === bundle.products[bundleIndex]._id.toString()) {
              indexesToRemove.push(i);
              break;
            }
          }
        }

        // If found as many indexes as products in a bundle, add that bundle and remove from cart clone
        if (indexesToRemove.length === bundle.products.length) {
          indexesToRemove.sort((a, b) => a - b);
          do {
            const indexToRemove = indexesToRemove.pop();
            productCartCopy.splice(indexToRemove, 1);
          } while (indexesToRemove.length > 0);

          const exists = bundleCart.filter(
            bundleItem => bundleItem._id.toString() === bundle._id.toString()
          )[0];

          if (exists) {
            exists.quantity++;
          } else {
            bundleCart.push({ ...bundle, quantity: 1 });
          }

          addedToBundle = true;
        }
      } while (addedToBundle);
    });

    return bundleCart;
  };

  /**
   * Returns the total discount value for a bundle depending on quantity.
   */
  getBundleTotalDiscount = bundle => {
    const bundlePrice = bundle.products.reduce((price, product) => price + product.price, 0);

    const discountPrice = (bundlePrice * (bundle.discountPercentage || 0)) / 100;
    return (discountPrice * bundle.quantity).toFixed(2);
  };

  /**
   * Link to checkout.
   */
  goToCheckout = () =>
    window.open(
      'https://support.wwf.org.uk/donate-to-wwf?pc=ASF001001&ds_medium=cpc&&ds_rl=1263317'
    );

  render() {
    const { toggle } = this.state;
    const bundleCart = this.getAvailableDiscounts();
    const productGroupedChart = CartStore.getGroupedCart();
    const totalPrice = CartStore.getTotalPrice();
    const totalDiscountPrice = bundleCart.reduce(
      (price, bundle) => this.getBundleTotalDiscount(bundle),
      0
    );

    return (
      <div className=" mt-4" style={{ marginBottom: 500 }}>
        <Container className="bas-cart" fluid>
          {/* Header */}
          <Row className="bas-cart-title" onClick={this.toggleCart}>
            <Col>
              <FontAwesomeIcon size="1x" icon={faShoppingCart} /> Basket
            </Col>
            <Col className="text-center bar-cart-title-toggle">
              {toggle ? (
                <FontAwesomeIcon size="1x" icon={faChevronDown} />
              ) : (
                <FontAwesomeIcon size="1x" icon={faChevronUp} />
              )}
            </Col>
            <Col className="text-right bar-cart-title-total">Total: {Currency.get(totalPrice)}</Col>
          </Row>

          {/* Content */}
          <Row className={`bas-cart-content ${toggle && 'show'}`}>
            {productGroupedChart.map((product, i) => (
              <Col key={i} xs={12} className="bas-cart-item">
                <div>{product.name}</div>
                <Row>
                  <Col xs={7}>
                    <FontAwesomeIcon
                      size="1x"
                      icon={faMinus}
                      onClick={() => CartStore.removeProduct(product)}
                      className="bas-cart-item-icon"
                    />
                    <span className="mr-2 ml-2 bas-cart-item-quantity">{product.quantity}</span>
                    <FontAwesomeIcon
                      size="1x"
                      icon={faPlus}
                      onClick={() => CartStore.addProduct(product)}
                      className="bas-cart-item-icon"
                    />
                  </Col>
                  <Col xs={5} className="text-right">
                    {Currency.get(product.price * product.quantity)}
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>

          {/* Price and View Price */}
          <Row className={`bas-cart-footer ${toggle && 'show'}`}>
            {bundleCart.map((bundle, i) => (
              <React.Fragment key={i}>
                <Col xs={12} key={i} className="bas-cart-footer-discount">
                  {bundle.quantity}x {bundle.name}
                </Col>
                <Col xs={12} className="bar-cart-footer-discount-price text-right">
                  - {Currency.get(this.getBundleTotalDiscount(bundle))}
                </Col>
              </React.Fragment>
            ))}
            <Col className="mt-3 bar-cart-footer-total">Total</Col>
            <Col className="mt-3 text-right bar-cart-footer-total">
              {Currency.get(totalPrice - totalDiscountPrice)}
            </Col>
            <Col xs={12} className="mt-2">
              <Button color="warning" block onClick={this.goToCheckout}>
                Checkout
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default observer(Cart);
