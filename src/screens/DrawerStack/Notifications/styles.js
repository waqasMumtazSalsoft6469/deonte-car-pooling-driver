import React from 'react';
import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: theme.colors.white,
        paddingTop: vh*3,
        alignItems: "center"
    },
    notificationCardContainer:{
        width: vw * 80,
        flexDirection: "row",
        // backgroundColor: "red"
        // alignItems: "center"

    },
    footerStyle:{
        paddingBottom: vh*4
    },
    innerContainer:{
        paddingLeft: vw*2,
        width: vw * 80
    },
    circle:{
        marginTop: vh*0.5,
        height: vh*1.5,
        width: vw*3,
        borderRadius: vh*8,
        backgroundColor: theme.colors.primaryColor
    },
    notificationText:{
        fontSize: vh*1.6,

    },
    dateContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingLeft: vw*1,
        paddingVertical: vh*0.5,
        width: vw*80
    },
    dateText:{
        fontSize: vh*1.5,
        color: theme.colors.GrayLine

    },
    horizontalLine: {
        width: 90 * vw,
        alignSelf: 'center',
        height: 0.25 * vh,
        // borderWidth: 1.5,
        borderRadius: 0.25 * vh,
        backgroundColor: theme.colors.gray,
        marginBottom: 2 * vh,
        marginTop: vh*1,
        alignSelf: "center"
      },
      emptyContainer:{
        height: vh * 60,
    justifyContent:'center',
    alignItems:'center'
    },
    emptyContainertext:{
        fontSize:  vh * 2.5,
        fontWeight:'bold'
    }
})