/*
* Class for the App
*
* */

import React, {Component} from 'react';
import { StyleSheet, View  } from 'react-native';
import Login from './components/Login.js'

export default class App extends Component {

  // Render the view for the first screen
  render() {
    return (
        <View style={styles.container}>
          <Login/>
        </View>
    )
  }
}

// Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center"
  }
});
