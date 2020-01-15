

import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
} from 'react-native-ui-kitten';
import {
  mapping, light, dark,
} from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen'

import Promises from './src/Helper/Promises';
// Relative paths
import mainNavigator from './Router';
import mainNavigator2 from './Router2';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

const AppNavigation = createAppContainer(mainNavigator);
const AppNavigation2 = createAppContainer(mainNavigator2);

const themes = { light, dark };

const App = () => {

  const [theme, setTheme] = React.useState('light');
  const [result, setResult] = React.useState('');
  const [isShow, setIsShow] = React.useState(true);

   useEffect(() =>  {
    SplashScreen.hide();
    getData();
    return () => {
    };
  }, [result])

  const getData = async () => {
    const results = await Promises.getUserToken()
    setResult(results);
    setIsShow(false);
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={themes[theme]}>
       {isShow ? <ActivityIndicator  style={{ marginTop: 50 }} /> : result != null && result != '' ? <AppNavigation2  /> : <AppNavigation /> }
      </ApplicationProvider>
    </React.Fragment>
  );
};


export default App;
