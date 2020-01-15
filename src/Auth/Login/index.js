import React, { Component } from 'react';
import {
    Text, Image, View, StyleSheet, TextInput, Alert, ScrollView,
} from 'react-native';
import { Button, Layout } from 'react-native-ui-kitten';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';
import qs from 'qs';
//
import { lock, email, emailRegex, isNumeric, hostClient } from '../../Helper/Constants';
import Promises from '../../Helper/Promises';

import { googleService } from '../../Helper/GoogleService';

export default class index extends Component {

    state = {
        emailValue: '',
        passwordValue: '',
    }

    onLoginPress = () => {
        // this.props.navigation.navigate('Dashboard');
        const { emailValue, passwordValue } = this.state;
        if (emailValue == '') {
            Alert.alert('Please enter email')
        } else if (passwordValue == '') {
            Alert.alert('Please enter password')
        } else {
            if (isNumeric(emailValue)) {
                if (emailValue.length === 10) {
                    const obj = { phone: emailValue, password: passwordValue }
                    axios.post(`${hostClient}login`, obj).then((result) => {
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
                    })
                }
            } else {
                if (emailRegex.test(emailValue)) {
                    const obj = { email: emailValue, password: passwordValue }
                    console.log(obj);
                    let axiosConfig = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                        },
                    };
                    axios.post(`${hostClient}login`, qs.stringify(obj), axiosConfig).then((result) => {
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
                    })
                } else {
                    Alert.alert('Please enter valid email')
                }
            }
        }
    }

    onGoogleLogin = () => {
        googleService.handleGoogleLogin()
            .then((result) => {
                const obj = { email: result.user.email }
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                };
                axios.post(`${hostClient}social_signin`, qs.stringify(obj), axiosConfig).then((res) => {
                    console.log(res);
                    const { message, status, token } = res.data;
                    if (status) {
                        Promises.setUserToken(token);
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                    } else {
                        Alert.alert(message);
                    }
                })
            }).catch((e) => {
                console.log(e)
            })
    }

    onForgetPress = () => {
        this.props.navigation.navigate('Forget')
    }

    onEmailChange = (value) => {
        this.setState({ emailValue: value });
    }

    onPasswordChange = (value) => {
        this.setState({ passwordValue: value });
    }

    onSigninPress = () => {
        this.props.navigation.navigate('Register');
    }


    render() {
        const { container, container2, container1, txtTitle, innerContainer,
            input, line, inputStyles, txtForget, btnNext, txtSignin, btnGoogle } = styles;
        const { passwordValue, emailValue } = this.state;
        return (
            <Layout style={container}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={container1}>
                        <Image source={require('../../../assets/images/appicon.png')} />
                        <Text style={txtTitle}>Login</Text>
                    </View>

                    <View style={container2}>
                        <View style={innerContainer}>
                            <View style={input}>
                                <View style={{ width: 20 }}>
                                    {email}
                                </View>
                                <View style={line} />
                                <TextInput
                                    autoCapitalize='none'
                                    value={emailValue}
                                    style={inputStyles}
                                    placeholder='Email Id / Phone Number'
                                    onChangeText={(value) => this.onEmailChange(value)}
                                />
                            </View>

                            <View style={input}>
                                <View style={{ width: 20 }}>
                                    {lock}
                                </View>
                                <View style={line} />
                                <TextInput
                                    secureTextEntry
                                    value={passwordValue}
                                    style={inputStyles}
                                    placeholder='Password'
                                    onChangeText={(value) => this.onPasswordChange(value)}
                                />
                            </View>

                            <Text onPress={this.onForgetPress} style={txtForget}>Forgot Password ?</Text>

                            <Button
                                onPress={this.onLoginPress}
                                size='giant' style={btnNext}>Login</Button>

                            {/* <Button
                                onPress={this.onGoogleLogin}
                                icon={this.renderIcon}
                                size='large' style={btnGoogle}>SIGN UP WITH GOOGLE</Button> */}

                            <View style={{ flex: 1, marginBottom: 60, justifyContent: 'flex-end' }}>
                                <Text style={txtSignin}>Don't have an account ?
                                <Text onPress={this.onSigninPress} style={{ color: '#3958ad', fontFamily: 'Karla-Bold' }}> Create Account</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        flex: 1,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        marginTop: 30,
        flexDirection: 'row',
        height: 45,
    },
    line: {
        marginHorizontal: 15,
        height: 25,
        backgroundColor: '#ddd',
        width: 1,
    },
    inputStyles: { height: 35, padding: 0, flex: 1, fontSize: 17, fontFamily: 'Karla-Regular' },
    txtSignin: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Karla-Regular',
        marginTop: 35,
    },
    txtForget: {
        textAlign: 'right',
        marginTop: 20,
        fontFamily: 'Karla-Regular',
        fontSize: 18,
    },
    btnGoogle: {
        backgroundColor: '#e05141',
        borderWidth: 0,
        marginTop: 30,
        elevation: 2,
    },
});
