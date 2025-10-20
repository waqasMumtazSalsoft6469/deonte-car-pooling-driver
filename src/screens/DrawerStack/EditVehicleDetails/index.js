import React, {useRef, useState, useCallback} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {icons, images} from '../../../assets';
import TextInput from '../../../components/TextInput';
import styles from './styles';
import Button from '../../../components/Button';
import Ripple from '../../../components/Wrappers/Ripple';
// import DocumentPicker from 'react-native-document-picker';
import GeneralModal from '../../../popups/GeneralModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImageUpload from '../../../components/ImageUpload';
// import ImagePicker from '../../../components/ImagePicker';
import vh from '../../../utils/units/vh';
import DropDown from '../../../components/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../../Api/HelperFunction';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import {image_url} from '../../../Api/configs';
import {
  vehicleRegister,
  EditVehicleInfo,
  getVehicleTypes,
} from '../../../Redux/Actions/registerVechicle';
import vw from '../../../utils/units/vw';
import {useFocusEffect} from '@react-navigation/native';
import EditImageUpload from '../../../components/EditImageupload';
const EditVehicleDetails = props => {
  console.log(
    'Porps?.route?.params ====>',
    props?.route?.params?.data?.insurancedoc,
  );
  const dispatch = useDispatch();
  const [details, setDetails] = useState(props?.route?.params);
  const VehicleTypesfromReducer = useSelector(
    state => state.vehicleReducer.vehicleTypes,
  );

  const updateRef = useRef();
  const [image, setImage] = useState(null);
  const [id, setID] = useState(props?.route?.params?.data?._id);
  const [license, setLicense] = useState(
    props?.route?.params?.data?.licensePlate,
  );
  const [docschedule, setDocSchedule] = useState(
    props?.route?.params?.data?.insurancedoc,
  );
  console.log('Porps?.route?.params license ===> ', props?.route?.params?.data);
  const [vehicleType, setVehicleType] = useState(
    props?.route?.params?.data?.vehicletype,
  );
  const [VehicleTypes, setVehicleTypes] = useState();
  const [brandName, setBrandName] = useState(
    props?.route?.params?.data?.brandname,
  );
  const [VinNumber, setVinNumber] = useState(props?.route?.params?.data?.VinNo);
  const [VinNo, setVinN0] = useState(props?.route?.params?.data?.VinNo);

  const [vehicleName, setVehicleName] = useState(
    props?.route?.params?.data?.vehiclename,
  );
  const [vehicleColor, setVehicleColor] = useState(
    props?.route?.params?.data?.vehiclecolor,
  );

  const [LicensePlateNo, setLicensePlateNo] = useState(
    props?.route?.params?.data?.licenseNo,
  );
  const [VehicleTypeName, setVehicleTypeName] = useState('');

  const [imagePicker, setImagePicker] = useState(false);

  const getData = async () => {
    try {
      const tempData = VehicleTypesfromReducer.map(val => {
        return {label: val?.name, value: val?.name, id: val?._id};
      });

      setVehicleTypes(tempData);
      VehicleTypesfromReducer.filter(v => {
        if (v._id == props?.route?.params?.data?.vehicletype) {
          setVehicleTypeName(v?.name);
        }
      });
    } catch (err) {
      console.log('Error from get Data  ==>', err);
    }
  };

  console.log('Vehicle Types =======>', VehicleTypes);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  license.forEach(a => {
    if (a?.name) {
      console.log('A =====>', a);
      //  a?.name,
      // a?.type,
      //  a?.uri,
    }
  });

  const handleUpdateBtn = async () => {
    if (vehicleType == false) {
      return showToast('Please Select vehicle Type');
    }
    if (brandName == '') {
      return showToast('Enter Your Brand Name');
    }
    if (vehicleName == '') {
      return showToast('Enter Your vehicle Name');
    }
    if (vehicleColor == '') {
      return showToast('please Enter Vehicle Color');
    }
    if (LicensePlateNo == '') {
      return showToast('please Enter License Plate No');
    }
    if (VinNumber == '') {
      return showToast('please Enter your Vin Number');
    }

    if (!license) {
      return showToast('please Upload Your license');
    }

    if (imagePicker) {
      console.log('license =====>', license);

      const userLicenseImage = {
        name: license[0]?.name,
        type: license[0]?.type,
        uri: license[0]?.uri,
      };

      const insuranceDocImage = {
        name: docschedule[0]?.fileName,
        type: docschedule[0]?.type,
        uri: docschedule[0]?.uri,
      };

      console.log('Body license =========> ', license);
      const body = {
        id: id,
        vehicletype: vehicleType,
        vehiclename: vehicleName,
        brandname: brandName,
        vehiclecolor: vehicleColor,
        licenseNo: LicensePlateNo,
        // license_plate: userLicenseImage,
        VinNo: VinNumber,
        // doc_schedule: insuranceDocImage,
      };
      // To be used Later!!!!

      // license.forEach((element, index) => {
      //   body[`license_plate[${index}]`] = element;
      // });
      // insuranceDocImage.forEach((element, index) => {
      //   body[`doc_schedule[${index}]`] = element;
      // });
      console.log('Body ============>', body);
      try {
        const response = await dispatch(EditVehicleInfo(body));

        props.navigation.goBack();
      } catch (err) {
        console.log('Body Error from Edit Vehicle ==>', err);
        showToast(err);
      }
    } else {
      const body = {
        vehicletype: vehicleType,
        vehiclename: vehicleName,
        brandname: brandName,
        vehiclecolor: vehicleColor,
        licenseNo: LicensePlateNo,
        VinNo: VinNumber,
        id: id,
      };
      console.log('Body in else from Edit Vehicle ==>', body);

      console.log('Data from Edit vehicle Body -=-=-->', body);
      try {
        const response = await dispatch(EditVehicleInfo(body));

        props.navigation.goBack();
      } catch (err) {
        showToast(err);
      }
    }
  };
  const ImagePick = () => {
    // DocumentPicker.pick({
    //   allowMultiSelection: true,
    // })
    //   .then(file => {
    //     // setLicense(license.push(file[0]))
    //     const licenseClone = [...license];
    //     // license.push(file[0])
    //     licenseClone.push(file[0]);
    //     setLicense(licenseClone);
    //     setImagePicker(true);
    //   })
    //   .catch(e => {
    //     showToast(e);
    //     setImagePicker(false);
    //   });
  };
  console.log(license);

  const InsuranceImagePick = () => {
    // DocumentPicker.pick({
    //   allowMultiSelection: true,
    // })
    //   .then(file => {
    //     // setLicense(license.push(file[0]))
    //     const docscheduleClone = [...docschedule];
    //     // license.push(file[0])
    //     docscheduleClone.push(file[0]);

    //     setDocSchedule(docscheduleClone);
    //     setImagePicker(true);
    //   })
    //   .catch(e => {
    //     showToast(e);
    //     setImagePicker(false);
    //   });
  };
  console.log('Licence ===>', license);
  const DropDownRefHobby = useRef();
  const showHobbyPicker = () => {
    if (DropDownRefHobby) {
      DropDownRefHobby.current.show(
        'label',
        VehicleTypes,
        'Select Category',
        data => {
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
  const handleDelete = i => {
    console.log('b ==> ', i);

    // const imagesClone = [...license];
    // license.splice(i, 1);
    // setLicense(imagesClone);

    // setLicense(license.filter((a) =>{
    // reta?.uri == b?.uri
    // }))
    const c = license.filter((a, c) => {
      return c != i;
    });
    console.log('C ===>', c);

    setLicense(c);
  };
  const handleinsuranceDelete = i => {
    console.log('b ==> ', i);

    // const imagesClone = [...license];
    // license.splice(i, 1);
    // setLicense(imagesClone);

    // setLicense(license.filter((a) =>{
    // reta?.uri == b?.uri
    // }))
    const c = docschedule.filter((a, c) => {
      return c != i;
    });
    console.log('C ===>', c);

    setDocSchedule(c);
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <GilroyMedium style={styles.vehicleTypeLabel}>
          Vehicle Type*
        </GilroyMedium>

        <Ripple
          style={styles.vehicleTypeContainer}
          onPress={() => showHobbyPicker()}>
          <GilroyRegular style={styles.vehicleTypeText}>
            {VehicleTypes ? VehicleTypeName : 'Vehicle Type'}
          </GilroyRegular>
          <Image
            source={icons.arrowDown}
            style={[styles.leftIcon]}
            resizeMode="contain"
          />
        </Ripple>

        <TextInput
          title="Brand Name"
          placeholder={'Enter Brand Name'}
          labelStyle={styles.labelStyle}
          value={brandName}
          onChangeText={setBrandName}
        />
        <TextInput
          title="Vehicle Name"
          placeholder={'Enter Vehicle Name'}
          value={vehicleName}
          labelStyle={styles.labelStyle}
          onChangeText={setVehicleName}
        />
        <TextInput
          title="Vehicle Color"
          placeholder="Enter Vehicle Color"
          value={vehicleColor}
          labelStyle={styles.labelStyle}
          onChangeText={setVehicleColor}
        />
        <TextInput
          Key="vin"
          title="VIN Number*"
          placeholder={'Enter VIN Number'}
          value={VinNo.toString()}
          labelStyle={styles.labelStyle}
          onChangeText={setVinNumber}
        />
        <TextInput
          title="License Plate No."
          placeholder={'Enter License Plate No.'}
          value={LicensePlateNo}
          labelStyle={styles.labelStyle}
          onChangeText={setLicensePlateNo}
        />

        <GilroyMedium style={styles.vehicleTypeLabel}>License</GilroyMedium>
        {imagePicker ? (
          <EditImageUpload
            title={'Upload License'}
            description={'PDF, JPG (max 3MB)'}
            image={license}
            imagePicker={imagePicker}
            setImage={setLicense}
            UploadPress={ImagePick}
            DeletePress={handleDelete}
            // imageContainer={{ height: '90%', width: '90%' }}
            // certificateImage={{ height: '60%', width: '100%', borderRadius: vh * 2 }}
          />
        ) : (
          <EditImageUpload
            title={'Upload License'}
            description={'PDF, JPG (max 3MB)'}
            image={license}
            setImage={setLicense}
            imagePicker={imagePicker}
            UploadPress={ImagePick}
            DeletePress={handleDelete}
            // certificateImage={{ height: '100%', width: '100%', borderRadius: vh * 2 }}
            // imageContainer={{ height: '90%', width: '90%' }}
          />
        )}
        <GilroyMedium style={styles.vehicleTypeLabel}>
          Insurance Doc
        </GilroyMedium>
        {imagePicker ? (
          <EditImageUpload
            title={'Upload License'}
            description={'PDF, JPG (max 3MB)'}
            image={docschedule}
            imagePicker={imagePicker}
            setImage={setLicense}
            UploadPress={InsuranceImagePick}
            DeletePress={handleinsuranceDelete}
            // imageContainer={{ height: '90%', width: '90%' }}
            // certificateImage={{ height: '60%', width: '100%', borderRadius: vh * 2 }}
          />
        ) : (
          <EditImageUpload
            title={'Upload License'}
            description={'PDF, JPG (max 3MB)'}
            image={docschedule}
            setImage={setDocSchedule}
            imagePicker={imagePicker}
            UploadPress={InsuranceImagePick}
            DeletePress={handleinsuranceDelete}
            // certificateImage={{ height: '100%', width: '100%', borderRadius: vh * 2 }}
            // imageContainer={{ height: '90%', width: '90%' }}
          />
        )}
        <Button
          style={styles.buttonStyle}
          text="Save"
          onPress={handleUpdateBtn}
        />

        <GeneralModal //screen 7
          reference={updateRef}
          icon={icons.tickModal}
          text2={'Vehicle Details have been updated.'}
          text2Style={{height: null, fontSize: 1.9 * vh}}
          smallMainIconStyle
        />
      </KeyboardAwareScrollView>
      <DropDown ref={DropDownRefHobby} />
    </View>
  );
};

export default EditVehicleDetails;
