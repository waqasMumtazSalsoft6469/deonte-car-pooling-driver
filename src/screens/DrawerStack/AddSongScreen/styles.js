import React from 'react';
import {StyleSheet} from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';


export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
    backgroundColor: theme.colors.white
    // justifyContent: "center"
  },
  inputLabel2: {
    color: 'black',
    fontSize: vh * 1.6,
  },
  buttonStyle: {
    height: vh * 5.7,
  },
  buttonText: {
    fontSize: vh * 1.85,
  },
  playlistButton:{
    borderBottomRightRadius: vh*2,
    // paddingBottom: vh*0.9
    // marginTop: vh*0.7
  },
  changePasswordText: {
    width: vw * 85,
    paddingTop: vh * 2,
    fontSize: vh * 1.8,
    letterSpacing: vh * 0.15,
  },
  contentContainer: {
    justifyContent: "center"
  },
});