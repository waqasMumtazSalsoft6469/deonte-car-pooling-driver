import { StyleSheet } from 'react-native';
import theme, { colors } from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const RideStartedStyles= StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center"

    },
    pauseBtn:{
        width: vw*26,
        height: vh*4,
        marginRight: vw*13,
        marginVertical: 0,
        borderRadius: vh*1.5,
        backgroundColor: theme.colors.primaryColor,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    pauseBtnText:{
        fontSize: vh*1.5,
        color: theme.colors.white,
        paddingLeft:vh*1
    },
    checkBtnIcon:{
        height: vh*1.7,
        width: vh*1.7
    },
    numberIdText:{
        fontSize: vh*1.7
    },
    userNameImageContainer:{
        flexDirection: "row",
        alignItems: "center"
    },
    buttonContainer:{
        height: vh*6.2,
        width: vw*45,
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
        flexDirection: "row",
    },
    buttonText:{
        color: theme.colors.white
    },
    rejectBtn:{
        borderBottomRightRadius: vh*2,
        // backgroundColor: theme.colors.red
        backgroundColor: theme.colors.gray3
    },
    acceptBtn:{
        borderBottomLeftRadius: vh*2,
        backgroundColor: theme.colors.lightGray
    },
    markColor:{
        backgroundColor: theme.colors.primaryColor,
        borderBottomLeftRadius: vh*2,
    },
 
    mapView:{
        height: vh*100,
        width: vw*100,
    },
   
    CardContainer:{
        minHeight: vh*46,
        maxHeight: vh*70,
        width: vw*90,
        // paddingHorizontal: vw*8,
        alignItems: "center",
        backgroundColor: theme.colors.white,
        position: "absolute",
        bottom: vh*10,
        borderRadius: vh*2,
        // alignItems: "center",
        paddingVertical: vh*2,
        paddingBottom: vh*3
    },
    profileImage:{
        height: vh*8,
        width: vw*16,
        // borderWidth:1,
        borderRadius: vh*10,
        // resizeMode: "contain"
    },
    markColorPaid:{
        backgroundColor: theme.colors.primaryColor,
        borderBottomRightRadius: vh*2,

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
})