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

export default class BundleItem extends Component {
  state = { addedToCart: false, bundle: {} };

  componentDidMount() {
    this.setState({ bundle: this.props.bundle });
  }

  componentWillReceiveProps(props) {
    this.setState({ bundle: props.bundle });
  }

  render() {
    const { addedToCart, bundle } = this.state;

    return (
      <div className="mb-3 bas-bundle-item">
        {/* Image */}
        <Row>
          <Col>Image</Col>
        </Row>

        {/* Details */}
        <Row>
          <Col xs={8} className="bas-bundle-name">
            {bundle.name}
          </Col>
          <Col xs={4} className="text-right bas-bundle-price">
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
                bundle.discountPercentage
              )}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

// export default props => (
//   <div className="bas-bundle-item" onClick={() => History.push(`/bundles/${props.bundle._id}`)}>
//     <Row>
//       <Col>Image</Col>
//     </Row>
//     <Row>
//       <Col>{props.bundle.name}</Col>
//       <Col>{props.bundle.discountPercentage}</Col>
//     </Row>
//   </div>
// );
