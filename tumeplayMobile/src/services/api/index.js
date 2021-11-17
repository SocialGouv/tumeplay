import {ApolloClient, InMemoryCache} from '@apollo/client';
import {REACT_APP_API_URL} from '@env';

const client = new ApolloClient({
  uri: REACT_APP_API_URL + '/graphql',
  cache: new InMemoryCache(),
});

export default client;
