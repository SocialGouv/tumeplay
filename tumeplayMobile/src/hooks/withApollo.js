import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {ApolloProvider} from '@apollo/client/react';
import {ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client';
import {
  REACT_APP_API_URL,
  REACT_APP_API_PREPROD_URL,
  REACT_APP_URL,
} from '@env';
import {onError} from '@apollo/client/link/error';
import VersionCheck from 'react-native-version-check';
import {ActivityIndicator} from 'react-native-paper';
import {versionCompare} from '../services/utils';

const withAppolo = Component => props => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpLink, setHttpLink] = useState(null);
  const [client, setClient] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);

  const errorLink = onError(({networkError, graphQLErrors}) => {
    // console.log('NetworkCode : ' + JSON.stringify(networkError, null, 2));
    // console.log('GraphqlError : ' + JSON.stringify(graphQLErrors, null, 2));
  });

  const setupApollo = async () => {
    const response = await fetch(REACT_APP_URL + '/parametres');
    const data = await response.json();

    const currentVersion = VersionCheck.getCurrentVersion();
    const prodVersion =
      Platform.OS === 'android'
        ? data.prod_version_number_android
        : data.prod_version_number_ios;

    const versionDiff = versionCompare(currentVersion, prodVersion);

    setApiUrl(
      versionDiff > 0
        ? REACT_APP_API_PREPROD_URL.replace('/graphql', '')
        : REACT_APP_API_URL.replace('/graphql', ''),
    );

    setHttpLink(
      new HttpLink({
        uri: versionDiff > 0 ? REACT_APP_API_PREPROD_URL : REACT_APP_API_URL,
      }),
    );
  };

  useEffect(() => {
    setupApollo();
  }, []);

  useEffect(() => {
    if (httpLink) {
      setClient(
        new ApolloClient({
          cache: new InMemoryCache(),
          link: from([errorLink, httpLink]),
        }),
      );
    }
  }, [httpLink]);

  useEffect(() => {
    if (httpLink && client) {
      setIsLoading(false);
    }
  }, [client]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ApolloProvider client={client}>
      <Component apiUrl={apiUrl} {...props} />
    </ApolloProvider>
  );
};

export default withAppolo;
