import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button  } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { clientId } from '../auth.json';
import QRCode from 'react-native-qrcode-svg';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            name: "",
            email: ""
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
                    email: result.user.email
                });
                console.log(result.user)
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
                    ? ( <LoggedInPage name={this.state.name} email={this.state.email}/>)
                    : ( <LoginPage signIn={this.signIn} /> )}
            </View>
        )
    }
}

const LoginPage = props => {
    return (
        <View >
            <Image style={styles.image} source={require('../illinoiswcs.png')}/>
            <Button style={styles.header} title="Sign in with Google" onPress={() => props.signIn()} />
        </View>
    )
};
const LoggedInPage = props => {
    return (
        <View>
            <Image style={styles.image2} source={require('../illinoiswcs.png')}/>
            <Text style={styles.welcome}>Welcome!</Text>
            <Text style={styles.welcome}>{props.name}</Text>
            <QRCode
                value={props.email}
            />
            {/*<div id="qrcode"></div>*/}
            {/*<script type="text/javascript">*/}
            {/*    new QRCode(document.getElementById("qrcode"), {props.email});*/}
            {/*</script>*/}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#ffe6e6",
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
    welcome: {
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
        flex: 0.1
    },
    image: {
        marginTop: 15,
        width: 210,
        alignItems: "center",
        justifyContent: "center",
        flex: 0.25
    },
    image2: {
        marginTop: 15,
        width: 210,
        alignItems: "center",
        justifyContent: "center",
        flex: 0.15
    }
});
