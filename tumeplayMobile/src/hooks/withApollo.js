import React from 'react';
import {ApolloProvider} from '@apollo/client/react';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {REACT_APP_API_URL} from '@env';

const withAppolo = Component => props => {
  const client = new ApolloClient({
    uri: REACT_APP_API_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};

export default withAppolo;
