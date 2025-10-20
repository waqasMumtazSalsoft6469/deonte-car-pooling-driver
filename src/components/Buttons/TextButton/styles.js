import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export default StyleSheet.create({
  container: {
    height: vh * 6.5,
    width: vw * 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    borderRadius: (vh * 6.5) / 2,
  },
  text: {
    fontSize: vw * 3.5,
  },
});
