import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const tripAcceptStyles= StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center"

    },
    tripIdText:{
        fontSize: vh*1.6,
        color: theme.colors.textBlack,
        marginTop: vh * 2
    },
    userNameImageContainer:{
        flexDirection: "row",
        alignItems: "center"
    },
    buttonContainer:{
        height: vh*6.2,
        width: vw*90,
        alignItems: "center",
        justifyContent: "center",
    },
    text2style:{
        height: null,
        paddingTop: vh*1,
        width: vw*90
    },
    imgsContainer:{
        flexDirection: "row"
    },
    phoneIcon:{
        height: vh*3,
        width: vh*3,
        resizeMode: "contain"
    },
    phoneIconChanges:{
        marginLeft: vw*4
    },
    ButtonsStyle:{
        width: vw*90,
        flexDirection: "row"
    },
    buttonText:{
        color: theme.colors.white
    },
    rejectBtn:{
        // borderBottomRightRadius: vh*2,
        width: '100%',
        backgroundColor: theme.colors.primaryColor,
        borderBottomLeftRadius: vh*2,
        borderBottomRightRadius: vh*2,
    },
    acceptBtn:{
        // borderBottomLeftRadius: vh*2,
        color: theme.colors.red,
        // backgroundColor: theme.colors.green
    },
    // dateText:{
    //     paddingTop: vh*1,
    //     fontSize: vh*1.8
    // },
    // calendarCartContainer:{
    //     alignItems: "center"
    // },
    // calendarIcon:{
    //     height: vh*3.7,
    //     width: vh*3.7,
    //     resizeMode: "contain"
    // },
    // locationContentContainer:{
    //     paddingLeft: vw*4
    // },
    // addressText:{
    //     fontSize: vh*1.6,
    //     color: theme.colors.GrayLine,paddingTop: vh*0.4,
    //     paddingBottom: vh*1.8,
    //     letterSpacing: vw*0.4
    // },
    // userServicesContainer:{
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     paddingVertical: vh*2,
    //     width: vw*73,
    //     marginBottom: vh*2
    // },
    // destinationImageContainer:{
    //     // justifyContent: "center",
    //     paddingTop: vh*2,
    //     alignItems: "center"
    // },
    // verticalHr:{
    //     height: vh*2.6,
    //     borderLeftWidth:1,
    //     borderStyle: "dashed",
    //     borderColor: theme.colors.primaryColor,
    //     // marginLeft: vh*1.7
    //     marginVertical: vh*0.4

    // },
    // pickupText:{
    //     fontSize: vh*1.9,
    //     // lineHeight: vh*3
    //     letterSpacing: vw*0.4
    // },
    mapView:{
        height: vh*100,
        width: vw*100,
    },
    // destination:{
    //     height: vh*2,
    //     width: vh*2,
    //     resizeMode: "contain"
    // },
    CardContainer:{

        width: vw*90,
        // paddingHorizontal: vw*8,
        alignItems: "center",
        backgroundColor: theme.colors.white,
        position: "absolute",
        bottom: vh*10,
        borderRadius: vh*2,        // alignItems: "center",
    },
    profileImage:{
        height: vh*8,
        width: vw*16,
        // borderWidth:1,
        borderRadius: vh*10,

        // resizeMode: "contain"
    },
    profileContainer:{
        height: vh*9,
        alignItems: "center",
        justifyContent: "center",
        width: vw*17.5,
        // borderColor: theme.colors.purple,
        borderColor: theme.colors.primaryColor,
        borderRadius: vh*6,
        borderWidth: vh*0.5,
     
        
    },
    userNameText:{
        paddingLeft: vw*3
    },
    usernameProfileContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        width: vw*80
    },
    // contentMainContainer:{
    //     flexDirection: "row",
    //     paddingTop: vh*4,
    //     width: vw*73
    // }
})