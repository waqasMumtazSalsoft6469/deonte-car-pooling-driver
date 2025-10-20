import {StyleSheet} from 'react-native';
import theme, {appShadow} from '../../utils/theme';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';

const styles = StyleSheet.create({
  container: {
    // width: vw * 90,
    marginVertical: vh * 2,
    backgroundColor: theme.colors.primaryColor,
    height: 7 * vh,
    width: 86 * vw,
    borderRadius: 2 * vh,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row"
  },
  text: {
    color: theme.colors.white, //black
    fontSize: 2.3 * vh,
  },
  dustbin:{
    height: vh*2.5,
    width: vh*2.5,
    resizeMode: "contain"
  }
});

export default styles;
