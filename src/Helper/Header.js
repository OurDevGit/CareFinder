import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { Menu, sort, Back } from './Constants';




class Header extends Component {

    render() {
        const { title, navigation, hide, openModal, isSort }  = this.props;
        const { txtTitle } = styles;
        return (
            <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.centerContainer}>
                    <TouchableOpacity onPress={() => !hide ? openModal() : navigation.pop()}>
                        {!hide ? Menu : Back}
                    </TouchableOpacity>
                </View>
                <View style={[styles.centerContainer, { flex: 3 }]}>
                    <Text style={txtTitle}>{title}</Text>
                </View>
                <View style={styles.centerContainer} >
                    <TouchableOpacity onPress={() => {}}>
                        {isSort && sort}
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        flexDirection: 'row',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtTitle: {
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'Karla-BOld',
    },
})

export default Header;
