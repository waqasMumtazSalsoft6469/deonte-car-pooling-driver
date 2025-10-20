import React from 'react';
import {StyleSheet} from 'react-native';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';


export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
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
  changePasswordText: {
    width: vw * 85,
    paddingTop: vh * 2,
    fontSize: vh * 1.8,
    letterSpacing: vh * 0.15,
  },
  contentContainer: {
    marginBottom: vh * 2,
    flex: 1,
    justifyContent: "center"
  },
});