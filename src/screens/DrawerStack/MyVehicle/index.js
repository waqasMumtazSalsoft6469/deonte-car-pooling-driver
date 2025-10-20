import React from 'react';
import { Text, ImageBackground, Image } from 'react-native';
import { images } from '../../../assets';
import Button from '../../../components/Button';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import { styles } from './styles';

const MyVehicle = (props) => {
    return (
        <ImageBackground style={styles.container} source={images.backgroundImage}>
            <Image source={images.myVehicle} style={styles.carsImage} />
            <GilroyBold style={styles.paraText}>Please register your vehicle in order to continue{"\n"}
                as a rider.</GilroyBold>
            <Button
                text="Register Vehicle"
                style={styles.buttonStyle}
                textStyle={styles.buttonText}
                onPress={() => props.navigation.navigate("RegisterVehicle")}
            />

        </ImageBackground>
    )
}
export default MyVehicle