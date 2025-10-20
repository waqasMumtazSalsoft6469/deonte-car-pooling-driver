import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Keyboard,
  LayoutAnimation,
  Platform,
} from 'react-native';
import {icons, images} from '../../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import ExtendedHeader from '../../components/ExtendedHeader';
import styles from './styles';
import InputField from '../../../components/TextInput';
import TextButton from '../../../components/Buttons/TextButton';
import TextRegular from '../../../components/Wrappers/Text/GilroyRegular';
import TextExtraBold from '../../../components/Wrappers/Text/GilroyBold';
import theme from '../../../utils/theme';
// import Carousel from 'react-native-snap-carousel';
import GeneralModal from '../../../popups/GeneralModal';
import ChatItem from '../../../components/ChatMessage';
import Ripple from '../../../components/Wrappers/Ripple';
const Chat = props => {
  const [step, setStep] = useState(1);
  const [height, setHeight] = useState({show: false});
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      // setKeyboardStatus('Keyboard Shown');
      console.log('keyboard: ', e);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      setHeight({show: true, height: e.endCoordinates.height});
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      // setKeyboardStatus('Keyboard Hidden');
      setHeight({show: false});
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    // <ExtendedHeader>
    <View style={styles.contentContainer}>
      {/* contentContainerStyle */}
      <FlatList
        data={[1, 2, 3]}
        renderItem={item => <ChatItem item={item} />}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={styles.listContentContainer}
      />
      <View
        style={[
          styles.bottomContainer,
          height?.show &&
            Platform.OS == 'ios' && {paddingBottom: height?.height},
        ]}>
        {/* <InputField
          // title="Card Holder Name"
          // touchable={true}
          placeholder="Write a message..."
          // placeholderTextColor={theme.colors.grayText}
          textInputStyle={styles.inputStyle}
          style={styles.textInputContainerStyle}
          textInputContainer={styles.inputContainerStyle}
          rightIcon={icons.photos}
          rightIconStyle={styles.rightIconStyle}
        /> */}
        <Ripple style={styles.sendButton}>
          <Image
            source={icons.camera}
            style={styles.sendIcon}
            resizeMode="contain"
          />
        </Ripple>
        <InputField textInputContainer={styles.inputStyle} />
        <Ripple style={styles.sendButton}>
          <Image
            source={icons.send}
            style={styles.sendIcon}
            resizeMode="contain"
          />
        </Ripple>
      </View>
      {/* </ExtendedHeader> */}
    </View>
  );
};

export default Chat;
