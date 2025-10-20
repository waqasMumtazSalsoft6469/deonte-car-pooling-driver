import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import TextRegular from '../../components/Wrappers/Text/GilroyRegular';
import {icons} from '../../assets';
import theme from '../../utils/theme';

const ChatItem = ({item}) => {
  console.log('props...: ', item);
  return (
    <View
      style={[styles.row, item.index % 2 == 1 && {alignItems: 'flex-start'}]}>
      <View
        style={[
          styles.container,
          item.index % 2 == 1 ? styles.recievedMessage : styles.sentMessage,
        ]}>
        <TextRegular style={item.index % 2 == 1 ? styles.text2 : styles.text}>
          I would like a bottle of water from the tuc shop
        </TextRegular>
      </View>
      <TextRegular
        style={[styles.time]} //, item.index % 2 == 1 && {color: 'black'}
      >
        08:30 PM
      </TextRegular>
      {/* {item?.index % 2 == 0 && (
        <Image
          source={icons.doubleTicks}
          style={[
            styles.tick,
            item?.index == 0 && {tintColor: theme.colors.red},
          ]}
        />
      )} */}
    </View>
  );
};

export default ChatItem;
