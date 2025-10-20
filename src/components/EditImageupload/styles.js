import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';

export const styles = StyleSheet.create({
  uploadBox: {
    height: 4 * vh,
    width: 86 * vw,
    backgroundColor: theme.colors.gray,
    borderRadius: 3 * vw,
    alignItems: 'center',

    justifyContent: 'center',
  },
  uploadIcon: {
    height: 3 * vh,
    width: 3 * vh,
    resizeMode: 'contain',
    tintColor: theme.colors.primaryColor,
  },
  text2: {
    textAlign: 'center',
    fontSize: 2 * vh,
    lineHeight: 4 * vh,
    color: theme.colors.placeholder,
  },
  deleteContainer: {
    height: vh * 4,
    width: vh * 4,
    position: 'absolute',
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (vh * 4) / 2,
  },
  ImageContainer: {
    width: vw * 20,
    height: vh * 12,
    justifyContent: 'center',
    marginRight: vh,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text3: {
    textAlign: 'center',
    fontSize: 1.6 * vh,
    color: theme.colors.placeholder,
    marginBottom: vh * 6,
  },
  certificateImage: {
    height: '90%',
    width: '90%',
    resizeMode: 'cover',
    borderRadius: vh * 0.2,
  },
  deleteImage: {
    height: vh * 4,
    width: vw * 4,
    resizeMode: 'contain',
  },
  imageContainer: {
    height: 15 * vh,
    width: 86 * vw,
    backgroundColor: theme.colors.gray,
    borderRadius: 3 * vw,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainContainer: {
    height: 20 * vh,
    width: 86 * vw,
    backgroundColor: theme.colors.gray,
    borderRadius: 3 * vw,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
