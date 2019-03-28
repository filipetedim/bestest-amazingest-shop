import React from 'react';
import { Container, Row, Col } from 'reactstrap';

// Theme
import './style.scss';

export default () => (
  <Container className="text-center h-100 bas-page-not-found-container">
    <Row className="h-100">
      <Col className="align-self-center">
        <h3 className="mt-3 bas-page-not-found-subtitle">Error: 404 not found</h3>

        <p className="bas-page-not-found-text">
          Sorry, the page you're trying to get does not exist.
          <br />
          You might be using an invalid ID for a product. Try going back.
        </p>
        <p />
      </Col>
    </Row>
  </Container>
);
