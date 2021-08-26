import React, { Component } from 'react';
import {ApolloProvider} from '@apollo/client/react';
import {ApolloClient, InMemoryCache} from '@apollo/client';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const withAppolo = Component => props => {

  const client = new ApolloClient({
    uri: REACT_APP_API_URL + '/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};

export default withAppolo;
