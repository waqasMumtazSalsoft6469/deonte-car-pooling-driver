import React from 'react';
import { StyleSheet, ViewBase } from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        alignItems: "center",
        // justifyContent: "center",
        paddingTop: vh * 12
    },
    cardText: {
        paddingLeft: vw * 2,
        fontSize: vh * 1.7
    },
    icon: {
        height: vh * 2.5,
        width: vh * 2,
        resizeMode: "contain"
    },
    buttonText: {
        fontSize: vh * 1.85
    },
    nameStyle: {
        marginVertical: vh * 1,
        letterSpacing: vh * 0.2
    },
    buttonStyle: {
        height: vh * 5.7
    },
    cardContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: vh * 2,
        height: vh * 5.8,
        alignItems: "center",
        justifyContent: "center",
        width: vw * 85,
        // marginVertical: vh*1,
        marginTop: vh * 0.7,
        // marginBottom: vh*2,
        borderColor: theme.colors.greyInput
    },
    profileImage: {
        height: vh * 18,
        width: vh * 18,
        // borderWidth: vh * 1.6,
        borderWidth: vh * 1.3,
        borderColor: theme.colors.purple,
        borderRadius: (vh * 18)/2,
        marginBottom: vh * 1.1

        // resizeMode: "contain"
    },
    passwordLockIcon: {
        height: vh * 2,
        width: vh * 2,
        resizeMode: "contain"
    },
    changePasswordText: {
        color: theme.colors.primaryColor,
        paddingLeft: vw * 2,
        fontSize: vh * 1.85

    },
    changePasswordContainer: {
        flexDirection: "row",
        // marginVertical: vh*1,
        marginTop: vh * 7,
        marginBottom: vh * 1
    }

    // ProfileImageContainer:{
    //     // height: vh*15,
    //     // width: vh*15,
    //     borderWidth: 5,
    //     borderColor: theme.colors.purple,
    //     borderRadius: vh*9
    // }
})