import {StyleSheet} from 'react-native';
import theme, {appShadow} from '../../utils/theme';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';

const styles = StyleSheet.create({
  container: {
    // height: vh * 45,
    // width: vw * 90,
    marginVertical: vh * 2,
  },
  inputContainer: {
    flexDirection: 'row',
    
    minHeight: 5 * vh,
    flexDirection: 'row',
    borderRadius: vw * 3,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: theme.colors.gray,
    // ...appShadow,
  },
  input: {
    // backgroundColor: theme.colors.gray,
    flex: 1,
    marginHorizontal: vw * 4,
    // minWidth: 40 * vw,
    // borderRa,
    borderRadius: vw * 3,
    color: 'black'
    // height: 5 * vh,
  },
  title: {
    color: theme.colors.white, //black
    fontSize: vw * 4,
    marginLeft: vw * 4,
    marginBottom: vh * 1,
  },
  leftIcon: {
    height: 3 * vh,
    width: 3 * vh,
    marginLeft: 4 * vw,
    // backgroundColor: 'red',
    // marginRight: 4 * vw,
  },
  rightIcon: {
    height: 2.5 * vh,
    width: 2.5 * vh,
    marginRight: 4 * vw,
  },
});

export default styles;
