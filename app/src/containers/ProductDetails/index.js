import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';

// Components
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import Image from '../../components/Image';

// Stores
import CartStore from '../../stores/cartStore';

// Utils
import ExtraDataImages from '../../utils/extraData';
import Currency from '../../utils/currencyParser';

export default class ProductDetails extends Component {
  state = { loading: true, error: null, addedToCart: false, product: {} };

  componentWillReceiveProps(props) {
    const { loading, error, product } = props;
    this.setState({ loading, error, product });
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
    const { loading, error, addedToCart, product } = this.state;

    return (
      <React.Fragment>
        {/* Loading */}
        {loading && <Spinner text="Finding your Triforce Shield" />}

        {/* Error */}
        {!loading && error && <Error text={error} />}

        {/* Product Details */}
        {!loading && !error && (
          <React.Fragment>
            {/* Title */}
            <Row>
              <Col className="pl-0 mt-4" xs={12} sm={6}>
                <div className="bas-product-details-image">
                  <Image src={ExtraDataImages[product._id]} />
                </div>
              </Col>
              <Col className="pl-0 mt-4" xs={12} sm={6}>
                <Col xs={12} className="bas-product-details-title">
                  {product.name}
                </Col>
                <Col xs={12} className="bas-product-details-price">
                  <span>Price:</span> {Currency.get(product.price)}{' '}
                  <Button
                    size="sm"
                    color="light"
                    className={`ml-3 bas-product-details-price-button ${addedToCart && 'loading'}`}
                    onClick={this.addToCart}
                  >
                    {addedToCart ? (
                      <React.Fragment>
                        <FontAwesomeIcon icon={faCheck} /> Add to cart
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                      </React.Fragment>
                    )}
                  </Button>
                </Col>
                <Col xs={12} className="bas-product-details-description">
                  And as for the television's so-called plan, Batman has no jurisdiction. But I know
                  the rage that drives you. That impossible anger strangIing the grief until the
                  memory of your loved one is just poison in your veins. And one day, you catch
                  yourself wishing the person you loved had never existed so you'd be spared your
                  pain.
                </Col>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
