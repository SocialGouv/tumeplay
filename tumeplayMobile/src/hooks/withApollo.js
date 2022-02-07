import React from 'react';
import {ApolloProvider} from '@apollo/client/react';
import {ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client';
import {REACT_APP_API_URL} from '@env';
import {onError} from '@apollo/client/link/error';

const withAppolo = Component => props => {

  const errorLink = onError(({networkError, graphQLErrors}) => {
    // console.log('NetworkCode : ' + JSON.stringify(networkError, null, 2));
    // console.log('GraphqlError : ' + JSON.stringify(graphQLErrors, null, 2));
  });
  const httpLink = new HttpLink({
    uri: REACT_APP_API_URL,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });
  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};

export default withAppolo;
