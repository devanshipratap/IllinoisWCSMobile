/*
* Class for displaying user details and QR code
* */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Image  } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default class Home extends Component {

    // Construct the component
    constructor(props) {
        super(props);
    }

    // Render component
    render() {
        return (
            <View style={styles.container}>
                {/* Display the logo */}
                <Image style={styles.image} source={require('../illinoiswcs.png')}/>

                {/* Display the user's name */}
                <Text style={styles.welcome}>Welcome,</Text>
                <Text style={styles.welcome}>{this.props.name}!</Text>

                {/* Display the user's QR code encoded with their email */}
                <QRCode
                    value={this.props.email}
                />
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
    },
    welcome: {
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
        flex: 0.05
    },
    image: {
        marginTop: 15,
        width: 215,
        alignItems: "center",
        justifyContent: "center",
        flex: 0.06
    }
});
