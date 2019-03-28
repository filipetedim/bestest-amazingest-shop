import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD6 } from '@fortawesome/free-solid-svg-icons';

// Theme
import './style.scss';
import Logo from './logo.png';

// Utils
import History from '../../utils/history';

export default class Header extends Component {
  /**
   * Loads a specific path in History.
   */
  loadPage = path => History.push(path);

  render() {
    return (
      <React.Fragment>
        <Jumbotron className="bas-header">
          <Row className="text-center p-0 m-0">
            <Col className="p-0 m-0">
              <img src={Logo} alt="" />
            </Col>
          </Row>
          <Container>
            <Row className="p-0 m-0">
              <Col className="p-0 m-0">
                <span className="bas-menu" onClick={() => History.push('/products')}>
                  <FontAwesomeIcon icon={faDiceD6} /> PRODUCTS
                </span>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </React.Fragment>
    );
  }
}
