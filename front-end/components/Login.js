/*
* Class for logging in to the app
* */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button  } from 'react-native';
import Home from './Home'
import { signInHelper } from '../SignIn'

export default class Login extends Component {

    // Construct the state of the component
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            name: "",
            email: ""
        }
    }

    // Wait until a result is obtained by calling signInHelper
    signIn = async () => {
        let result = await signInHelper();
        console.log(result);
        this.setState({
            signedIn: true,
            name: result.name,
            email: result.email
        });
    };

    // Render component
    render() {
        return (
            <View style={styles.container}>
                {this.state.signedIn
                    // If user successfully signed in, display Home page
                    ? ( <Home name={this.state.name} email={this.state.email}/>)
                    // If sign in was unsuccessful, stay on login page
                    : ( <LoginPage signIn={this.signIn} /> )}
            </View>
        )
    }
}

// Define the View for the Login Page
const LoginPage = props => {
    return (
        <View >
            {/* Display the logo */}
            <Image style={styles.image} source={require('../illinoiswcs.png')}/>

            {/* Action button to sign in */}
            <Button style={styles.header} title="Sign in with Google" onPress={() => props.signIn()} />
        </View>
    )
};

// Style sheet
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
