import React, { Component } from 'react';
import {ApolloProvider} from '@apollo/client/react';
import {ApolloClient, InMemoryCache} from '@apollo/client';

const withAppolo = Component => props => {

  const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};

export default withAppolo;