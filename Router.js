import { createStackNavigator } from 'react-navigation-stack';

// Pages
import Login from './src/Auth/Login';
import Register from './src/Auth/Register';
import Password from './src/Auth/Password';
import Forget from './src/Auth/Forget';
import OTP from './src/Auth/OTP';

import Dashboard from './src/Dashboard'
import Profile from './src/Profile'
import Edit from './src/Profile/Edit'
import Provider from './src/Provider'
import Help from './src/Help'
import Notification from './src/Notifications'
import Faq from './src/Faq'

//import { DrawerNavigator } from './src/Helper/Drawer';


const mainNavigator = createStackNavigator(
    {
      Login: { screen: Login },
      Register: { screen: Register },
      Password: { screen: Password },
      OTP: { screen: OTP },
      Forget: { screen: Forget },
      Dashboard: { screen: Dashboard },
      Profile: { screen: Profile },
      Provider: { screen: Provider },
      Help: { screen: Help },
      Notification: { screen: Notification },
      Faq: { screen: Faq },
      Edit: { screen: Edit },
    },
    {
      initialRouteName: 'Login',
      headerMode: 'none',
      navigationOptions: {
        header: false,
      },
    });

export default mainNavigator;
