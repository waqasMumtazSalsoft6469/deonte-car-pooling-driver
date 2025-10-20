import { StyleSheet, Dimensions } from 'react-native';

const vw = Dimensions.get('window').width * 0.01
const vh = Dimensions.get('window').height * 0.01
export const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        backgroundColor: 'transparent',
        height: 0,
        width: 0,
        bottom: 0,
        left: 0,
    },
    backdropButton: {
        backgroundColor: 'transparent'
    },
    font: {
        fontSize: 2.3 * vh,
        color: 'black'
    },
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: 0 * vh,
        width: 100 * vw,
        bottom: 0,
        left: 0,
        zIndex: 10000000
    },
    titleBar: {
        width: 100 * vw,
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 10
    },
    conetnt: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100 * vw,
        backgroundColor: '#D2D5DD'
    },
    doneButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    cancelButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    conetntContainer: {
        backgroundColor: '#fff',
        width: 100 * vw,
        elevation: 10,

    },

})