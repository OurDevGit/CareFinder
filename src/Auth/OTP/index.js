import React, { Component } from 'react';
import {
    Text, Image, View, StyleSheet, Alert,
    ScrollView, TextInput, TouchableOpacity,
} from 'react-native';
import { Layout, Button } from 'react-native-ui-kitten';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import axios from 'axios';

//
import { phone, Back, hostClient } from '../../Helper/Constants';

import CountryPicker from '../../lib/countryPicker';
import Flags from '../../lib/resources/flags';

export default class index extends Component {

    state = {
        phoneValue: '',
        isFilled: false,
        isVerified: true,
        countryCode: '',
        zipCode: '+1',
        otp1: null,
        otp2: null,
        visible: false,
        flag: 'us',

    };

    componentDidMount = () => {
        this.getGeoInfo();
    }

    onCallOTP = () => {
        const { phoneValue, zipCode } = this.state;
        const obj = { mobile: zipCode + phoneValue }
        console.log(obj);
        if (phoneValue != '' && phoneValue.length == 10) {
            Alert.alert('OTP Send');
            // Call API
            axios.post(`${hostClient}send_otp`, obj).then((response) => {
                let data = response.data;
                console.log(data);
            }).catch((error) => {
                Alert.alert(error);
            });
        } else {
            Alert.alert('Enter valid Phone number')
        }
    }

    getGeoInfo = () => {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            this.setState({
                countryCode: data.country_calling_code,
            });
        }).catch((error) => {
            console.log(error);
            Alert.alert(error);
        });
    };

    onNextPress = () => {
        const { isVerified, phoneValue } = this.state;
        const registerParam = this.props.navigation.getParam('registerParam');
        const param = { data: registerParam, phone: phoneValue }
       // console.log(param);
        // if (isVerified) {
        //     this.props.navigation.navigate('Password', { registerParam: param });
        // } else {
        //     Alert.alert('Please verify phone number')
        // }

        if (phoneValue != '' && phoneValue.length == 10) {
            this.props.navigation.navigate('Password', { registerParam: param });
        } else {
            Alert.alert('Please add valid phone number')
        }
    }

    onPhoneChange = (value) => {
        this.setState({ phoneValue: value });
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    }

    onCodeFilled = (code) => {
        const { phoneValue, zipCode } = this.state;
        this.setState({ code, isFilled: true })
        const obj = { otp: code, mobile: zipCode + phoneValue }
        axios.post(`${hostClient}verify_otp`, obj).then((response) => {
            let data = response.data;
            console.log(data);
            const { success, message } = response.data
            if (success) {
                this.setState({ isVerified: true });
                this.onNextPress();
            } else {
                Alert.alert(message);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    onSelect = (country) => {
        this.setState({ zipCode: "+" + country.dialCode, flag: country.iso2, visible: false })
    }

    render() {
        const { container, container2, container1, txtTitle, innerContainer, txtWelcome,
            input, line, inputStyles, row, btnNext } = styles;
        const { phoneValue, zipCode, flag, visible } = this.state;
        return (
            <Layout style={container}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
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
                            <Text style={txtWelcome}>Please enter phone number, we will send OTP </Text>
                            <View style={input}>
                                <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                                    <Image source={Flags.get(flag)} style={{ width: 40, height: 25 }} />
                                </TouchableOpacity>
                                <View style={line} />
                                <TextInput
                                    maxLength={10}
                                    value={phoneValue}
                                    style={inputStyles}
                                    placeholder='Phone number'
                                    keyboardType='number-pad'
                                    returnKeyType='done'
                                    onChangeText={(value) => this.onPhoneChange(value)}
                                />
                            </View>

                            {/* <Button
                                onPress={this.onCallOTP}
                                size='giant' style={btnNext}>SEND</Button>

                            <Text style={txtWelcome}>Please type the verification code send to your number</Text>

                            <OTPInputView
                                style={{ height: 120 }}
                                pinCount={4}
                                code={this.state.code}
                                onCodeChanged={code => { this.setState({ code }) }}
                                autoFocusOnLoad
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled={(code => this.onCodeFilled(code))}
                            />

                            <Text onPress={this.onCallOTP} style={[txtWelcome, { marginTop: 0, fontSize: 21 }]}>Resend code</Text> 

                            <View style={input}>
                                <View style={{ width: 20 }}>
                                    {phone}
                                </View>
                                <View style={line} />
                                <TextInput
                                    value={zipCode + ' ' + phoneValue}
                                    style={inputStyles}
                                    onChangeText={(value) => this.onPhoneChange(value)}
                                />
                            </View> */}

                            <Button

                                onPress={this.onNextPress}
                                size='giant' style={btnNext}>NEXT</Button>
                        </View>
                    </View>
                    <CountryPicker close={visible} selectCountry={this.onSelect} />
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
        marginTop: 30,
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
        marginBottom: 40,
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
