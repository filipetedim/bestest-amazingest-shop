import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheck } from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';

// Stores
import CartStore from '../../stores/cartStore';

// Utils
import History from '../../utils/history';

export default class ProductItem extends Component {
  state = { addedToCart: false, product: {} };

  componentDidMount() {
    this.setState({ product: this.props.product });
  }

  componentWillReceiveProps(props) {
    this.setState({ product: props.product });
  }

  /**
   * Adds item to cart and shows icon indicating success.
   */
  addToCart = event => {
    event.stopPropagation();
    this.setState({ addedToCart: true });

    CartStore.addProduct(this.state.product);

    setTimeout(() => {
      this.setState({ addedToCart: false });
    }, 2000);
  };

  render() {
    const { addedToCart, product } = this.state;

    return (
      <div
        className="mb-3 bas-product-item"
        onClick={() => History.push(`/products/${product._id}`)}
      >
        {/* Image */}
        <Col xs={12}>Image</Col>

        {/* Details */}
        <Row>
          <Col xs={7} className="bas-product-name">
            {product.name}
          </Col>
          <Col xs={5} className="text-right bas-product-price">
            <Button
              size="sm"
              color="light"
              className={`bas-product-price-button ${addedToCart && 'loading'}`}
              onClick={this.addToCart}
            >
              {addedToCart ? (
                <React.Fragment>
                  <FontAwesomeIcon icon={faCheck} /> <FontAwesomeIcon icon={faShoppingCart} />
                </React.Fragment>
              ) : (
                product.price
              )}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}