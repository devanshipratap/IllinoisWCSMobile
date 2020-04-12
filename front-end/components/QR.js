import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button  } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default class QR extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require('../illinoiswcs.png')}/>
                <Text style={styles.welcome}>Welcome,</Text>
                <Text style={styles.welcome}>{this.props.name}!</Text>
                <QRCode
                    value={this.props.email}
                />
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
