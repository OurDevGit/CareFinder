import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width - 20;
const SCREEN_WIDTH2 = width - 60;


export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
  },
  basicContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
