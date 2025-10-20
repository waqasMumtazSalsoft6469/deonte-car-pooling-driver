import { StyleSheet } from 'react-native';
import vw from '../../utils/units/vw';

export default styles = StyleSheet.create({
  container: {
    width: vw * 8,
    height: vw * 8,
    borderRadius: (vw * 8) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  iconStyle: {
    width: vw * 8,
    height: undefined,
    aspectRatio: 1,
  },
});
