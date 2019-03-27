import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './style.scss';

export default class Index extends PureComponent {
  render() {
    return (
      <Container className="page-not-found-container text-center h-100">
        <Row className="h-100">
          <Col className="align-self-center">
            <h3 className="mt-3 page-not-found-subtitle">Error: 404 not found</h3>

            <p className="page-not-found-text">
              Sorry, the page you're trying to get does not exist.
              <br />
              You might be using an invalid ID for a product. Try going back.
            </p>
            <p />
          </Col>
        </Row>
      </Container>
    );
  }
}
