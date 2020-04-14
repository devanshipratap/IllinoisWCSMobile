/*
* Class for App navigation
* */

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from '../components/Login';
import Home from '../components/Home';

// Creating Login tab
const LoginStack = createStackNavigator({
    Login: Login,
});
LoginStack.navigationOptions = {
    tabBarLabel: 'Login'
};

// Creating bottom tab navigator
export default createBottomTabNavigator({
    LoginStack
});
