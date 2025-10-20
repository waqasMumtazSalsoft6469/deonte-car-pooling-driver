import {StyleSheet} from 'react-native';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';

import {colors} from '../../utils/theme';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  modalContainer: {
    height: vh * 100,
    width: vw * 100,
    position: 'absolute',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  blurBackground: {
    height: 100 * vh,
    width: 100 * vw,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  blurView: {
    flex: 1,
  },
  contentContainer: {
    width: 85 * vw,
    elevation: 100,
    backgroundColor: colors.white,
    borderRadius: 10 * vw,
  },
  gradient: {
    flex: 1,
    borderRadius: 10 * vw,
  },
});

export default styles;
