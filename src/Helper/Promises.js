import AsyncStorage from '@react-native-community/async-storage';

export default class Promises {

    static async setUserToken(val) {
        console.log(val);
        
        await AsyncStorage.setItem('care_token', JSON.stringify(val))
    }

    static async storeUserData(val) {
        await AsyncStorage.setItem('care_user', val)
    }

    static async getUserToken() {
        const value = await AsyncStorage.getItem('care_token');
        return value;
    }

    static async getUserData() {
        const value = await AsyncStorage.getItem('care_user');
        return value;
    }
}