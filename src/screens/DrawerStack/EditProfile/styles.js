import React from 'react';
import { StyleSheet, ViewBase } from 'react-native';
import { Fonts } from '../../../assets';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

        alignItems: "center",
        // justifyContent: "center",
        paddingTop: vh * 12
    },
    cameraContainerStyle: {
        position: "absolute",
        top: vh * 15,
        // left: vw*45.8,
        right: vw*13.5,
        borderWidth: 2.5,
        borderColor: theme.colors.white,
        // borderColor: "red",
        borderRadius: vh * 3
    },
    inputParentContainerStyle: {
        marginVertical: 1 * vh,
    },
    input2Style: {
        fontFamily: Fonts.GL,
        // fontSize: 2.9 * vh,
        marginLeft: 7 * vw,
    },
    cameraIconStyle: {
       
        height: vh * 4.5,
        width: vh * 4.5,
        resizeMode: "contain"
      
    },
    inputStyle: {
        // backgroundColor: theme.colors.white, //gray2
        width: 85 * vw,
        // borderRadius: 3 * vh,
        // height: 7 * vh,
        // marginTop: 15 * vh,
    },
    cardText: {
        paddingLeft: vw * 2,
        fontSize: vh*1.7
    },
    inputLabel2: {
        color: 'black',
        fontSize: vh*1.6
        // marginBottom: 4 * vh,
    },
    icon: {
        height: vh * 2.5,
        width: vh * 2,
        resizeMode: "contain"
    },
   
    nameStyle: {
        marginVertical: vh * 1,
        letterSpacing: vh * 0.2
    },
    buttonStyle: {
        height: vh * 5.7
    },
    buttonText: {
        fontSize: vh * 1.85
    },
    cardContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: vh * 2,
        height: vh * 5.8,
        alignItems: "center",
        justifyContent: "center",
        width: vw * 85,
        // marginTop: vh * 0.7,
        marginVertical: vh * 3,
        borderColor: theme.colors.greyInput
    },
    profileImage: {
        height: vh * 19.5,
        width: vh * 19.5,
    },
    profileImageUser:{
        height: vh * 16,
        width: vh * 16,
        // borderWidth: vh * 1.1,
        borderColor: theme.colors.purple,
        borderRadius: (vh * 16)/2,
        // marginVertical: vh*2,

    },
    profileImagecontainer:{
        height: vh * 18,
        width: vh * 18,
        borderWidth: vh * 1.1,
        borderColor: theme.colors.purple,
        borderRadius: (vh * 18)/2,
        marginVertical: vh*2,
        alignItems:'center',
        justifyContent:'center'
    }
})