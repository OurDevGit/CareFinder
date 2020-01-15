import React from 'react';
import {Image,} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';

//TWILLIO
export const TWILIO_ACCOUNT_SID = 'AC4270d6169a8d7b34a36f49ce26fe94fe'
export const TWILIO_AUTH_TOKEN = 'd1a7ec09e74f5fdfe2c58908dc9fb282'
export const TWILIO_PHONE_NUMBER = '+12052933209'

// Server Call
export const host = 'http://51.81.240.252/index.php?'
export const hostClient = 'http://54.162.236.247/wp-json/cf/v1/'

export const Menu = <Entypo name='menu' size={28} color='#FFF' />
export const locationpin = <Entypo name='location-pin' size={24} color='#385194' />
export const locationpin2 = <Entypo name='location-pin' size={24} color='black' />
export const Back = <AntDesign name='arrowleft' size={34} color="#FFF" />
export const search = <AntDesign name='search1' size={24} color="#FFF" />
export const close = <AntDesign name='close' size={46} color="#000" />
export const city = <MaterialIcons name='location-city' size={28} color='#FFF' />
export const user = <FontAwesome name='user' size={20} color='#385194' />
export const phone = <FontAwesome name='mobile-phone' size={26} color='#385194' />
export const check = <FontAwesome name='check' size={26} color='#385194' />
export const email = <MaterialCommunityIcons name='email' size={20} color='#385194' />
export const sort = <MaterialCommunityIcons name='sort' size={24} color='#FFF' />
export const pin = <FontAwesome5 name='map-pin' size={22} color='#385194' />
export const location = <MaterialIcons name='my-location' size={24} color='#385194' />
export const location2 = <MaterialIcons name='my-location' size={24} color='#FFF' />
export const list = <Feather name='list' size={28} color='#FFF' />
export const support = <SimpleLineIcons name='bubbles' size={28} color='#FFF' />
export const logout = <SimpleLineIcons name='logout' size={25} color='#FFF' />
export const note = <SimpleLineIcons name='note' size={25} color='#385194' />
export const distance = <MaterialCommunityIcons name='map-marker-distance' size={25} color='#385194' />
export const distance2 = <MaterialCommunityIcons name='map-marker-distance' size={25} color='black' />
export const forward = <SimpleLineIcons name='arrow-right' size={25} color='#000' />
export const lock = <Fontisto name='locked' size={20} color='#385194' />
export const camera = <EvilIcons name='camera' size={60} color='#000' />
export const heart = <Foundation name='heart' size={30} color='red' />
export const marker = <FontAwesome name='map-marker' size={26} color='#385194' />


export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const isNumeric = (num) => (typeof (num) === 'number' || typeof (num) === "string" && num.trim() !== '') && !isNaN(num);

export const validation = (firstname, lastname, emailvalue, address) => {
    if (firstname == '') {
        return 'First name is empty';
    } else if (lastname == '') {
        return 'Last name is empty';
    } else if (emailvalue == '') {
        return 'Email is empty';
    } else if (address == '') {
        return 'Address is empty';
    } else {
        return true;
    }
}
