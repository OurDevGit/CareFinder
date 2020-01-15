import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import Header from '../Helper/Header';

import { forward } from '../Helper/Constants';

const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...',
    },
    {
        title: 'Second',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...',
    },
    {
        title: 'Third',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...',
    },
    {
        title: 'Fourth',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...',
    },
];


export default class index extends Component {

    state = {
        isVisible: false,
    }

    openModal = () => {
        this.setState({ isVisible: true });
    }

    state = {
        activeSection: '',
    };

    _renderItem = (item, i) => {
        const { activeSection } = this.state;
        const { row, card, txt } = styles;
        return (
            <View key={`key-${i}`} style={card}>
                <TouchableOpacity onPress={() => this.setState({ activeSection: item.title })} style={[row]}>
                    <Text style={txt}>{item.title}</Text>
                    {forward}
                </TouchableOpacity>
                {
                   activeSection == item.title ? (
                    <View style={{ padding: 20 }}>
                        <Text>{item.content}</Text>
                    </View>
                   ) : null
                }
            </View>
        );
    };


    render() {
        const { container, container2 } = styles;
        return (
            <View style={container}>
                <Header title="FAQs" hide={true} navigation={this.props.navigation} openModal={this.openModal} />
                <View style={container2}>
                        <ScrollView>
                        {SECTIONS.map((item, i) => this._renderItem(item, i))}
                        </ScrollView>
                </View>
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
        flex: 1,
    },
};
