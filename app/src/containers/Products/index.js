import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Components
import ProductItem from '../../components/ProductItem';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

export default class Products extends Component {
  state = { loading: true, error: null, products: [] };

  componentWillReceiveProps(props) {
    const { loading, error, products } = props;
    this.setState({ loading, error, products });
  }

  render() {
    const { loading, error, products } = this.state;

    return (
      <React.Fragment>
        {/* Title */}
        <Row>
          <Col className="pl-0 mt-4 bas-products-title">
            <h5>PRODUCTS</h5>
          </Col>
        </Row>

        {/* Loading */}
        {loading && <Spinner text="Searching the Auction House" />}

        {/* Error */}
        {!loading && error && <Error text={error} />}

        {/* Products */}
        {!loading && !error && (
          <Row>
            {products.map(product => (
              <Col xs={12} sm={12} lg={6} xl={4} key={product._id} className="pl-0">
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
        )}
      </React.Fragment>
    );
  }
}
