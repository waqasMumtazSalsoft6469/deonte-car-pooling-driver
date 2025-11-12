import React from 'react';
import { StyleSheet, ViewBase } from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        marginTop: vh * 10,
    },
    contentContainer: {
        alignItems: "center",
        paddingTop: vh * 8,
        paddingBottom: vh * 4,
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
        marginTop: vh * 1,
        marginBottom: vh * 2,
        fontSize: vh * 2.2,
        fontWeight: "600",
        letterSpacing: vh * 0.2,
        color: theme.colors.black,
    },
    buttonStyle: {
        height: vh * 5.7,
        width: vw * 85,
        marginTop: vh * 2,
    },
    cardContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: vh * 2,
        height: vh * 5.8,
        alignItems: "center",
        justifyContent: "flex-start",
        width: vw * 85,
        marginTop: vh * 1,
        paddingHorizontal: vw * 4,
        borderColor: theme.colors.greyInput,
        backgroundColor: theme.colors.white,
    },
    ProfileImageContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: vh * 1.5,
    },
    profileImage: {
        height: vh * 18,
        width: vh * 18,
        borderWidth: vh * 1.3,
        borderColor: theme.colors.purple,
        borderRadius: (vh * 18) / 2,
        backgroundColor: theme.colors.white,
        resizeMode: "cover",
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
        alignItems: "center",
        marginTop: vh * 4,
        marginBottom: vh * 2,
        paddingVertical: vh * 1,
    },

    // ProfileImageContainer:{
    //     // height: vh*15,
    //     // width: vh*15,
    //     borderWidth: 5,
    //     borderColor: theme.colors.purple,
    //     borderRadius: vh*9
    // }
})