import React, { Component } from 'react';
import {
    Text, Image, View, StyleSheet,
    TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { Layout, Button } from 'react-native-ui-kitten';
import axios from 'axios';

//
import { Back, hostClient, user, locationpin } from '../Helper/Constants';

export default class index extends Component {

    state = {
        address: '',
        firstname: '',
        lastname: '',
    };

    onNextPress = () => {
        const title = this.props.navigation.getParam('title')
        const { firstname, lastname, address } = this.state;
        if (title == 'address') {
            if (address != '') {
                const obj = { address };
                axios.post(`${hostClient}update_profile`, obj).then((result) => {
                    console.log(result);
                    const { message, success } = result.data;
                    if (success) {
                        this.props.navigation.goBack();
                    } else {
                        Alert.alert(message);
                    }
                })
            } else {
                Alert.alert('Please add new address to edit');
            }
        } else if (title == 'name') {
            const obj = { first_name: firstname, last_name: lastname }
            if (firstname != '') {
                axios.post(`${hostClient}update_profile`, obj).then((result) => {
                    console.log(result);
                    const { message, success } = result.data;
                    if (success) {
                        this.props.navigation.goBack();
                    } else {
                        Alert.alert(message);
                    }
                })
            } else {
                Alert.alert('Add new name to edit');
            }
        }
    }

    onValueChange = (value) => {
        this.setState({ value });
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    }

    renderName = () => {
        const { innerContainer, input, line, inputStyles, btnNext } = styles;
        const firstname = this.props.navigation.getParam('firstname')
        const lastname = this.props.navigation.getParam('lastname')
        return (
            <View style={innerContainer}>
                <View style={[input, { marginTop: 50 }]}>
                    <View style={{ width: 20 }}>
                        {user}
                    </View>
                    <View style={line} />
                    <TextInput
                        style={inputStyles}
                        placeholder={firstname}
                        onChangeText={(value) => this.setState({ firstname: value})}
                    />
                </View>

                <View style={[input, { marginTop: 50 }]}>
                    <View style={{ width: 20 }}>
                        {user}
                    </View>
                    <View style={line} />
                    <TextInput
                        style={inputStyles}
                        placeholder={lastname}
                        onChangeText={(value) => this.setState({lastname: value})}
                    />
                </View>
                <Button
                    onPress={this.onNextPress}
                    size='giant' style={btnNext}>EDIT</Button>
            </View>
        )
    }

    renderAddress = () => {
        const { innerContainer, input, line, inputStyles, btnNext } = styles;
        const address = this.props.navigation.getParam('address')
        return (
            <View style={innerContainer}>
                <View style={[input, { marginTop: 50 }]}>
                    <View style={{ width: 20 }}>
                        {locationpin}
                    </View>
                    <View style={line} />
                    <TextInput
                        style={inputStyles}
                        placeholder={address}
                        onChangeText={(value) => this.setState({ address: value})}
                    />
                </View>

                <Button
                    onPress={this.onNextPress}
                    size='giant' style={btnNext}>EDIT</Button>
            </View>
        )
    }


    render() {
        const { container, container2, container1, txtTitle,
         row } = styles;
        const title = this.props.navigation.getParam('title')
        return (
            <Layout style={container}>
                <View style={container1}>
                    <Image source={require('../../assets/images/appicon.png')} />
                    <View style={[row, { width: 300 }]}>
                        <TouchableOpacity onPress={this.onBackPress}>
                            {Back}
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', flex: 1, marginRight: 30 }}>
                            <Text style={txtTitle}>Edit {title}</Text>
                        </View>
                    </View>
                </View>

                <View style={container2}>
                    {title == 'address' ? this.renderAddress() : this.renderName()}
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
