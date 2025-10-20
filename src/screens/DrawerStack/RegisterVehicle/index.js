import React, {useState, useRef, useLayoutEffect, useCallback} from 'react';
import {Text, ImageBackground, Image, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {step1} from 'react-native/Libraries/Animated/Easing';
import {icons, images} from '../../../assets';
import Button from '../../../components/Button';
import ImageUpload from '../../../components/ImageUpload';
import TextInput from '../../../components/TextInput';
// import DocumentPicker, { types } from 'react-native-document-picker';
import GeneralModal from '../../../popups/GeneralModal';
import Ripple from '../../../components/Wrappers/Ripple';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import {styles} from './styles';
import vh from '../../../utils/units/vh';
import DropDown from '../../../components/Dropdown';
// import ImagePicker from '../../../components/ImagePicker';
import {showToast} from '../../../Api/HelperFunction';
import {useDispatch} from 'react-redux';
import {
  getVehicleTypes,
  vehicleRegister,
} from '../../../Redux/Actions/registerVechicle';
import {useFocusEffect} from '@react-navigation/native';

const RegisterVehicle = props => {
  const dispatch = useDispatch();
  const [license, setLicense] = useState([]);
  const [document, setDocuments] = useState(false);
  const [steps, setSteps] = useState(0);
  const [vehicleType, setVehicleType] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [licensePlateNo, setLicensePlateNo] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [VehicleTypeName,setVehicleTypeName] = useState('')

  const brandNameRef = useRef(null);
  const vehicleNameRef = useRef(null);
  const vehicleColorRef = useRef(null);
  const licensePlateNoRef = useRef(null);
  const vinNumberRef = useRef(null);
  const vehicleTypesRef = useRef(null);
  const getData = async () => {
    try {
      const response = await dispatch(getVehicleTypes());
      console.log('Response from Get Vehicle Types ==>', response);
      // const tempData = [];
      const tempData = response?.vehicle?.map(val => {
        return {label: val?.name, value: val?.name, id: val?._id};
      });
      console.log('Response from Get Vehicle Types tempData ==>', tempData);

      setVehicleTypes(tempData);
    } catch (err) {
      console.log('Error ==>', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  useLayoutEffect(() => {
    if (steps == 2) {
      props.navigation.setOptions({
        headerLeft: () => (
          <Ripple onPress={() => setSteps(steps - 1)}>
            <Image source={icons.arrowBack} style={styles.backicon} />
          </Ripple>
        ),
      });
    } else {
      props.navigation.setOptions({
        headerLeft: () => (
          <Ripple onPress={() => props.navigation.goBack()}>
            <Image source={icons.arrowBack} style={styles.backicon} />
          </Ripple>
        ),
      });
    }
  }, [steps]);

  const handleRegistration = async () => {
    if (vehicleType == null) {
      return showToast('Select your vehicleType');
    }
    if (brandName == '') {
      return showToast('Enter your Brand Name');
    }
    if (vehicleName == '') {
      return showToast('Enter your Vehicle Name');
    }
    if (vehicleColor == '') {
      return showToast('Enter your vehicle Color');
    }
    if (licensePlateNo == '') {
      return showToast('Enter Your License Plate No');
    }

    if (license == false) {
      return showToast('upload your License');
    }
    if (vinNumber == '') {
      return showToast('Enter Your Vin Number');
    }
    if (document == false) {
      return showToast('upload your License');
    }

    const license_Image = {
      name: license[0]?.name,
      type: license[0]?.type,
      uri: license[0]?.uri,
    };
    const document_Image = {
      name: document[0]?.name,
      type: document[0]?.type,
      uri: document[0]?.uri,
    };
    const body = {
      vehicletype: vehicleType,
      brandname: brandName,
      vehiclename: vehicleName,
      vehiclecolor: vehicleColor,
      licenseNo: licensePlateNo,
      VinNo: vinNumber,
      license_plate: license_Image,
      doc_schedule: document_Image,
    };

    try {
      const response = await dispatch(vehicleRegister(body));
      console.log('Response from LogoutHandler ==>', response);
      showToast(response?.message);
      props.navigation.goBack();
    } catch (err) {
      alert(err);
    }
    console.log('Body ===>', body);
  };
  const handleOnSuccess = () => {
    console.log('Success');
  };
  const renderSteps = () => {
    if (vehicleType == null) {
      return showToast('Select your vehicleType');
    }
    if (brandName == '') {
      return showToast('Enter your Brand Name');
    }
    if (vehicleName == '') {
      return showToast('Enter your Vehicle Name');
    }
    if (vehicleColor == '') {
      return showToast('Enter your vehicle Color');
    }
    if (licensePlateNo == '') {
      return showToast('Enter Your License Plate No');
    }

    if (license == false) {
      return showToast('upload your License');
    }
    setSteps(2);
  };

  const ImagePick = async () => {
    try{
const response =  await   DocumentPicker.pick({
      allowMultiSelection: true,
      type: [types.pdf, types.images]
    })
    setLicense(response)
  }catch(err){
    showToast(err)
  }
  };
  const ImagePickDocument = () => {
    DocumentPicker.pickMultiple().then(file => {
      console.log("File ===>",file);

      setDocuments(file);
    });
  };

  const registerPopup = useRef();
  const DropDownRefHobby = useRef();
  const showHobbyPicker = () => {
    if (DropDownRefHobby) {
      DropDownRefHobby.current.show(
        'label',
        vehicleTypes,
        'Select Category',
        data => {
          console.log("Response from Get Vehicle Types data",data);
          setVehicleType(data.id);
          setVehicleTypeName(data.value);
          // tmp = [...vehicleType]
          // tmp.push(data)
          // setVehicleType(tmp)
        },
        null,
        null,
      );
    }
  };

  const renderItem = () => {
    if (steps == 2) {
      return RenderStep2;
    } else {
      return RenderStep1;
    }
  };

  const RenderStep1 = (
    <View>
      <GilroyRegular style={styles.vehicleTypeLabel}>
        Vehicle Type*
      </GilroyRegular>
      <Ripple
        style={styles.vehicleTypeContainer}
        onPress={() => showHobbyPicker()}>
        <GilroyRegular style={styles.vehicleTypeText}>
          {vehicleType ? VehicleTypeName : 'Vehicle Type'}
        </GilroyRegular>
      </Ripple>

      <TextInput
        title="Brand Name*"
        placeholder="Brand Name"
        onChangeText={text => setBrandName(text)}
        autoFocus={true}
        onSubmitEditing={() => vehicleNameRef.current.focus()}

        // secureTextEntry
      />

      <TextInput
      reference = {vehicleNameRef}
        title="Vehicle Name*"
        placeholder="Vehicle Name"
        onChangeText={text => setVehicleName(text)}
        onSubmitEditing={() => vehicleColorRef.current.focus()}

      />
      <TextInput
      reference = {vehicleColorRef}
        title="Vehicle Color*"
        placeholder="Vehicle Color"
        onChangeText={text => setVehicleColor(text)}
        onSubmitEditing={() => licensePlateNoRef.current.focus()}

      />
      <TextInput
      reference = {licensePlateNoRef}
        title="License Plate No*"
        placeholder="License Plate No"
        onChangeText={text => setLicensePlateNo(text)}
      />
      {/* <ImageUpload title="Upload License" description="PDF, JPG (max 3MB)" />
      <ImagePicker /> */}
      <ImageUpload
        title={'Upload License'}
        description={'PDF, JPG (max 3MB)'}
        image={license}
        setImage={setLicense}
        onPress={ImagePick}
      />
      <Button
        style={styles.buttonStyle}
        text="Next"
        onPress={() => {
          renderSteps();
        }}
      />
    </View>
  );

  const RenderStep2 = (
    <View style={styles.step2Conatiner}>
      <TextInput
        title="VIN Number*"
        placeholder="Enter VIN Number"
        onChangeText={text => setVinNumber(text)}
        keyboardType={'number-pad'}
        
      />
      {/* <ImageUpload title="Insurance Documents" description="PDF, Doc (10 MB max)" />
       */}
      <ImageUpload
        title={'Upload License'}
        description={'PDF, JPG (max 3MB)'}
        image={document}
        setImage={setDocuments}
        onPress={ImagePickDocument}
        certificateImage={{height: '100%', width: '100%', borderRadius: vh * 2}}
        uploadBoxStyle={{}}
        imageContainer={{ height: '90%', width: '90%'}}
      />
      <Button
        style={styles.buttonStyle}
        text="Register"
        onPress={() => {
          handleRegistration();
          // registerPopup.current.show()
          // setRegisterPopup(true)
        }}
      />
      <GeneralModal //screen 7
        reference={registerPopup}
        icon={icons.tickModal}
        text2={
          'Your vehicle has been registered.\nThe request has been sent to the admin.\nPlease wait for the approval'
        }
        text2Style={styles.text2Style}
        smallMainIconStyle
      />
    </View>
  );

  return (
    <ImageBackground style={styles.container} source={images.backgroundImage}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {renderItem()}
      </KeyboardAwareScrollView>
      <DropDown ref={DropDownRefHobby} />
    </ImageBackground>
  );
};
export default RegisterVehicle;
