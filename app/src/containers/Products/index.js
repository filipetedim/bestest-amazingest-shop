import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';

// Components
import ProductItem from '../../containers/ProductItem';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

export default class Products extends Component {
  state = { loading: true, error: null, search: '', filter: false, products: [] };

  componentWillReceiveProps(props) {
    const { loading, error, products } = props;
    this.setState({ loading, error, products });
  }

  /**
   * On change event for the search.
   */
  onSearchChange = event => {
    const { value } = event.target;
    this.setState({ search: value });
  };

  /**
   * On click event for the price filter.
   */
  onFilterChange = () => this.setState({ filter: !this.state.filter });

  render() {
    const { loading, error, search, filter, products } = this.state;

    return (
      <React.Fragment>
        {/* Title */}
        <Row>
          <Col xs={4} className="pl-0 mt-4 bas-products-title">
            <h5>PRODUCTS</h5>
          </Col>
          <Col xs={8} md={2} />
          <Col xs={1} className="pl-0 pr-2 pt-1 mt-4 mb-4 bas-products-title text-right">
            <FontAwesomeIcon color="#7D828A" size="1x" icon={faSearch} />
          </Col>
          <Col xs={8} md={3} className="pl-0 pr-0 mt-4 mb-4">
            <Input
              className="form-control-sm bas-products-search"
              placeholder="Search for a product name..."
              value={search}
              onChange={this.onSearchChange}
            />
          </Col>
          <Col xs={3} md={2} className="pl-0 mt-4 mb-4">
            <Button
              size="sm"
              block
              className="text-right bas-products-filter"
              onClick={this.onFilterChange}
            >
              <FontAwesomeIcon color="#d8d8da" size="1x" icon={filter ? faCaretUp : faCaretDown} />{' '}
              Price
            </Button>
          </Col>
        </Row>

        {/* Loading */}
        {loading && <Spinner text="Searching the Auction House" />}

        {/* Error */}
        {!loading && error && <Error text={error} />}

        {/* Products */}
        {!loading && !error && (
          <Row>
            {products
              .sort((a, b) => (filter ? a.price - b.price : b.price - a.price))
              .filter(product => product.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
              .map(product => (
                <Col
                  xs={12}
                  sm={12}
                  lg={4}
                  xl={3}
                  key={product._id}
                  className="pl-0 bas-products-item"
                >
                  <ProductItem product={product} />
                </Col>
              ))}
          </Row>
        )}
      </React.Fragment>
    );
  }
}
