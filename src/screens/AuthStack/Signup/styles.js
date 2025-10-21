import { StyleSheet } from 'react-native';
import theme, { colors } from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    // marginTop: 26 * vh,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  headingContainer: {
    paddingHorizontal: 7 * vw,
    paddingTop: 10 * vh,
    paddingBottom: 2 * vh,
  },
  headingText: {
    fontSize: 4.5 * vh,
    marginVertical: 2 * vh,
    color: theme.colors.white,
  },
  grayText: {
    color: theme.colors.lightWhite,
    // marginBottom: 3 * vh,
  },

  blueText: {
    fontSize: 2 * vh,
    color: theme.colors.primaryColor,
  },
  buttonStyle: {
    marginVertical: 5 * vh,
  },
  text: {
    textAlign: 'center',
    fontSize: 2.2 * vh,
    color: theme.colors.black,
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:4 * vh,
  },
  uploadBox: {
    height: 15 * vh,
    width: 86 * vw,
    backgroundColor: theme.colors.gray,
    borderRadius: 3 * vw,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2 * vh,
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
  },
  uploadIcon: {
    height: 3 * vh,
    width: 3 * vh,
    resizeMode: 'contain',
  },
  image: {
    height: vh * 7,
    width: vh * 7,
    resizeMode: 'contain',
  },
});

export default styles;
