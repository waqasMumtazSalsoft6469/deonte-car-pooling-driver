import { StyleSheet } from 'react-native';
import { Fonts } from '../../../assets';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: vh * 3,
        alignItems: "center",
        backgroundColor: "white"
    },
    inputLabel2: {
        color: 'black',
        fontSize: vh*1.6,
        margin: 0,
        padding:0
        // marginBottom: 4 * vh,
    },
    contactImage:{
        height: vh*15,
        width: vw*30,
        resizeMode: "contain"
    },
    buttonStyle: {
        height: vh * 5.7
    },
    buttonText: {
        fontSize: vh * 1.85
    },
    input2Style: {
        fontFamily: Fonts.GL,
        // fontSize: 2.9 * vh,
        marginLeft: 7 * vw,
        margin: 0,
        // paddingHorizontal: 0,
        // paddingBottom:0,
        // paddingTop:vh*0
    },
    inputStyle: {
        // backgroundColor: theme.colors.white, //gray2
        width: 85 * vw,
        // borderRadius: 3 * vh,
        // height: 7 * vh,
        // margin: 0,
        // padding:0
    },
    inputMessageStyle:{
        fontFamily: Fonts.GL,
        // fontSize: 2.9 * vh,
        marginLeft: 7 * vw,
        // margin: 0,
        // paddingHorizontal: 0,
        // paddingBottom:0,
        // paddingTop:vh*0
    },
    inputParentContainerStyle:{
        marginVertical:vh*1,
        // padding:0
    }
    
})