import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Axios from 'axios';
import Header from '../Helper/Header';
import MenuModal from '../Helper/MenuModal';

import { forward, hostClient } from '../Helper/Constants';


export default class index extends Component {

    state = {
        isVisible: false,

        imagePath: { uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
        name: 'Alex Martin',
        email: 'alex_martin@gmail.com',
    }

    async componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser = () => {
        Axios.get(`${hostClient}current_user`)
            .then((result) => {
                const { success } = result.data;
                if (success) {
                    const { first_name, last_name, avatar, email, address } = result.data.data;
                    const url = { uri: avatar }
                    this.setState({ isLogin: true, name: first_name + ' ' + last_name, email, imagePath: url, address });
                }
            }).catch((e) => {
                console.log(e);
            });
    }

    openTerm = () => {
        Linking.canOpenURL('http://54.162.236.247/terms-conditions/').then(supported => {
            if (supported) {
              Linking.openURL('http://54.162.236.247/terms-conditions/');
            } else {
              console.log("Don't know how to open URI: " + 'http://54.162.236.247/terms-conditions/');
            }
          });
    }

    openPrivacy = () => {
        Linking.canOpenURL('http://54.162.236.247/privacy-policy/').then(supported => {
            if (supported) {
              Linking.openURL('http://54.162.236.247/privacy-policy/');
            } else {
              console.log("Don't know how to open URI: " + 'http://54.162.236.247/privacy-policy/');
            }
          });
    }

    openModal = () => {
        this.setState({ isVisible: true });
    }

    navigate = (page) => {
        this.setState({ isVisible: false });
        this.props.navigation.navigate(page);
    }

    navigateTo = (page) => {
        this.props.navigation.navigate(page);
    }

    render() {
        const { container, container2, row, card, txt } = styles;
        const { isVisible, name, email, imagePath } = this.state;
        return (
            <View style={container}>
                <Header title="Help" navigation={this.props.navigation} openModal={this.openModal} />
                <View style={container2}>
                    <TouchableOpacity onPress={() => this.navigateTo('Faq')} style={[row, card]}>
                        <Text style={txt}>FAQs</Text>
                       {forward}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.openTerm()} style={[row, card]}>
                        <Text style={txt}>Terms & Conditions</Text>
                       {forward}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.openPrivacy()} style={[row, card]}>
                        <Text style={txt}>Privacy Policy</Text>
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
    txt: {
        fontFamily: 'Karla-Bold',
        fontSize: 18,
    },
};
