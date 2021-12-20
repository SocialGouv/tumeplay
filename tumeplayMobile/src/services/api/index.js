import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import {REACT_APP_API_URL} from '@env';
import {onError} from '@apollo/client/link';
import {from} from 'zen-observable';

const httpLink = new HttpLink({
  uri: REACT_APP_API_URL + '/graphql',
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  console.log('on error function called');
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([httpLink, errorLink]),
});

export default client;
