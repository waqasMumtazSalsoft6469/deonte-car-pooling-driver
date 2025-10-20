import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';

export const styles = StyleSheet.create({
  uploadBox: {
    height: 15 * vh,
    width: 86 * vw,
    backgroundColor: theme.colors.gray,
    borderRadius: 3 * vw,
    alignItems: 'center',

    justifyContent: 'center',
    marginTop: 2 * vh,
  },
  uploadIcon: {
    height: 3 * vh,
    width: 3 * vh,
    resizeMode: 'contain',
  },
  text2: {
    textAlign: 'center',
    fontSize: 2 * vh,
    lineHeight: 4 * vh,
    color: theme.colors.placeholder,
  },
  text3: {
    textAlign: 'center',
    fontSize: 1.6 * vh,
    color: theme.colors.placeholder,
    marginBottom: vh * 6,
  },
  certificateImage: {
    height: vh * 10,
    width: vh * 10,
    resizeMode: 'contain',
    // marginLeft: vh
  },
  imageContainer: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
