import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button  } from 'react-native';
import Login from './components/Login.js'

export default class App extends Component {

  render() {
    return (
        <View style={styles.container}>
          <Login/>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.2
  },
  image: {
    marginTop: 15,
    width: 210,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.25
  }
});
