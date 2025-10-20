import {StyleSheet} from 'react-native';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';
// import {vh, vw} from '../../Units';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
    paddingLeft: 5 * vw,
    paddingTop: 8.5 * vh,
  },
  icon: {
    height: 5 * vh,
    width: 6 * vh,
    marginRight: 2 * vw,
  },
  iconbookaride: {
    height: 5 * vh,
    width: 5 * vh,
    marginRight: 2 * vw,
    resizeMode:'contain'
  },
  mark:{
    paddingLeft: vw*2
  },
  // linearGradient: {
  //   paddingTop: vh * 10,
  //   flex: 1,
  //   paddingLeft: vw * 10,
  // },
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
    // width: '100%',
    // height: '100%',
    height: vh*4,
    width: vh*4,
    // resizeMode: "contain",
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
  },
  Logout:{
    alignItems: 'center',
    // position: "absolute",
    // bottom:0,
    // height: vh*55,
    marginTop: vh*18,
    flexDirection: 'row',
    paddingVertical: vh * 1,
 

  }
});
export default styles;
