import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Redirect } from 'react-router-dom';

export default () => (
  <ApolloConsumer>
    {client => {
      client.resetStore();
      localStorage.setItem('token', '');
      localStorage.setItem('refreshToken', '');
      return <Redirect to="/login" />;
    }}
  </ApolloConsumer>
);
