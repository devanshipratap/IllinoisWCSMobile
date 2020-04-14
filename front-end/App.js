/*
* Class for the App
*
* */

import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import MainTabNavigator from './navigation/MainTabNavigator';

// Create a navigation bar for the app
const RootStack = createSwitchNavigator({
  Main: MainTabNavigator,
});

// Create a container for the app
const App = createAppContainer(RootStack);
export default App;

