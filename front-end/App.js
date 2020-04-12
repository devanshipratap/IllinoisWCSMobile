import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button  } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { clientId } from './auth.json';

export default class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        signedIn: false,
        name: "",
      }
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: clientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.setState({
          signedIn: true,
          name: result.user.name,
        })
      } else {
        console.log("Request cancelled")
      }
    } catch (e) {
      console.log("Error", e)
    }
  };

  render() {
    return (
        <View style={styles.container}>
        {this.state.signedIn
              ? ( <LoggedInPage name={this.state.name} />)
              : ( <LoginPage signIn={this.signIn} /> )}
        </View>
    )
  }
}

const LoginPage = props => {
  return (
      <View >
        <Image style={styles.image} source={require('./illinoiswcs.png')}/>
        <Button style={styles.header} title="Sign in with Google" onPress={() => props.signIn()} />
      </View>
      )
};

const LoggedInPage = props => {
  return (
      <View>
        <Image style={styles.image} source={require('./illinoiswcs.png')}/>
        <Text style={styles.header}>Welcome! {props.name}</Text>
  </View>
)
};

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
