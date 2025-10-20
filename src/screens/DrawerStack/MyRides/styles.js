import { StyleSheet } from 'react-native';
import theme, { appShadow } from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: vh * 3,
        // alignItems: "center"
    },
    arrowIcon: {
        height: vh * 1.5,
        width: vh * 1.5,
        resizeMode: "contain",
        tintColor: theme.colors.black
    },
    rideContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: vw * 7.2
    },
    driverNameContainer: {
        flex: 1,
        width: vw * 79,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bookedText:{
        fontSize: vh*1.5,
        color: theme.colors.primaryColor
    },
    bookedContainer: {
        backgroundColor: "white",
        position: "absolute",
        top: vh * 5.3,
        right: vw * 6,
        height: vh * 3.3,
        alignItems: "center",
        justifyContent: "center",
        width: vw*20,
        ...appShadow

    },
    rideMapStyle: {
        height: vh * 16,
        width: vw * 100,
        marginTop: vh * 1,
        marginBottom: vh*4
        // resizeMode: "contain"
    },
    eyeOpenStyle:{
        height: vh*2,
        width: vh*2,
        resizeMode: "contain"
    },
    viewMoreContainer:{
        flexDirection: "row"
    },
    footerStyle:{
        alignItems: "center",
        paddingTop: vh*2,
        paddingBottom: vh*4
    },
    viewMoreText:{
        color: theme.colors.primaryColor,
        paddingLeft: vw*2
    },
    driverNameStyle:{
        fontSize: vh*1.6
    },
    idStyle:{
        fontSize: vh*1.6,
        color: "#707070"
    },
    emptyContainerStyles :{height: vh * 50, alignItems:'center', justifyContent:'center'},
    emptyText:{
        fontSize: vh*4,
        color: theme.colors.primaryColor
    }

})