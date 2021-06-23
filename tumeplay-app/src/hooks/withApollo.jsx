import React, { Component } from 'react';
import {ApolloProvider} from '@apollo/client/react';
import {ApolloClient, InMemoryCache} from '@apollo/client';

const withAppolo = Component => props => {

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL + '/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};

export default withAppolo;
