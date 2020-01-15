import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationEvents } from 'react-navigation';
import Axios from 'axios';
import Header from '../Helper/Header';
import MenuModal from '../Helper/MenuModal';

import { camera, note, locationpin, forward, hostClient } from '../Helper/Constants';

const { width } = Dimensions.get('window');

export default class index extends Component {

    state = {
        isVisible: false,
        imagePath: { uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
        name: 'Alex Martin',
        email: 'alex_martin@gmail.com',
        address: '',
        firstname: '',
        lastname: '',
    }

    getCurrentUser = () => {
        Axios.get(`${hostClient}current_user`)
            .then((result) => {
                console.log(result);
                const { success } = result.data;
                if (success) {
                    const { first_name, last_name, avatar, email, address } = result.data.data;
                    const url = { uri: avatar }
                    this.setState({ isLogin: true, name: first_name + ' ' + last_name, email,
                     imagePath: url, address, firstname: first_name, lastname: last_name });
                }
            }).catch((e) => {
                console.log(e);
            });
    }

    onAddressChange = () => {
        const { address } = this.state;
        this.props.navigation.navigate('Edit', { title: 'address', address: address});
    }

    onNameChange = () => {
        const { firstname, lastname } = this.state;
        this.props.navigation.navigate('Edit', { title: 'name', firstname: firstname, lastname: lastname});
    }

    openModal = () => {
        this.setState({ isVisible: true });
    }

    openCamera = () => {
        ImagePicker.openCamera({
            width: 150,
            height: 150,
            cropping: true,
            includeBase64: true,
            includeExif: true,
        }).then(image => {
            console.log(image.data);
            const param = { avatar: image.data }
            Axios.post(`${hostClient}update_profile`, param)
                .then((result) => {
                    console.log(result);
                    const { success } = result.data;
                    if (success) {
                        this.getCurrentUser();
                    }
                }).catch((e) => {
                    console.log(e);
                });
        });
    }

    navigate = (page) => {
        this.setState({ isVisible: false });
        this.props.navigation.navigate(page);
    }

    render() {
        const { container, container2, userphoto, row, txtName, txtEmail, txtLocation, card, txt } = styles;
        const { isVisible, imagePath, name, email, address } = this.state;
        return (
            <View style={container}>
                <NavigationEvents
                  onWillFocus={() => {
                   this.getCurrentUser();
                  }}
                />
                <Header title="Profile" navigation={this.props.navigation} openModal={this.openModal} />
                <View style={container2}>
                    <View style={{ alignItems: 'center' }}>
                        <ImageBackground
                            style={userphoto}
                            source={imagePath}>
                            <TouchableOpacity onPress={this.openCamera}>
                                {camera}
                            </TouchableOpacity>
                        </ImageBackground>
                        <View style={[row, { marginTop: 10 }]}>
                            <Text style={txtName}>{name}</Text>
                            <TouchableOpacity onPress={this.onNameChange} style={{ marginLeft: 10 }}>
                                {note}
                            </TouchableOpacity>
                        </View>
                        <Text style={txtEmail}>{email}</Text>
                        { address != null && address != '' && (
                            <View style={[row, { marginTop: 5 }]}>
                                {locationpin}
                                <Text style={txtLocation}>{address}</Text>
                            </View>
                        )}
                        <View style={{ borderBottomColor: '#DDD', borderBottomWidth: 2, width: width, marginTop: 20 }} />
                    </View>
                    <TouchableOpacity onPress={this.onAddressChange} style={[row, card]}>
                        <Text style={txt}>Edit your Address</Text>
                        {forward}
                    </TouchableOpacity>
                </View>
                <MenuModal isVisible={isVisible} navigate={this.navigate} name={name} email={email} imagePath={imagePath} />
            </View>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#3a61cb',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    card: {
        borderWidth: 1,
        borderColor: '#EEE',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'space-between',
    },
    container2: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        overflow: 'hidden',
        marginTop: 10,
    },
    userphoto: {
        width: 120, height: 120,
        borderColor: 'blue',
        borderWidth: 3, marginTop: 20,
        opacity: 0.7, borderRadius: 60,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtName: {
        fontFamily: 'Karla-Bold',
        fontSize: 24,
    },
    txtEmail: {
        color: '#666',
        fontFamily: 'Karla-Regular',
        fontSize: 16,
        marginTop: 5,
    },
    txtLocation: {
        fontFamily: 'Karla-Regular',
        fontSize: 16,
        marginTop: 2,
        marginLeft: 5,
    },
    txt: {
        fontFamily: 'Karla-Bold',
        fontSize: 18,
    },
};
