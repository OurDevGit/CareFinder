import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, Image } from 'react-native';
import Axios from 'axios';

import Header from '../Helper/Header';
import MenuModal from '../Helper/MenuModal';

import { data } from './data';

import { heart, locationpin, distance, hostClient } from '../Helper/Constants';
import { Avatar } from 'react-native-ui-kitten';

const { width } = Dimensions.get('window');



export default class index extends Component {

    state = {
        isVisible: false,

        name: 'Alex Martin',
        email: 'alex_martin@gmail.com',
        imagePath: { uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    }

    async componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser = () => {
        Axios.get(`${hostClient}current_user`)
        .then((result) => {
            console.log(result);
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

    openModal = () => {
        this.setState({ isVisible: true });
    }

    _renderItem = ({ item, index }) => {
        const { card, row, txtName, txtAddress } = styles;
        return (
            <View style={card}>
                <View style={[row]}>
                    <Avatar
                        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
                    />
                    <Text style={txtName}>{item.name}</Text>
                    {heart}
                </View>
                <View style={[row, { marginTop: 5, justifyContent: 'center', marginHorizontal: 40 }]}>
                    {locationpin}
                    <Text style={txtAddress}>{item.address}</Text>
                </View>
                <View style={[row, { marginHorizontal: 40, marginTop: 10}]}>
                    {distance}
                    <Text style={[txtAddress, { marginLeft: 10, marginTop: 4 }]}>{item.distance}</Text>
                </View>
                <View style={[row, { marginTop: 10 }]}>
                    {item.images.slice(0, 4).map((val, key) => {
                       return <Image source={{ uri: val }} style={{ width: 70, height: 60, marginLeft: 10 }} />
                    })}
                </View>
            </View>
        )
    }

    navigate = (page) => {
        this.setState({ isVisible: false });
        this.props.navigation.navigate(page);
    }

    render() {
        const { container, container2 } = styles;
        const { isVisible, name, email, imagePath } = this.state;
        return (
            <View style={container}>
                <Header title="Favorite Providers" isSort={true} navigation={this.props.navigation} openModal={this.openModal} />
                <View style={container2}>
                    <FlatList
                        data={data}
                        renderItem={this._renderItem}
                        keyExtractor={(item, indexes) => `index-${indexes}`}
                    />
                </View>
                <MenuModal isVisible={isVisible} navigate={this.navigate} name={name} email={email} imagePath={imagePath} />
            </View>
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
    container2: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        overflow: 'hidden',
        marginTop: 10,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        marginTop: 20,
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    txtName: {
        fontFamily: 'Karla-Bold',
        fontSize: 20,
        marginLeft: 10,
        flex: 1,
        marginTop: 6,
    },
    txtAddress: {
        fontFamily: 'Karla-Regular',
    },
});
