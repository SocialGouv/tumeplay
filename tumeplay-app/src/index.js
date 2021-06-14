import {AppRegistry} from 'react-native';
import App from './App';
import withApollo from './hooks/withApollo.jsx'

AppRegistry.registerComponent('App', () => withApollo(App));

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});
