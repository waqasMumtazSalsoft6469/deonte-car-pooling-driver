import React, {useCallback, useRef, useState} from 'react';
import {Text, View, FlatList, Image, Dimensions} from 'react-native';
import {icons, images} from '../../../assets';
import {styles} from './styles';
import Button from '../../../components/Button';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import GeneralModal from '../../../popups/GeneralModal';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import vh from '../../../utils/units/vh';
import {useFocusEffect} from '@react-navigation/native';
import {
  getLocalizedString,
  getLocale,
  getTranslatedMessage,
} from '../../../Translations';
import {
  getVehicleInfo,
  deleteVehicleAction,
} from '../../../Redux/Actions/registerVechicle';
import {useDispatch, useSelector} from 'react-redux';
import Pdf from 'react-native-pdf';
import {showToast} from '../../../Api/HelperFunction';
import {image_url} from '../../../Api/configs';
import vw from '../../../utils/units/vw';
const MyVehicle = props => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  const [vehicletype, setVehicletype] = useState()
  // const id = useSelector(state => state.UserReducer.profile._id);
  const RiderDetail = useSelector(state => state.SessionReducer.riderinfo);
  const VehicleTypesfromReducer = useSelector(state => state.vehicleReducer.vehicleTypes)

  // console.log("RiderDetail ========>",RiderDetail?.drivervehicletype);
  console.log('Details ==>', details);

  const deleteVehicle = useRef();
  const vehicleDeleted = useRef();
  const registerPopup = useRef();
  const getData = async () => {
    if (RiderDetail?.drivervehicletype?._id) {
      try {
        const response = await dispatch(getVehicleInfo(RiderDetail?.drivervehicletype?._id));
        setDetails(response?.vehicle);
        
         VehicleTypesfromReducer.filter((v) => {
          if(v._id == response?.vehicle?.vehicletype){
            setVehicletype(v?.name)
          }
        
          })
        
      } catch (err) {
        console.log("Error from get Data ====>",err);
      }
    } else {
      showToast('No Vehicle Registered ');
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  const source = {
    uri: `${image_url + details?.insurancedoc}`,
    cache: true,
  };

  const handleDeleteVehicle = async () => {
    try {
      const response = await dispatch(
        deleteVehicleAction(RiderDetail?.drivervehicletype?._id),
      );
      
      showToast(response?.message);
      props.navigation.goBack();
    } catch (err) {}
  };

  const RenderImage = ({item}) => {
    // console.log('IN renderImaege', item);
    const source = {
      uri: `${image_url + item}`,
      cache: true,
    };



    return (
      <View style={styles.certificateImageContainer}>
        {/* <Image
          source={{uri: image_url + details?.licensePlate}}
          style={styles.certificateImage}
        /> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Pdf
            trustAllCerts={false}
            source={source}
            onLoadComplete={() => console.log('onLoading Complete')}
            onError={error => {
              console.log('Error ghgfhgfhgfhfhfhf ==>', error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              // backgroundColor: 'red',
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {details ? (
        <>
          <View style={styles.VehicleTypecontainer}>
            <View>
              <GilroyRegular style={styles.vehicleTitle}>
                Vehicle Type
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue} numberOfLines={1}>
                {vehicletype}
              </GilroyMedium>
            </View>
            <View style={styles.brandContainer}>
              <GilroyRegular style={styles.vehicleTitle}>
                Brand Name
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue}>
                {details?.brandname}
              </GilroyMedium>
            </View>
          </View>
          <View style={styles.VehicleTypecontainer}>
            <View>
              <GilroyRegular style={styles.vehicleTitle}>
                Vehicle Name
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue}>
                {details?.vehiclename}
              </GilroyMedium>
            </View>
            <View style={styles.colorContainer}>
              <GilroyRegular style={styles.vehicleTitle}>
                Vehicle Color
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue}>
                {details?.vehiclecolor}
              </GilroyMedium>
            </View>
          </View>
          <View style={styles.VehicleTypecontainer}>
            <View>
              <GilroyRegular style={styles.vehicleTitle}>
                VIN Number
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue}>
                {details?.VinNo}
              </GilroyMedium>
            </View>
            <View style={{ marginRight: vh * 2.6}}>
              <GilroyRegular style={styles.vehicleTitle}>
                License plate Number
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue}>
                {details?.licenseNo}
              </GilroyMedium>
            </View>
          </View>
          <View style={styles.documentContainer}>
            <GilroyBold style={styles.documentsTitle}>Documents</GilroyBold>

            {/* <FlatList
          key={'_'}
          showsVerticalScrollIndicator={false}
          data={[details?.insurancedoc]}
          columnWrapperStyle={styles.vehicleDetailContainer}
          numColumns={2}
          renderItem={RenderImage}
        /> */}
            <View style={styles.certificateImageContainer}>
              <Image
                source={{uri: image_url + details?.licensePlate}}
                style={styles.certificateImage}
              />
              <Pdf
                trustAllCerts={false}
                source={{
                  uri: image_url + details?.insurancedoc,
                }}
                onLoadComplete={() => console.log('onLoading Complete')}
                onError={error => {
                  showToast(error)
                }}
                style={{height: vh * 20, width: vw * 30}}
              />
            </View>
          </View>
          <Button
            text="Edit Details"
            style={styles.yesBtnStyle}
            onPress={() =>
              props.navigation.navigate('EditVehicleDetails', {
                data: details,
                vehicleId: RiderDetail?.drivervehicletype,
              })
            }
          />
          <Button
            image
            text="Delete Vehicle"
            style={styles.noBtnStyle}
            textStyle={styles.noBtnText}
            onPress={() => deleteVehicle.current.show()}
          />
          <GeneralModal //screen 7
            reference={deleteVehicle}
            icon={images.exclamationMark}
            text2={'Are you sure you wish to delete your\nvehicle details?'}
            text2Style={styles.text2style}
            button1Text={'Yes'}
            onButton1Press={() => {
              handleDeleteVehicle();
            }}
            button2Text={'No'}
          />
          <GeneralModal
            reference={vehicleDeleted}
            icon={icons.tickModal}
            text2={'Vehicle Details have been deleted.'}
            text2Style={{height: null, fontSize: 1.9 * vh}}
            smallMainIconStyle
          />
          <GeneralModal //screen 7
            reference={registerPopup}
            icon={images.exclamationMark}
            text2={
              'You need to register your vehicle again in\norder to continue as a driver.'
            }
            text2Style={styles.text2style}
            button1Text={'Register'}
            button1Style={styles.registerButton}
            onButton1Press={() => {
              props.navigation.navigate('RegisterVehicle');
            }}
          />
        </>
      ) : (
        <View style={styles.registerButtonContainer}>
          <GilroyMedium style={styles?.textStyle}>NO Vehicle Registered</GilroyMedium>
          <Button
            text="Register Vehicle"
            style={styles.buttonStyle}
            textStyle={styles.buttonText}
            onPress={() => props.navigation.navigate("RegisterVehicle")}
          />
        </View>
      )}
    </View>
  );
};
export default MyVehicle;
