import React, {useState, useRef} from 'react';
import {Text, View, Image} from 'react-native';
import {images} from '../../../assets';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail} from '../../../utils/units/validation';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {showToast} from '../../../Api/HelperFunction';
import {contactUs} from '../../../Redux/Actions/profileAction';
const ContactUs = props => {
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.UserReducer.userData);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('driver');

  const resetState = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setMessage('');
  };
  const handleSubmit = async () => {
    if (firstName == '') {
      return showToast('Please Enter Your First Name');
    }
    if (lastName == '') {
      return showToast('Please Enter Your Last Name');
    }
    if (email == '') {
      return showToast('Please Enter Your Email Name');
    }
    if (!validateEmail(email)) {
      return showToast('Please Enter Valid email');
    }
    if (message == '') {
      return showToast('Please Enter Your Message');
    }
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email.trim().toLowerCase(),
      message: message,
      type: type,
    };
    try {
      const response = await dispatch(contactUs(body));
      showToast('Feedback send Successfully');
      resetState();
      props.navigation.goBack();
    } catch (err) {
      resetState();
      showToast(err);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={images.contactUs} style={styles.contactImage} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <TextInput
          title="First Name*"
          labelStyle={styles.inputLabel2}
          placeholder="First Name"
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.input2Style}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setFirstName(text)}
          autoFocus={true}
          onSubmitEditing={() => lastNameRef.current.focus()}

          // secureTextEntry
        />
        <TextInput
          reference  = {lastNameRef}
          title="Last Name"
          labelStyle={styles.inputLabel2}
          placeholder="Last Name*"
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.input2Style}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setLastName(text)}
          onSubmitEditing={() => emailRef.current.focus()}

          

          // secureTextEntry
        />
        <TextInput
          reference  = {emailRef}
          title="Email"
          labelStyle={styles.inputLabel2}
          placeholder="Email*"
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.input2Style}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setEmail(text)}
          onSubmitEditing={() => messageRef.current.focus()}
          keyboardType={'email-address'}


          // secureTextEntry
        />
        <TextInput
          title="Message"
          reference  = {messageRef}
          labelStyle={styles.inputLabel2}
          placeholder="Message*"
          multiline={true}
          numberOfLines={6}
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.inputMessageStyle}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setMessage(text)}

          // secureTextEntry
        />
        <Button
          text="Send"
          style={styles.buttonStyle}
          textStyle={styles.buttonText}
          onPress={() => {
            handleSubmit();
            // registerPopup.current.show()
            // setRegisterPopup(true)
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ContactUs;
