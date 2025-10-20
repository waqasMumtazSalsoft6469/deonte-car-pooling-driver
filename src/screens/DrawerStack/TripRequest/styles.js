import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center"

    },
    buttonContainer:{
        height: vh*6.2,
        width: vw*45,
        alignItems: "center",
        justifyContent: "center",
    },
    ButtonsStyle:{
        width: vw*90,
        flexDirection: "row"
    },
    buttonText:{
        color: theme.colors.white
    },
    rejectBtn:{
        borderBottomRightRadius: vh*2,
        backgroundColor: theme.colors.red
    },
    acceptBtn:{
        borderBottomLeftRadius: vh*2,
        backgroundColor: theme.colors.green
    },
   
    mapView:{
        height: vh*100,
        width: vw*100,
    },
    CardContainer:{
       
        // paddingHorizontal: vw*8,
        alignItems: "center",
        backgroundColor: theme.colors.white,
        position: "absolute",
        bottom: vh*7,
        borderRadius: vh*1,
        // alignItems: "center",
        paddingVertical: vh*2,
        shadowColor: theme.colors.white,
        shadowOpacity: 0.5,
        
    },
    profileImage:{
        height: vh*9,
        width: vh*9,
        // borderWidth:1,
        borderRadius: (vh*9 ) / 2,
        // resizeMode: "contain"
    },
    profileContainer:{
        height: vh*10,
        alignItems: "center",
        justifyContent: "center",
        width: vh*10,
        // borderColor: theme.colors.purple,
        borderColor: theme.colors.primaryColor,
        borderRadius: (vh* 10)/2,
        borderWidth: vh*0.5,
     
        
    },
    userNameText:{
        paddingLeft: vw*3,
        textTransform:'capitalize'
    },
    usernameProfileContainer:{
        flexDirection: "row",
        alignItems: "center",

        width: vw*80
    },
})