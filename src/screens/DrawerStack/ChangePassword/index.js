import React, {useState, useRef} from 'react';
import {Text, Image, View} from 'react-native';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import GeneralModal from '../../../popups/GeneralModal';

import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import {icons} from '../../../assets';
import vh from '../../../utils/units/vh';
// vh
import {useDispatch} from 'react-redux';
import {showToast} from '../../../Api/HelperFunction';
import {changePasswordAction} from '../../../Redux/Actions/auth';
const ChangePassword = props => {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleUpdateButton = async () => {
    if (currentPassword == '') {
      return showToast('Please Enter Current password');
    }
    if (newPassword == '') {
      return showToast('Please Enter New password');
    }
    if (confirmPassword == '') {
      return showToast('Please Confirm your password');
    }
    if (newPassword != confirmPassword) {
      return showToast('Password Does not Match');
    }
    const body = {
      existingpassword: currentPassword,
      newpassword: newPassword,
      confirm_password: confirmPassword,
    };
    try {
      const response = await dispatch(changePasswordAction(body));
      passwordRef.current.show();
      console.log('Password Ref ==>', passwordRef);
      // props?.navigation.goBack();
    } catch (err) {
      showToast(err);
    }
  };
  return (
    <View style={styles.container}>
      {/* <GilroyBold style={styles.changePasswordText}>Change Password</GilroyBold> */}
      <KeyboardAwareScrollView

        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <TextInput
          title="Current Password"
          labelStyle={styles.inputLabel2}
          placeholder="Current Password*"
          secureTextEntry={true}
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.input2Style}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setCurrentPassword(text)}
        autoFocus={true}
        onSubmitEditing={() => newPasswordRef.current.focus()}



          // secureTextEntry
        />
        <TextInput
          reference={newPasswordRef}
          title="New Password"
          labelStyle={styles.inputLabel2}
          placeholder="New Password*"
          secureTextEntry={true}
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.input2Style}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setNewPassword(text)}
        onSubmitEditing={() => confirmPasswordRef.current.focus()}


          // secureTextEntry
        />
        <TextInput
          reference={confirmPasswordRef}
          title="Confirm Password"
          labelStyle={styles.inputLabel2}
          placeholder="Confirm Password*"
          secureTextEntry={true}
          // inputStyle={styles.inputStyle}
          textInputContainer={styles.inputStyle}
          inputStyle={styles.input2Style}
          parentContainerStyle={styles.inputParentContainerStyle}
          onChangeText={text => setConfirmPassword(text)}

          // secureTextEntry
        />
        <Button
          text="Update"
          onPress={
            () => handleUpdateButton()
            // passwordRef.current.show()
          }
          style={styles.buttonStyle}
          textStyle={styles.buttonText}
          // onPress={() => setModalVisible(false)}
        />
        <GeneralModal //screen 7
          reference={passwordRef}
          icon={icons.tickModal}
          text2={'Password updated successfully'}
          text2Style={{height: null, fontSize: 1.8 * vh}}
          smallMainIconStyle
          onHide={() => props.navigation.goBack()}
        />
      </KeyboardAwareScrollView>
      {/* </View> */}
    </View>
  );
};

export default ChangePassword;
