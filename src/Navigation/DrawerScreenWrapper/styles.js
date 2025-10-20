import {StyleSheet} from 'react-native';
import { appShadow } from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

// import {vh, vw} from '../../Units';

const styles = StyleSheet.create({
  container: {
    // elevation: 100,
    overflow: 'hidden',
    // elevation:5,
    ...appShadow,
    flex: 1,
    // backgroundColor: 'red',
  },
  shadowContainer: {
    height: 75 * vh,
    width: 75 * vw,
    top: 12.5 * vh,
    right: -75 * vw,
    borderRadius: 5 * vw,
    position: 'absolute',
    elevation: 10,
    backgroundColor: 'white',
  },
  blur: {
    height: 80 * vh,
    width: 80 * vw,
    borderRadius: 5 * vw,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  screenshot: {
    height: 75 * vh,
    width: 75 * vw,
    borderRadius: 5 * vw,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
});

// const styles = StyleSheet.create({
//   stack: {
//     flex: 1,
//     // zIndex: 999,
//     // overflow: 'hidden',
//   },
//   outerStyle: {
//     flex: 1,
//     // elevation: 100,
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 2,
//     // },
//     // shadowOpacity: 0.25,
//     // shadowRadius: 3.84,
//   },
// });
export default styles;
