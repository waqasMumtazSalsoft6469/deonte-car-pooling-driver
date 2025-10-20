import React, {useState} from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import TextMedium from '../Wrappers/Text/GilroyMedium';
import TextBold from '../Wrappers/Text/GilroyBold';
import {images} from '../../assets';
import vw from '../../utils/units/vw';
import Ripple from '../Wrappers/Ripple';
import {colors} from '../../utils/theme';

const RenderRides = ({item, index, selected, setSelected}) => {
  console.log('RenderRides');
  // const [selected, setSelected] = useState(1);
  return (
    <View style={styles.parentContainer}>
      <Ripple
        style={[
          styles.mainContainer,
          selected == index && {backgroundColor: colors.primaryColor},
        ]}
        onPress={() => {
          setSelected(index);
        }}>
        <View style={styles.dateAndTimeContainer}>
          <TextMedium>Thu, 14 Oct | 12:59Am</TextMedium>
        </View>
        <View style={{marginHorizontal: 4 * vw}}>
          <View style={styles.innerContainer}>
            <View style={styles.carContainer}>
              <Image
                source={images.car1}
                style={[styles.car, selected == index && {tintColor: 'white'}]}
              />
              <View>
                <TextMedium style={selected == index && {color: 'white'}}>
                  Mini
                </TextMedium>
                <TextMedium style={selected == index && {color: 'white'}}>
                  Sitting Capacity 4
                </TextMedium>
                <TextMedium style={selected == index && {color: 'white'}}>
                  Non-AC
                </TextMedium>
              </View>
            </View>
            <View>
              <TextBold
                style={[
                  styles.priceText,
                  selected == index && {color: 'white'},
                ]}>
                $20
              </TextBold>
            </View>
          </View>
        </View>
      </Ripple>
    </View>
  );
};

export default RenderRides;
