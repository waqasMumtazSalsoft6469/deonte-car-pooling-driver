import React, {useCallback, useRef, useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {images} from '../../../assets';
import {styles} from './styles';
import Button from '../../../components/Button';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import GeneralModal from '../../../popups/GeneralModal';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import vh from '../../../utils/units/vh';
import {useFocusEffect} from '@react-navigation/native';
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
  const [vehicletype, setVehicletype] = useState();
  const [pdfError, setPdfError] = useState(false);
  
  // const id = useSelector(state => state.UserReducer.profile._id);
  const RiderDetail = useSelector(state => state.SessionReducer.riderinfo);
  const VehicleTypesfromReducer = useSelector(state => state.vehicleReducer.vehicleTypes);

  // console.log("RiderDetail ========>",RiderDetail?.drivervehicletype);
  console.log('Details ==>', details);

  const deleteVehicle = useRef();

  // Helper function to check if file is PDF
  const isPDFFile = (fileUrl) => {
    if (!fileUrl) return false;
    const url = fileUrl.toLowerCase();
    return url.endsWith('.pdf') || url.includes('.pdf');
  };
  const getData = async () => {
    if (RiderDetail?.drivervehicletype?._id) {
      try {
        // Reset PDF error state when fetching new data
        setPdfError(false);
        
        const response = await dispatch(getVehicleInfo(RiderDetail?.drivervehicletype?._id));
        setDetails(response?.vehicle);
        
        VehicleTypesfromReducer.filter((v) => {
          if(v._id == response?.vehicle?.vehicletype){
            setVehicletype(v?.name);
          }
        });
      } catch (err) {
        console.log("Error from get Data ====>", err);
        showToast('Failed to load vehicle information');
      }
    } else {
      showToast('No Vehicle Registered ');
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const handleDeleteVehicle = async () => {
    try {
      const response = await dispatch(
        deleteVehicleAction(RiderDetail?.drivervehicletype?._id),
      );
      
      showToast(response?.message);
      props.navigation.goBack();
    } catch (err) {
      console.error('[MyVehicle] Error deleting vehicle:', err);
      showToast('Failed to delete vehicle');
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {details ? (
        <>
          <View style={styles.VehicleTypecontainer}>
            <View style={styles.fieldContainer}>
              <GilroyRegular style={styles.vehicleTitle}>
                Vehicle Type
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue} numberOfLines={1} ellipsizeMode="tail">
                {vehicletype || 'N/A'}
              </GilroyMedium>
            </View>
            <View style={styles.fieldContainer}>
              <GilroyRegular style={styles.vehicleTitle}>
                Brand Name
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue} numberOfLines={1} ellipsizeMode="tail">
                {details?.brandname || 'N/A'}
              </GilroyMedium>
            </View>
          </View>
          <View style={styles.VehicleTypecontainer}>
            <View style={styles.fieldContainer}>
              <GilroyRegular style={styles.vehicleTitle}>
                Vehicle Name
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue} numberOfLines={1} ellipsizeMode="tail">
                {details?.vehiclename || 'N/A'}
              </GilroyMedium>
            </View>
            <View style={styles.fieldContainer}>
              <GilroyRegular style={styles.vehicleTitle}>
                Vehicle Color
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue} numberOfLines={1} ellipsizeMode="tail">
                {details?.vehiclecolor || 'N/A'}
              </GilroyMedium>
            </View>
          </View>
          <View style={styles.VehicleTypecontainer}>
            <View style={styles.fieldContainer}>
              <GilroyRegular style={styles.vehicleTitle}>
                VIN Number
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue} numberOfLines={1} ellipsizeMode="tail">
                {details?.VinNo || 'N/A'}
              </GilroyMedium>
            </View>
            <View style={styles.fieldContainer}>
              <GilroyRegular style={styles.vehicleTitle}>
                License plate Number
              </GilroyRegular>
              <GilroyMedium style={styles.vehicleValue} numberOfLines={1} ellipsizeMode="tail">
                {details?.licenseNo || 'N/A'}
              </GilroyMedium>
            </View>
          </View>
          <View style={styles.documentContainer}>
            <GilroyBold style={styles.documentsTitle}>Documents</GilroyBold>
            <View style={styles.certificateImageContainer}>
              {/* License Plate Image */}
              {details?.licensePlate && (() => {
                const licensePlateUrl = image_url + details.licensePlate;
                const hasValidLicenseUrl = licensePlateUrl && 
                                         licensePlateUrl.trim() !== '' && 
                                         licensePlateUrl !== image_url;
                
                console.log('[MyVehicle] License Plate URL:', licensePlateUrl);
                console.log('[MyVehicle] Has valid license URL?', hasValidLicenseUrl);
                
                if (!hasValidLicenseUrl) {
                  console.warn('[MyVehicle] ⚠️ Invalid license plate URL, skipping render');
                  return null;
                }
                
                return (
                  <View style={styles.documentItem}>
                    <GilroyRegular style={styles.documentLabel}>
                      License Plate
                    </GilroyRegular>
                    <Image
                      source={{uri: licensePlateUrl}}
                      style={styles.certificateImage}
                      resizeMode="cover"
                      defaultSource={images.uploadImage}
                      onError={(error) => {
                        console.error('[MyVehicle] ❌ Error loading license plate image:', error);
                        console.error('[MyVehicle] Failed URL:', licensePlateUrl);
                        // Don't show toast - just log the error
                      }}
                      onLoad={() => {
                        console.log('[MyVehicle] ✅ License plate image loaded successfully');
                      }}
                    />
                  </View>
                );
              })()}
              
              {/* Insurance Document - PDF or Image */}
              {details?.insurancedoc && (() => {
                const insuranceUrl = image_url + details.insurancedoc;
                const hasValidInsuranceUrl = insuranceUrl && 
                                            insuranceUrl.trim() !== '' && 
                                            insuranceUrl !== image_url;
                
                console.log('[MyVehicle] Insurance document URL:', insuranceUrl);
                console.log('[MyVehicle] Has valid insurance URL?', hasValidInsuranceUrl);
                
                if (!hasValidInsuranceUrl) {
                  console.warn('[MyVehicle] ⚠️ Invalid insurance document URL, skipping render');
                  return null;
                }
                
                const isPDF = isPDFFile(insuranceUrl);
                console.log('[MyVehicle] Is PDF?', isPDF);
                
                return (
                  <View style={styles.documentItem}>
                    <GilroyRegular style={styles.documentLabel}>
                      Insurance Document
                    </GilroyRegular>
                    {(() => {
                      // Check if it's actually a PDF file and hasn't errored
                      if (isPDF && !pdfError) {
                        // Render as PDF
                        return (
                          <View style={styles.pdfContainer}>
                            <Pdf
                              trustAllCerts={false}
                              source={{
                                uri: insuranceUrl,
                                cache: true,
                              }}
                              onLoadComplete={(numberOfPages) => {
                                console.log('[MyVehicle] ✅ PDF loaded successfully, pages:', numberOfPages);
                                setPdfError(false);
                              }}
                              onLoadProgress={(percent) => {
                                console.log('[MyVehicle] PDF loading progress:', percent);
                              }}
                              onError={(error) => {
                                console.error('[MyVehicle] ❌ PDF Error:', error);
                                console.error('[MyVehicle] PDF Error details:', {
                                  message: error?.message || error,
                                  description: error?.description,
                                  fullError: error,
                                });
                                // Set error state to trigger fallback to image
                                setPdfError(true);
                                // Don't show toast - will fallback to image
                              }}
                              style={styles.pdfStyle}
                            />
                          </View>
                        );
                      } else {
                        // Render as Image (either it's not a PDF or PDF failed to load)
                        return (
                          <Image
                            source={{uri: insuranceUrl}}
                            style={styles.certificateImage}
                            resizeMode="cover"
                            defaultSource={images.uploadImage}
                            onError={(error) => {
                              console.error('[MyVehicle] ❌ Error loading insurance image:', error);
                              console.error('[MyVehicle] Failed URL:', insuranceUrl);
                              // Don't show toast - just log the error and use defaultSource
                            }}
                            onLoad={() => {
                              console.log('[MyVehicle] ✅ Insurance image loaded successfully');
                            }}
                          />
                        );
                      }
                    })()}
                  </View>
                );
              })()}
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
    </ScrollView>
  );
};
export default MyVehicle;
