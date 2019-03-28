import React, { PureComponent } from 'react';
import { Container } from 'reactstrap';

// Components
import NotFoundPage from '../components/NotFoundPage';

export default class NotFound extends PureComponent {
  render() {
    return (
      <Container>
        <NotFoundPage />
      </Container>
    );
  }
}
