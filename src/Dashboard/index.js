import React, { Component } from 'react';
import {
  View, TextInput, TouchableOpacity, StyleSheet,
  Animated, Dimensions, Text, Image, Alert, Platform,
  ActivityIndicator, Modal, FlatList, SafeAreaView
} from 'react-native';
import MapView from 'react-native-maps';
import { Avatar } from 'react-native-ui-kitten';
import Geolocation from '@react-native-community/geolocation';
import Header from '../Helper/Header';
import { Back, check } from '../Helper/Constants';
import { location2, search, host, heart, locationpin2, distance2, hostClient } from '../Helper/Constants';
import MenuModal from '../Helper/MenuModal';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNGooglePlaces from 'react-native-google-places';
import Promises from '../Helper/Promises';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 70;
const CARD_HEIGHT = height / 4;

const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

const predefinedPlaces = [
  { description: 'Dialysis Facilities', tableNo: 0, name: "Dialysis_Facility_Compare_Listing_by_Facility", key: "0" },
  { description: 'Home Health Care', tableNo: 1, name: "Home_Health_Care_Agencies", key: "1" },
  { description: 'Hospices', tableNo: 2, name: "Hospice_General_Information", key: "2" },
  { description: 'Inpatient Rehab', tableNo: 4, name: "Inpatient_Rehab_Facility_General_Information", key: "4" },
  { description: 'Nursing Homes', tableNo: 6, name: "Nursing_Home_Compare_Provider_Info", key: "6" },
];

export default class Dashboard extends Component {

  state = {
    isVisible: false,
    zipcode: undefined,
    locations: [],
    radius: 4,
    place: '',
    isProgress: false,

    imagePath: { uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    name: 'Alex Martin',
    email: 'alex_martin@gmail.com',

    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    myLocation: {},
    modalVisible: false
  }

  componentDidMount = async () => {
    this.index = 0;
    this.animation = new Animated.Value(0);
    const token = await Promises.getUserToken();
    this.getCurrentUser(token);

    this.getCurrentUserLocation();
    // if (this.state.locations && this.state.locations.length > 0) {
      this.animation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= this.state.locations.length) {
          index = this.state.locations.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {
          if (this.index !== index) {
            this.index = index;
            const { Lat, Lon } = this.state.locations[index];
            const coordinate = { latitude: Lat, longitude: Lon }
            this.map.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
              },
              350
            );
          }
        }, 10);
      });
    // }
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  _gotoCurrentLocation = (position) => {
    console.log(position);
    this.map.animateToRegion({
      latitude: position.lat || position.latitude,
      longitude: position.lng || position.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
  }

  getCurrentUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        this._gotoCurrentLocation(position.coords)
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: Platform.OS != 'android', timeout: 5000 },
    );
  }

  getCurrentUser = (token) => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(`${hostClient}current_user`, {
      headers: {
        Authorization: 'Bearer ' + token, //the token is a variable which holds the token
      },
    }).then((result) => {
      const { success } = result.data;
      if (success) {
        const { first_name, last_name, avatar, email, address } = result.data.data;
        const url = { uri: avatar }
        this.setState({ name: first_name + ' ' + last_name, email, imagePath: url, address });
      }
    }).catch((e) => {
      //console.log('Hell4646o', token);
      console.log(JSON.stringify(e));
    });
  }

  openPlaceCategoryPicker = () => {
    this.setState({ modalVisible: true })
  }

  openPlacePicker = (item, name) => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.setState({ place: place.name })
        const zipcode = place.addressComponents.filter(x => x.types[0] === 'postal_code');
        this.setState({ address: place.address, modalVisible: false });
        if (zipcode && zipcode.length > 0) {
          this._gotoCurrentLocation(place.location);
          this.setState({
            region: {
              latitude: place.location.latitude,
              longitude: place.location.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            locations: [],
            isProgress: true,
          });
          this.setState({ zipcode: zipcode[0].name });
          this.getLocations(zipcode[0].name, item, name);
        } else {
          this._gotoCurrentLocation(place.location);
          this.setState({
            locations: [],
          }, () => {
            Alert.alert('No search results are found')
          });
        }
      })
      .catch(error => console.log(error.message));
  }

  setSelectedLocationOnMap = (data, details) => {
    if (data.tableNo) {
      this.setState({ selectedCategory: data.tableNo })
    } else {
      console.log('data----->', data);
      console.log('details----->', details);

      this.setState({ place: details.name })
      const zipcode = details.address_components.filter(x => x.types[0] === 'postal_code');
      this.setState({ address: data.description });
      if (zipcode && zipcode.length > 0) {
        this._gotoCurrentLocation(details.geometry.location);
        this.setState({
          region: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          locations: [],
          isProgress: true,
        });
        this.setState({ zipcode: zipcode[0].name });
        this.getLocations(zipcode[0].name);
      } else {
        this._gotoCurrentLocation(details.geometry.location);
        this.setState({
          locations: [],
        }, () => {
          Alert.alert('No search results are found')
        });
      }
      this.setState({ modalVisible: false })
    }
  }

  getLocations = (zipcode, tableNo, dataName) => {
    const { radius } = this.state;
    console.log(`${host}zipcode=${zipcode}&distance=${radius}&tableno=${tableNo}`);
    axios.get(`${host}zipcode=${zipcode}&distance=${radius}&tableno=${tableNo}`)
      .then((result) => {
        const { error, data } = result.data;
        console.log(`API RESPONSE >> `, result.data);
        if (data) {
          const info: [] = data[dataName];
          console.log(`API datas >> `, info);
          const datas = info.filter(a => a.Lat);
          if (datas.length > 0) {
            this.setState({ locations: datas, isProgress: false });
          } else {
            Alert.alert('No search results are found')
            this.setState({ isProgress: false });
          }
        } else {
          Alert.alert(error);
          this.setState({ isProgress: false });
        }
      }).catch((e) => {
        console.log(e);
      });
  }

  openModal = () => {
    this.setState({ isVisible: true });
  }

  navigate = (page) => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate(page);
  }

  _renderItem = (item, i) => {
    const { card, row, txtNames, txtAddress } = styles;
    return (
      <View key={`key=${i}`} style={card}>
        <View style={[row]}>
          <Avatar
            source={require('../../assets/images/appicon.png')}
          />
          <Text style={txtNames}>{item.Facility_Name}</Text>
        </View>
        <View style={[row, { marginTop: 5, justifyContent: 'center', marginHorizontal: 40 }]}>
          {locationpin2}
          <Text style={txtAddress}>{`${item.Address_Line_1} ${item.Address_Line_2 != null && item.Address_Line_2}, ${item.City}`}</Text>
        </View>
        <View style={[row, { marginHorizontal: 40, marginTop: 10 }]}>
          {distance2}
          <Text style={[txtAddress, { marginLeft: 10, marginTop: 4 }]}>{'3 mi away'}</Text>
        </View>
        <View style={[row, { marginTop: 10 }]}>
          {item.images && item.images.slice(0, 4).map((val, key) => {
            return <Image key={key} source={{ uri: val }} style={{ width: 70, height: 60, marginLeft: 10 }} />
          })}
        </View>
      </View>
    )
  }


  render_FlatList_header = () => {
    var header_View = (
      <View style={styles.header_footer_style}>
        <TouchableOpacity onPress={() => this.setState({ modalVisible: false })} >{Back}</TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center' }} >
          <Text style={styles.textStyle}> Select Category </Text>
        </View>
      </View>
    );
    return header_View;
  };

  GetFlatListItem(item, name) {
    this.openPlacePicker(item, name);
  }

  FlatListItemSeparator = () => {
    return (<View style={{ height: 1, width: "100%", backgroundColor: "#607D8B", }} />);
  }


  render() {
    const { container, container2, input, row } = styles;
    const { isVisible, locations, place, name, imagePath, email, isProgress, selectedCategory } = this.state;

    const interpolations = locations.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: 'clamp',
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp',
      });
      return { scale, opacity };
    });

    return (
      <View style={container}>
        <Header title="Home" navigation={this.props.navigation} openModal={this.openModal} />
        <TouchableOpacity style={[row, input]} onPress={this.openPlaceCategoryPicker}>
          <View style={{ marginTop: 10, marginLeft: 10 }} >
            {search}
          </View>
          <TextInput
            pointerEvents='none'
            value={place}
            editable={false}
            placeholderTextColor='#EEE'
            placeholder='Type your place'
            style={[input, { flex: 1, color: '#FFF' }]}
          />
          <TouchableOpacity
            onPress={() => this.getCurrentUserLocation()}
            style={{ marginTop: 10, marginRight: 10 }}>
            {location2}
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={container2}>
          <MapView
            onMapReady={() => this.getCurrentUserLocation()}
            showsMyLocationButton={false}
            style={StyleSheet.absoluteFillObject}
            ref={ref => (this.map = ref)}
            followsUserLocation={this.state.followsUserLocation}
            showsUserLocation={true}
            zoomEnabled={true}
          >
            {locations.length > 0 ? locations.map((marker, i) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[i].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[i].opacity,
              };
              const region = { latitude: marker.Lat, longitude: marker.Lon }
              return (
                <MapView.Marker
                  key={i}
                  coordinate={region}
                >
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    {/* <Animated.View style={[styles.ring, scaleStyle]} /> */}
                    <Image
                      source={require('../../assets/images/marker.png')}
                      style={styles.marker}
                    />
                  </Animated.View>
                </MapView.Marker>
              )
            }) : null}
          </MapView>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
            style={styles.scrollView}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {locations.length > 0 ? locations.map((item, i) => this._renderItem(item, i)) : null}
          </Animated.ScrollView>
        </View>
        {isProgress ? <View style={styles.progress}>
          <ActivityIndicator style={{ marginTop: 15 }} color='#3a61cb' />
        </View> : null}
        <MenuModal isVisible={isVisible} navigate={this.navigate} name={name} email={email} imagePath={imagePath} />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { }}
        >
          <SafeAreaView style={{ flex: 0, backgroundColor: '#3a61cb' }} />
          <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.MainContainer}>
              <FlatList
                data={predefinedPlaces}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item }) => <Text style={styles.FlatList_Item} onPress={this.GetFlatListItem.bind(this, item.tableNo, item.name)} > {item.description} </Text>}
                ListHeaderComponent={this.render_FlatList_header}
              />
            </View>
          </SafeAreaView>
        </Modal>

      </View >
    );
  }
}

const styles = {
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    // paddingTop: (Platform.OS === 'iOS') ? 20 : 0
  },
  FlatList_Item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header_footer_style: {
    width: '100%',
    height: 50,
    backgroundColor: '#3a61cb',
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 21
  },
  container: {
    backgroundColor: '#3a61cb',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  imgbuilding: {
    position: 'absolute',
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    bottom: -10,
  },
  downList: {
    position: 'absolute',
    bottom: 20,
  },
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
  container2: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    overflow: 'hidden',
  },
  input: {
    height: 45,
    borderRadius: 20,
    backgroundColor: '#5379e0',
    marginHorizontal: 20,
    marginBottom: 20,
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
  progress: {
    position: 'absolute',
    top: height / 2,
    left: width / 2 - 20,
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
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
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    borderRadius: 20,
    shadowOpacity: 0.1,
    marginTop: 20,
    marginLeft: 15,
    padding: 20,
    backgroundColor: '#4787e275',
    // elevation: 2,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  txtNames: {
    fontFamily: 'Karla-Bold',
    fontSize: 20,
    marginLeft: 10,
    flex: 1,
    marginTop: 6,
    color: 'black',
  },
  txtAddress: {
    fontFamily: 'Karla-Bold',
    color: 'black',
    fontSize: 14,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    // borderRadius: 4,
    // backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
};
