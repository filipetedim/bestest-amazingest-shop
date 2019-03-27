import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Components
import BundleItem from '../../components/BundleItem';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

export default class Bundles extends Component {
  state = { loading: true, error: null, bundles: [], products: [] };

  componentWillReceiveProps(props) {
    const { loading, error, bundles, products } = props;
    this.setState({ loading, error, bundles, products });
  }

  render() {
    const { loading, error, bundles } = this.state;

    return (
      <React.Fragment>
        {/* Title */}
        <Row>
          <Col className="pl-0">
            <h3>Bundles</h3>
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
              <Col key={bundle._id} className="pl-0">
                <BundleItem bundle={bundle} />
              </Col>
            ))}
          </Row>
        )}
      </React.Fragment>
    );
  }
}
