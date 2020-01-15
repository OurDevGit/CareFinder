import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { city, user, list, support, logout } from './Constants';

// Screens
import Dashboard from '../Dashboard';

import { googleService } from '../Helper/GoogleService';

class DrawerNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.drawerData = props.items.map(this.createDrawerItem);
  }

  componentDidMount = async () => {

  }

  onRouteSelect = (index) => {
    const { [index]: route } = this.drawerData;
    this.props.navigation.navigate(route.title);
  };

  createDrawerItem = ({ routeName }) => ({
    title: routeName,
  });

  onLogout = async () => {
    AsyncStorage.clear();
    const { navigation } = this.props;
    await googleService.handleGoogleLogout()
    navigation.navigate('Login');
  }


  render() {
    const { container, txtZuumph, row, txt } = styles;
    return (
      <View style={container}>
        <Text style={txtZuumph}>Zuumph</Text>

        <View style={{ marginHorizontal: 20 }}>
        <View style={[row]}>
          <Text style={[txt, {marginTop: 0}]}>Choose Your City</Text>
          {city}
        </View>
        <View style={[row, { marginTop: 20}]}>
          <Text style={[txt, {marginTop: 0}]}>My Profile</Text>
          {user}
        </View>
        <View style={[row, { marginTop: 20}]}>
          <Text style={[txt, {marginTop: 0}]}>My Order History</Text>
          {list}
        </View>
        <View style={[row, { marginTop: 20}]}>
          <Text style={[txt, {marginTop: 0}]}>Support</Text>
          {support}
        </View>

        <View style={[row, { marginTop: 40}]}>
          <Text onPress={this.onLogout} style={[txt, {marginTop: 0}]}>Log Out</Text>
          {logout}
        </View>
        </View>


      </View>
    );
  }
}

export const DrawerNavigator = createDrawerNavigator({
  Home: Dashboard,
}, {
  contentComponent: DrawerNavigation,
  drawerPosition: 'right',
});

const styles = {
  container: {
    backgroundColor: '#64c2f9',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtZuumph: {
    fontSize: 45,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFF',
    marginVertical: 100,
    letterSpacing: 1.5,
  },
  txt: {
    color: '#FFF',
    fontFamily: 'Karla-Bold',
    fontSize: 18,
  },
}
