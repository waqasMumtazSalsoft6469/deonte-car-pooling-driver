/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';


console.log('appNameappName',appName)

AppRegistry.registerComponent(appName, () => App);
