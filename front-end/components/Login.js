import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button  } from 'react-native';
import QR from './QR'
import { signInHelper } from '../signin'

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
        let result = await signInHelper();
        console.log(result);
        this.setState({
            signedIn: true,
            name: result.name,
            email: result.email
        });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.signedIn
                    ? ( <QR name={this.state.name} email={this.state.email}/>)
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
