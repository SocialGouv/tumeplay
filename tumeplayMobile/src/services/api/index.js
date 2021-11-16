import {ApolloClient, InMemoryCache} from '@apollo/client';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const client = new ApolloClient({
  uri: REACT_APP_API_URL + '/graphql',
  cache: new InMemoryCache(),
});

export default client;
