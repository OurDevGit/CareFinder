import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Avatar,
} from 'react-native-ui-kitten';

import { close } from './Constants';
import { googleService } from '../Helper/GoogleService';

export default class MenuModal extends Component {

    onLogout = async() => {
        AsyncStorage.clear();
        const { navigate } = this.props;
        await googleService.handleGoogleLogout()
        navigate('Login');
    }

    render() {
        const { modalContainer, view1, view2, circle, txtName, txtEmail, txtTitle } = styles;
        const { isVisible, navigate, name, email, imagePath } = this.props;
        return (
            <Modal
            animationType='slide'
            visible={isVisible}
        >
            <View style={modalContainer}>
                <View style={view1}>
                    <Avatar
                        style={{ width: 90, height: 90 }}
                        source={imagePath}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={txtName}>{name}</Text>
                        <Text style={txtEmail}>{email}</Text>
                    </View>
                </View>
                <View style={view2}>
                    <Text onPress={() => navigate('Dashboard')} style={txtTitle}>Home</Text>

                    <Text onPress={() => navigate('Profile') } style={txtTitle}>Profile</Text>

                    {/* <Text onPress={() => navigate('Provider')} style={txtTitle}>Favorite Providers</Text> */}

                    <Text onPress={() => navigate('Notification')} style={txtTitle}>Notifications</Text>

                    <Text onPress={() => navigate('Help')} style={txtTitle}>Help</Text>

                    <Text onPress={this.onLogout} style={txtTitle}>Logout</Text>

                    <TouchableOpacity onPress={() => navigate('none')} style={circle}>
                        {close}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        )
    }
}

const styles = {
    view1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    view2: {
        flex: 3.6,
        backgroundColor: '#3a61cb',
    },
    modalContainer: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    circle: {
        backgroundColor: '#FFF',
        position: 'absolute',
        width: 100,
        height: 100,
        bottom: -10,
        right: -20,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtEmail: {
        color: '#666',
        fontFamily: 'Karla-Regular',
        fontSize: 16,
    },
    txtName: {
        fontFamily: 'Karla-Bold',
        fontSize: 24,
    },
    txtTitle: {
        marginVertical: 25,
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Karla-Bold',
        fontSize: 22,
    },
};
