import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Modal, Image, ScrollView } from 'react-native';

import Country from './country';
import Flags from './resources/flags';
import styles from './styles';

export default class CountryPicker extends Component {

  renderItem(country, index) {
    return (
      <TouchableOpacity
        key={`key-${index}`}
        onPress={() => this.props.selectCountry(country)}
        style={{ borderBottomColor: '#EEE', borderBottomWidth: 1, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
        <Image source={Flags.get(country.iso2)} style={{ width: 40, height: 30 }} />
        <Text style={{ fontSize: 18, fontFamily: 'Karla-Bold', marginLeft: 20, marginTop: 5 }}>{country.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.props.close}
        onRequestClose={() => {
          this.props.onClose();
        }}
      >
        <View style={styles.basicContainer}>
          <View
            style={{marginTop: 60, marginBottom: 50}}
          >

            <ScrollView style={styles.mainBox}>
                {Country.getAll().map((country, index) => this.renderItem(country, index))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}
