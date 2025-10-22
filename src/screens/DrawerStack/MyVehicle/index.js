import React from 'react';
import { Text, ImageBackground, Image, View } from 'react-native';
import { images } from '../../../assets';
import Button from '../../../components/Button';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import { styles } from './styles';

const MyVehicle = (props) => {
    return (
        <View style={styles.container} >
            <Image source={images.myVehicle} style={styles.carsImage} />
            <GilroyBold style={styles.paraText}>Please register your vehicle in order to continue{"\n"}
                as a rider.</GilroyBold>
            <Button
                text="Register Vehicle"
                style={styles.buttonStyle}
                textStyle={styles.buttonText}
                onPress={() => props.navigation.navigate("RegisterVehicle")}
            />

        </View>
    )
}
export default MyVehicle