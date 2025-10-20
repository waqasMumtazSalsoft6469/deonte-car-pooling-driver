import React, {useState, useRef} from 'react';
import {Text, Image, View} from 'react-native';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import GeneralModal from '../../../popups/GeneralModal';
import {useDispatch, useSelector} from 'react-redux';

import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import {icons} from '../../../assets';
import vh from '../../../utils/units/vh';
import {showToast} from '../../../Api/HelperFunction';
// vh
import {addPlayListAction} from '../../../Redux/Actions/songs';
// import Toast from 'react-native-toast';

const AddSongScreen = props => {
  const dispatch = useDispatch();
  const songNameRef = useRef(null);
  const ArtistNameRef = useRef(null);
  const songDurationRef = useRef(null);
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [songDuration, setSongDuration] = useState('');
  const CurrentRideId = useSelector(state => state.vehicleReducer.currentRide);
  const RiderDetail = useSelector(state => state.SessionReducer.riderinfo);

  console.log('-------CurrentRideId', CurrentRideId);
  const handleAddButton = async () => {
    if (songName == '') {
      return showToast('Enter Song Name');
    }
    if (artistName == '') {
      return showToast('Enter Artist Name');
    }
    if (songDuration == '') {
      return showToast('Enter Song Duration');
    }
    if (RiderDetail?._id === null) {
      return Toast.show('The ride have no drivers!');
    }
    const body = {
      songname: songName,
      artistname: artistName,
      duration: songDuration,
      // ride: CurrentRideId,
      ride: CurrentRideId ? CurrentRideId : null,
      // ride: '65eecb7d2805b3b956f9fb45',
    };

    console.log('body-addnewsong', body);
    try {
      const response = await dispatch(addPlayListAction(body));
      passwordRef.current.show();
      showToast('Song Added Successfully');
      props.navigation.goBack();
    } catch (err) {
      showToast(err);
    }
  };
  const passwordRef = useRef();
  return (
    <View style={styles.container}>
      {/* <GilroyBold style={styles.changePasswordText}>Change Password</GilroyBold> */}
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <TextInput
          title="Song Name*"
          labelStyle={styles.inputLabel2}
          placeholder="Song Name"
          // secureTextEntry={true}
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.input2Style}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setSongName(text)}
          onSubmitEditing={() => ArtistNameRef.current.focus()}
          autoFocus={true}

          // secureTextEntry
        />
        <TextInput
          reference={ArtistNameRef}
          title="Artist Name*"
          labelStyle={styles.inputLabel2}
          placeholder="Artist Name"
          // secureTextEntry={true}
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.input2Style}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setArtistName(text)}
          onSubmitEditing={() => songDurationRef.current.focus()}

          // secureTextEntry
        />
        <TextInput
          reference={songDurationRef}
          title="Song Duration"
          labelStyle={styles.inputLabel2}
          placeholder="Duration (MM:HH)"
          // secureTextEntry={true}
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.input2Style}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setSongDuration(text)}

          // secureTextEntry
        />
        <Button
          text="Add"
          onPress={() => handleAddButton()}
          style={styles.buttonStyle}
          textStyle={styles.buttonText}
          // onPress={() => setModalVisible(false)}
        />
        <GeneralModal //screen 7
          reference={passwordRef}
          icon={icons.tickModal}
          text2={'Song has been added.'}
          text2Style={{height: null, fontSize: 1.8 * vh}}
          smallMainIconStyle
          button1Text="Go to Playlist"
          button1Style={styles.playlistButton}
          onButton1Press={() => props.navigation.navigate('MusicListing')}
        />
      </KeyboardAwareScrollView>
      {/* </View> */}
    </View>
  );
};

export default AddSongScreen;
