/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import withApollo from './src/hooks/withApollo.jsx';

AppRegistry.registerComponent(appName, () => withApollo(App));
