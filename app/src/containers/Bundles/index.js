import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

// Theme
import './style.scss';

// Components
import BundleItem from '../../containers/BundleItem';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

export default class Bundles extends Component {
  state = { loading: true, error: null, title: '', emptyMessage: '', bundles: [] };

  componentWillReceiveProps(props) {
    const { loading, error, title, emptyMessage, bundles } = props;
    this.setState({ loading, error, title, emptyMessage, bundles });
  }

  render() {
    const { loading, error, title, emptyMessage, bundles } = this.state;

    return (
      <React.Fragment>
        {/* Title */}
        <Row>
          <Col className="pl-0 mt-4 bas-bundles-title">
            <h5>{title || 'BUNDLES'}</h5>
          </Col>
        </Row>

        {/* Loading */}
        {loading && <Spinner text="Making you richer" />}

        {/* Error */}
        {!loading && error && <Error text={error} />}

        {/* No available bundles */}
        {!loading && !error && bundles.length === 0 && (
          <Row>
            <Col className="pl-0 bas-bundles-empty">{emptyMessage}</Col>
          </Row>
        )}

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
