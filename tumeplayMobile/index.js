/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import withApollo from './src/hooks/withApollo';
import 'react-native-get-random-values';

AppRegistry.registerComponent(appName, () => withApollo(App));
