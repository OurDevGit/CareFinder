import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Header from '../Helper/Header';
import MenuModal from '../Helper/MenuModal';


export default class index extends Component {

    state = {
        isVisible: false,
    }

    openModal = () => {
        this.setState({ isVisible: true });
    }

    navigate = (page) => {
        this.setState({ isVisible: false });
        this.props.navigation.navigate(page);
    }

    render() {
        const { container, container2, row, card, txt } = styles;
        const { isVisible } = this.state;
        return (
            <View style={container}>
                <Header title="Notifications" navigation={this.props.navigation} openModal={this.openModal} />
                <View style={container2}>
                    <TouchableOpacity style={[row, card]}>
                        <Text style={txt}>FAQs</Text>
                    </TouchableOpacity>

                </View>
                <MenuModal isVisible={isVisible} navigate={this.navigate} />
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
