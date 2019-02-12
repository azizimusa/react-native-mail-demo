/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './home';
import Camera from './camera';
import ViewPhoto from './ViewPhoto';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Camera: {
    screen: Camera
  },
  ViewPhoto: {
    screen: ViewPhoto
  }
});

export default createAppContainer(AppNavigator);
