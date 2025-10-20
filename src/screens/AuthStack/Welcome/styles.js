import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // paddingBottom: vh * 8,
    // paddingHorizontal: 7 * vw,
    // backgroundColor: theme.colors.red,
  },
  gradiantStyles: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: vh * 3,
    paddingHorizontal: 7 * vw,
  },
  headingText: {
    color: theme.colors.white,
    fontSize: 2.5 * vh,
    // marginBottom: 2 * vh,
  },
  text: {
    color: theme.colors.white,
    textAlign: 'center',
    lineHeight: 2.2 * vh,
    marginBottom: 4 * vh,
    marginTop : vh*1
  },
  bottomText: {
    color: theme.colors.white,
    textAlign: 'center',
  },
  button: {
    marginVertical: 3 * vh,
    backgroundColor: 'black',
  },
  logo: {
    height: vh * 30,
    width: vh * 30,
    alignSelf: 'center',
    position: 'absolute',
    tintColor: 'black',
    resizeMode: 'contain',
  },
});

export default styles;
