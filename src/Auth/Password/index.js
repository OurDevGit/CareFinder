import React, { Component } from 'react';
import {
    Text, Image, View, StyleSheet,
    TextInput, TouchableOpacity, Platform, Alert,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Layout, Button } from 'react-native-ui-kitten';
import axios from 'axios';
import qs from 'qs';

//
import Promises from '../../Helper/Promises';
import { lock, Back, hostClient } from '../../Helper/Constants';

const OS = Platform.OS;

export default class index extends Component {

    state = {
        password: '',
        cpassword: '',
        isFilled: false,
    };

    onNextPress = () => {
        const { password, cpassword } = this.state;
        if (password != '' && cpassword != '') {
            if (password === cpassword) {
                const registerParam = this.props.navigation.getParam('registerParam');
                const { firstName, lastName, email, address, zipcode } = registerParam.data;
                const phone = registerParam.phone;
                const obj = {
                    first_name: firstName, last_name: lastName, email: email,
                    address, mobile: phone, device_type: OS, password,
                }
                console.log(obj);
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                };
                axios.post(`${hostClient}register`, qs.stringify(obj), axiosConfig).then((result) => {
                    console.log(result);
                    const { message, success, token } = result.data;
                    if (success) {
                        Promises.setUserToken(token);
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                    } else {
                        Alert.alert(message);
                    }
                }).catch((e) => {
                    console.log(e);
                })
            } else {
                Alert.alert('Password not match')
            }
        } else {
            Alert.alert('Password is empty')
        }
    }

    onPhoneChange = (value) => {
        this.setState({ phoneValue: value });
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    }


    render() {
        const { container, container2, container1, txtTitle, innerContainer,
            input, line, inputStyles, row, btnNext } = styles;
        const { password, cpassword } = this.state;
        return (
            <Layout style={container}>
                <View style={container1}>
                    <Image source={require('../../../assets/images/appicon.png')} />
                    <View style={[row, { width: 250 }]}>
                        <TouchableOpacity onPress={this.onBackPress}>
                            {Back}
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', flex: 1, marginRight: 30 }}>
                            <Text style={txtTitle}>Sign up</Text>
                        </View>
                    </View>
                </View>

                <View style={container2}>
                    <View style={innerContainer}>
                        <View style={input}>
                            <View style={{ width: 20 }}>
                                {lock}
                            </View>
                            <View style={line} />
                            <TextInput
                                value={password}
                                style={inputStyles}
                                placeholder='Password'
                                onChangeText={(value) => this.setState({ password: value })}
                            />
                        </View>

                        <View style={input}>
                            <View style={{ width: 20 }}>
                                {lock}
                            </View>
                            <View style={line} />
                            <TextInput
                                secureTextEntry
                                value={cpassword}
                                style={inputStyles}
                                placeholder='Confirm Password'
                                onChangeText={(value) => this.setState({ cpassword: value })}
                            />
                        </View>

                        <Button
                            onPress={this.onNextPress}
                            size='giant' style={btnNext}>SIGN UP</Button>
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
