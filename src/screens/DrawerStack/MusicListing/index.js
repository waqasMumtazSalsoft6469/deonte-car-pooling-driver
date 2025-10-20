import {View, Text, Image, FlatList} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import styles from './styles';
import {icons, images} from '../../../assets';
import TextMedium from '../../../components/Wrappers/Text/GilroyMedium';
import TextRegular from '../../../components/Wrappers/Text/GilroyRegular';
import Button from '../../../components/Button';
import GeneralModal from '../../../popups/GeneralModal';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import Ripple from '../../../components/Wrappers/Ripple';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getSongs} from '../../../Redux/Actions/songs';
import {image_url} from '../../../Api/configs';

const MusicListing = props => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  console.log('Deatils ==>', details);
  let modalRef = useRef(null);
  let modalRef2 = useRef(null);
  const getData = async () => {
    try {
      const response = await dispatch(getSongs());
      console.log('Response from music  ==>', response);
      setDetails(response?.myTrack);
    } catch (err) {
      console.log('Error ==>', err);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  const renderEmptyComponent = () => {
    return (
      <View>
        <TextRegular>No Playlist For Now Kindly Add songs</TextRegular>
      </View>
    );
  };
  const renderItem = ({index, item}) => {
    return (
      <View>
        {index != 0 && <View style={styles.horizontalLine2} />}
        <View style={styles.row2}>
          <View style={styles.row}>
            {/* <Image
              source={
                item?.image ? {uri: image_url + item?.image} : images.userImage
              }
              style={styles.itemImage}
            /> */}
            <View>
              <TextMedium style={styles.textMedium}>
                {item?.songname}
              </TextMedium>
              <TextRegular style={styles.text}>{item?.artistname}</TextRegular>
            </View>
          </View>
          <TextRegular style={styles.grayText}>{item?.duration}</TextRegular>
          {/* <Button
            onPress={() => modalRef.current.show()}
            text="Request"
            style={styles.button}
            textStyle={styles.textStyle}
          /> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Ripple
        style={styles.addSongContainer}
        onPress={() => props.navigation.navigate('AddSongScreen')}>
        <Image source={icons.plusCircle} style={styles.plusStyle} />
        <GilroyMedium style={styles.addSongText}>Add Song</GilroyMedium>
      </Ripple>
      <FlatList
        data={details}
        renderItem={({index, item}) => renderItem({index, item})}
        keyExtractor={value => value}
        ListEmptyComponent={renderEmptyComponent}
      />
      {/* <GeneralModal //screen 7
        reference={modalRef}
        icon={images.exclamationMark}
        text1={'System Message'}
        text2={'Do you wish to notify the driver to play this track?'}
        smallMainIconStyle
        text2Style={{height: null, fontSize: 1.9 * vh}}
        textContainerStyle={{width: 70 * vw}}
        // textLink={'Contact Here'}
        // onHide={() => props.navigation.navigate('Drawer')}
        // textLinkStyle={{}}
        button1Text={'Yes'}
        onButton1Press={() => {
          modalRef2.current.show();
          // props.navigation.navigate('Signup');
        }}
        onHide={() => {
          // props.navigation.navigate('ChooseRide');
          modalRef2.current.show();
        }}
        button2Text={'No'}
      />
      <GeneralModal //screen 7
        reference={modalRef2}
        icon={images.exclamationMark}
        text1={'System Message'}
        text2={'Request has been sent to driver'}
        smallMainIconStyle
        text2Style={{height: null, fontSize: 1.9 * vh}}
        textContainerStyle={{width: 70 * vw}}
        // textLink={'Contact Here'}
        // onHide={() => props.navigation.navigate('Drawer')}
        // textLinkStyle={{}}
        button1Text={'Ok'}
        onButton1Press={() => {
          // modalRef2.current.show();
          // props.navigation.navigate('Signup');
        }}
        onHide={() => {
          // props.navigation.navigate('ChooseRide');
          // modalRef9.current.show();
        }}
        // button2Text={'Cancel'}
      /> */}
    </View>
  );
};

export default MusicListing;
