import React, { Component } from 'react';
import {
    Text, Image, View, StyleSheet, Alert,
    ScrollView, TextInput, TouchableOpacity, Platform,
} from 'react-native';
import { Layout, Button, Icon } from 'react-native-ui-kitten';
import RNGooglePlaces from 'react-native-google-places';

//
import { user, email, pin, location, validation, emailRegex } from '../../Helper/Constants';

import { googleService } from '../../Helper/GoogleService';


const OS = Platform.OS;


export default class index extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailValue: '',
        zipcode: '',
        address: '',
    };

    onEmailChange = (value) => {
        this.setState({ emailValue: value });
    };

    onPasswordChange = (value) => {
        this.setState({ passwordValue: value });
    };

    onSigninPress = () => {
        this.props.navigation.navigate('Login');
    }

    onNextPress = () => {
        const { firstName, lastName, emailValue, address, zipcode } = this.state;
        const value = validation(firstName, lastName, emailValue, address, zipcode);
        if (typeof value === 'string') {
            Alert.alert(value);
        } else {
            if (emailRegex.test(emailValue)) {
                const param = { firstName, lastName, email: emailValue, address}
                this.props.navigation.navigate('OTP', { registerParam: param })
            } else {
                Alert.alert('Email is not valid');
            }
        }
    }

    onGoogleLogin = () => {
        googleService.handleGoogleLogin()
            .then((result) => {
                console.log(result);

                const { email, familyName, givenName, id, photo } = result.user;
                const param = {
                    email, firstName: givenName, lastName: familyName, avatar: photo, social_id: id,
                    login_type: 'google', device_type: OS,
                };
                this.props.navigation.navigate('OTP', { registerParam: param })
            }).catch((e) => {
                console.log(e)
            })
    }

    openPlacePicker = () => {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                console.log(place);
               const zipcode =  place.addressComponents.filter(x => x.types[0] === 'postal_code');
               this.setState({ address: place.address });
               if (zipcode && zipcode.length > 0) {
                this.setState({ zipcode: zipcode[0].name });
               }
            })
            .catch(error => console.log(error.message));
    }

    renderIcon = (style) => {
        const iconName = 'google-outline'
        return (
            <Icon {...style} name={iconName} />
        );
    };

    render() {
        const { container, container2, container1, txtTitle, innerContainer, txtWelcome,
            input, line, inputStyles, btnNext, row, divider, txtOR, btnGoogle, txtSignin } = styles;
        const { address } = this.state;
        return (
            <Layout style={container}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={container1}>
                        <Image source={require('../../../assets/images/appicon.png')} />
                        <Text style={txtTitle}>Sign up</Text>
                    </View>
                    <View style={container2}>
                        <View style={innerContainer}>
                            <Text style={txtWelcome}>Welcome to CareFinder app, let's set up an account for you </Text>
                            <View style={input}>
                                <View style={{ width: 20 }}>
                                    {user}
                                </View>
                                <View style={line} />
                                <TextInput
                                    onChangeText={(val) => this.setState({ firstName: val })}
                                    style={inputStyles}
                                    placeholder='First name'
                                />
                            </View>

                            <View style={input}>
                                <View style={{ width: 20 }}>
                                    {user}
                                </View>
                                <View style={line} />
                                <TextInput
                                    onChangeText={(val) => this.setState({ lastName: val })}
                                    style={inputStyles}
                                    placeholder='Last name'
                                />
                            </View>

                            <View style={input}>
                                <View style={{ width: 20 }}>
                                    {email}
                                </View>
                                <View style={line} />
                                <TextInput
                                    autoCapitalize='none'
                                    textContentType='emailAddress'
                                    onChangeText={(val) => this.setState({ emailValue: val })}
                                    style={inputStyles}
                                    placeholder='Email Id'
                                />
                            </View>

                            <TouchableOpacity onPress={this.openPlacePicker} style={input}>
                                <View style={{ width: 20 }}>
                                    {pin}
                                </View>
                                <View style={line} />
                                <TextInput
                                    pointerEvents='none'
                                    value={address}
                                    editable={false}
                                    numberOfLines={1}
                                    style={inputStyles}
                                    placeholder='Address / Zipcode'
                                />
                              {location}
                            </TouchableOpacity>

                            <Button
                                onPress={this.onNextPress}
                                size='large' style={btnNext}>NEXT</Button>

                            <View style={[row, { marginTop: 30 }]}>
                                <View style={divider} />
                                <Text style={txtOR}>OR</Text>
                                <View style={divider} />
                            </View>

                            {/* <Button
                                onPress={this.onGoogleLogin}
                                icon={this.renderIcon}
                                size='large' style={btnGoogle}>SIGN UP WITH GOOGLE</Button> */}

                            <Text style={txtSignin}>Already have an account ?
                            <Text onPress={this.onSigninPress} style={{ color: '#3958ad', fontFamily: 'Karla-Bold' }}> Sign in</Text>
                            </Text>
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
    row: {
        flexDirection: 'row',
    },
    txtTitle: {
        fontSize: 24,
        color: '#FFF',
        fontFamily: 'Karla-Bold',
    },
    innerContainer: {
        marginHorizontal: 30,
    },
    txtWelcome: {
        fontSize: 18,
        fontFamily: 'Karla-Regular',
        marginTop: 20,
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
    btnNext: {
        backgroundColor: '#3958ad',
        marginTop: 30,
        elevation: 2,
    },
    btnGoogle: {
        backgroundColor: '#e05141',
        borderWidth: 0,
        marginTop: 30,
        elevation: 2,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#DDD',
        marginTop: 8,
    },
    txtOR: {
        fontFamily: 'Karla-Bold',
        fontSize: 16,
        letterSpacing: 2,
        marginHorizontal: 20,
    },
    txtSignin: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Karla-Regular',
        marginTop: 35,
    }
});
