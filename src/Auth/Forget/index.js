import React, { Component } from 'react';
import {
    Text, Image, View, StyleSheet,
    TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { Layout, Button } from 'react-native-ui-kitten';
import axios from 'axios';

//
import { email, Back, hostClient } from '../../Helper/Constants';

export default class index extends Component {

    state = {
        phoneValue: '',
        isFilled: false,
    };

    onNextPress = () => {
        const { phoneValue } = this.state;
        if (phoneValue != '') {
            const obj = { email: phoneValue }
            axios.post(`${hostClient}forgot_password`, obj).then((result) => {
                console.log(result);
                const { message } = result.data;
                Alert.alert(message)
            })
        }
    }

    onPhoneChange = (value) => {
        this.setState({ phoneValue: value });
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    }


    render() {
        const { container, container2, container1, txtTitle, innerContainer, txtWelcome,
            input, line, inputStyles, row, btnNext } = styles;
        const { phoneValue } = this.state;
        return (
            <Layout style={container}>
                <View style={container1}>
                    <Image source={require('../../../assets/images/appicon.png')} />
                    <View style={[row, { width: 300 }]}>
                        <TouchableOpacity onPress={this.onBackPress}>
                            {Back}
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', flex: 1, marginRight: 30 }}>
                            <Text style={txtTitle}>Forgot Password ?</Text>
                        </View>
                    </View>
                </View>

                <View style={container2}>
                    <View style={innerContainer}>
                        <Text style={txtWelcome}>Enter your Email Id / Phone Number, We will send reset password link.</Text>
                        <View style={[input, { marginTop: 50 }]}>
                            <View style={{ width: 20 }}>
                                {email}
                            </View>
                            <View style={line} />
                            <TextInput
                                autoCapitalize='none'
                                value={phoneValue}
                                style={inputStyles}
                                placeholder='Email'
                                onChangeText={(value) => this.onPhoneChange(value)}
                            />
                        </View>

                        <Button
                            onPress={this.onNextPress}
                            size='giant' style={btnNext}>Submit</Button>
                    </View>
                </View>

            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3a61cb',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    container1: {
        marginVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
    },
    btnNext: {
        backgroundColor: '#3958ad',
        marginTop: 40,
        elevation: 2,
    },
    txtTitle: {
        fontSize: 24,
        color: '#FFF',
        fontFamily: 'Karla-Bold',
        textAlign: 'center',
    },
    innerContainer: {
        marginHorizontal: 30,
        marginTop: 50,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        marginTop: 30,
        flexDirection: 'row',
        height: 45,
    },
    txtWelcome: {
        fontSize: 18,
        fontFamily: 'Karla-Regular',
        marginTop: 30,
        lineHeight: 26,
    },
    line: {
        marginHorizontal: 15,
        height: 25,
        backgroundColor: '#ddd',
        width: 1,
    },
    underlineStyleBase: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: '#EEE',
        borderColor: '#999',
    },
    inputStyles: { height: 35, padding: 0, flex: 1, fontSize: 17, fontFamily: 'Karla-Regular' },
});
