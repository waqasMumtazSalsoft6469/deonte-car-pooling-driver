import { StyleSheet } from 'react-native';
import theme, { appShadow } from '../../../utils/theme';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';

export const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
    carsImage:{
        height: vh*19,
        width: vw*89,
        resizeMode: "contain"
    },
    paraText:{
        fontSize: vh*1.9,
        color: theme.colors.white,
        textAlign: "center",marginTop: vh*6
    },
    buttonStyle:{
        marginTop: vh*2.5,
        height: vh*6.1
    },
    buttonText:{
        fontSize: vh*2
    }
})