import {StyleSheet} from 'react-native';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5 * vw,
    paddingTop: 8.5 * vh,
  },
  icon: {
    height: 2 * vh,
    width: 2 * vh,
    marginRight: 2 * vw,
    resizeMode:'contain'
  },
  iconbookaride: {
    height: 2 * vh,
    width: 2 * vh,
    marginRight: 2 * vw,
    resizeMode:'contain'
  },
  mark:{
    paddingLeft: vw*2
  },

  drawerText:{
    fontSize: vh*1.8,
    width: vw*40
  },
  imageStyle: {
    width: 10 * vh,
    height: 10 * vh,
    flexDirection: "row",
    alignItems: "center"
  },
  logoutStyle: {
    marginTop: vh * 20,
  },
  image: {
    height: vh*4,
    width: vh*4,
    borderRadius: (4 * vh)/2,
  },
  label: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: vh * 1,
  },
  labelContainer: {
    width: vh * 15,
    height: vh * 50,
    paddingTop: vh * 3,
    gap: 2 * vh,
  },
  Logout:{
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: vh * 1,
 

  }
});
export default styles;
