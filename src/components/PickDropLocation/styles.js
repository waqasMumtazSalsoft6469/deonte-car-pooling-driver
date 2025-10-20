import { StyleSheet } from 'react-native';
import vh from '../../utils/units/vh';
import vw from '../../utils/units/vw';
import theme from '../../utils/theme';
export const styles = StyleSheet.create({
    calendarCartContainer:{
        alignItems: "center"
    },
    calendarIcon:{
        height: vh*3.7,
        width: vh*3.7,
        resizeMode: "contain"
    },
    locationContentContainer:{
        paddingLeft: vw*4
    },
    dateText:{
        paddingTop: vh*1,
        fontSize: vh*1.8
    },
    contentMainContainer:{
        flexDirection: "row",
        paddingTop: vh*4,
        width: vw*73
    },
    pickupText:{
        fontSize: vh*1.9
    },
    addressText:{
        fontSize: vh*1.6,
        color: theme.colors.GrayLine,
        paddingTop: vh*0.4,
        paddingBottom: vh*1.8
    },
    userServicesContainer:{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: vh*2,
        width: vw*70,
    },
    destinationImageContainer:{
        // justifyContent: "center",
        paddingTop: vh*2,
        alignItems: "center"
    },
    verticalHr:{
        height: vh*2.6,
        borderLeftWidth:1,
        borderStyle: "dashed",
        borderColor: theme.colors.primaryColor,
        // marginLeft: vh*1.7
        marginVertical: vh*0.4

    },
    destination:{
        height: vh*2,
        width: vh*2,
        resizeMode: "contain"
    },
})