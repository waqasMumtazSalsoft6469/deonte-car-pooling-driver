import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { Text, ImageBackground, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { step1 } from 'react-native/Libraries/Animated/Easing';
import { icons, images } from '../../../assets';
import Button from '../../../components/Button';
import ImageUpload from '../../../components/ImageUpload';
import TextInput from '../../../components/TextInput';
import { pick, pickMultiple } from '@react-native-documents/picker';
import ImageCropPicker from '../../../components/ImageCropPicker';
import { BlobUtil } from 'react-native-blob-util';
import GeneralModal from '../../../popups/GeneralModal';
import Ripple from '../../../components/Wrappers/Ripple';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import { styles } from './styles';
import vh from '../../../utils/units/vh';
import DropDown from '../../../components/Dropdown';
// import ImagePicker from '../../../components/ImagePicker';
import { showToast } from '../../../Api/HelperFunction';
import { useDispatch } from 'react-redux';
import {
  getVehicleTypes,
  vehicleRegister,
} from '../../../Redux/Actions/registerVechicle';
import { useFocusEffect } from '@react-navigation/native';

const RegisterVehicle = props => {
  const dispatch = useDispatch();
  const [license, setLicense] = useState([]);

  // Helper function to convert content:// URIs to file:// paths
  const convertToFileUri = async (uri) => {
    try {
      // If it's already a file:// URI, return it
      if (uri && uri.startsWith('file://')) {
        console.log('URI is already file://, returning as-is:', uri);
        return uri;
      }
      
      // If it's a content:// URI, copy it to cache directory
      if (uri && uri.startsWith('content://')) {
        console.log('Converting content:// URI to file:// path:', uri);
        const cacheDir = BlobUtil.fs.dirs.CacheDir;
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const filePath = `${cacheDir}/document_${timestamp}_${randomId}.tmp`;
        
        console.log('Target file path:', filePath);
        
        try {
          // Method 1: Try using BlobUtil.fs.copyFile (best for content URIs on Android)
          console.log('Attempting Method 1: BlobUtil.fs.copyFile()');
          await BlobUtil.fs.copyFile(uri, filePath);
          
          // Verify file was copied
          const exists = await BlobUtil.fs.exists(filePath);
          if (!exists) {
            throw new Error('File was not copied successfully');
          }
          
          const fileUri = `file://${filePath}`;
          console.log('File copied successfully using BlobUtil.fs.copyFile:', fileUri);
          return fileUri;
        } catch (copyError) {
          console.log('BlobUtil.fs.copyFile failed, trying BlobUtil.config().fetch():', copyError);
          console.log('Copy error details:', copyError.message, copyError.stack);
          
          try {
            // Method 2: Try using BlobUtil.config and fetch to download the content URI
            console.log('Attempting Method 2: BlobUtil.config().fetch()');
            const configOptions = BlobUtil.config({
              fileCache: true,
              path: filePath,
            });
            
            const response = await configOptions.fetch('GET', uri);
            const downloadedPath = response.path();
            console.log('Downloaded file path:', downloadedPath);
            
            if (downloadedPath) {
              const fileUri = downloadedPath.startsWith('file://') ? downloadedPath : `file://${downloadedPath}`;
              console.log('File downloaded successfully using BlobUtil.fetch:', fileUri);
              return fileUri;
            } else {
              throw new Error('No path returned from BlobUtil.fetch');
            }
          } catch (fetchError) {
            console.log('BlobUtil.fetch also failed, trying BlobUtil.fs.readFile:', fetchError);
            console.log('Fetch error details:', fetchError.message, fetchError.stack);
            
            try {
              // Method 3: Try using BlobUtil.fs.readFile directly
              console.log('Attempting Method 3: BlobUtil.fs.readFile()');
              const base64 = await BlobUtil.fs.readFile(uri, 'base64');
              console.log('File read successfully, size:', base64 ? base64.length : 0);
              
              if (!base64 || base64.length === 0) {
                throw new Error('Empty file read from content URI');
              }
              
              await BlobUtil.fs.writeFile(filePath, base64, 'base64');
              console.log('File written successfully to:', filePath);
              
              // Verify file was written
              const exists = await BlobUtil.fs.exists(filePath);
              if (!exists) {
                throw new Error('File was not written successfully');
              }
              
              const fileUri = `file://${filePath}`;
              console.log('Converted URI:', fileUri);
              return fileUri;
            } catch (readError) {
              console.log('All methods failed:', readError);
              console.log('Read error details:', readError.message, readError.stack);
              throw readError;
            }
          }
        }
      }
      
      // Return original URI if it's neither content:// nor file://
      console.log('URI is neither file:// nor content://, returning as-is:', uri);
      return uri;
    } catch (error) {
      console.log('Error converting URI to file path:', error);
      console.log('Error details:', error.message, error.stack);
      // Return original URI on error
      return uri;
    }
  };
  const [document, setDocuments] = useState(false);
  const [steps, setSteps] = useState(0);
  const [vehicleType, setVehicleType] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [licensePlateNo, setLicensePlateNo] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [VehicleTypeName, setVehicleTypeName] = useState('')

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
        return { label: val?.name, value: val?.name, id: val?._id };
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

    // Use fileCopyUri for FormData (it's the file path after copying to cache)
    // fileCopyUri is a file:// path that FormData can read
    // Prefer fileCopyUri > uri > path (in order of preference for FormData)
    console.log('License raw data:', JSON.stringify(license[0], null, 2));
    console.log('Document raw data:', JSON.stringify(document[0], null, 2));
    
    // Get the URIs from state
    let licenseUri = license[0]?.uri || license[0]?.fileCopyUri || license[0]?.path;
    let documentUri = document[0]?.uri || document[0]?.fileCopyUri || document[0]?.path;
    
    console.log('License URI before conversion:', licenseUri);
    console.log('Document URI before conversion:', documentUri);
    
    // Safety check: If URIs are still content://, convert them now
    if (licenseUri && licenseUri.startsWith('content://')) {
      console.log('Converting license URI from content:// to file://');
      try {
        const convertedLicenseUri = await convertToFileUri(licenseUri);
        if (convertedLicenseUri && convertedLicenseUri.startsWith('file://')) {
          licenseUri = convertedLicenseUri;
          console.log('License URI after conversion:', licenseUri);
        } else {
          console.error('License URI conversion failed - still content://:', convertedLicenseUri);
          showToast('Failed to process license file. Please try again.', 'error');
          return;
        }
      } catch (error) {
        console.error('Error converting license URI:', error);
        showToast('Failed to process license file. Please try again.', 'error');
        return;
      }
    }
    
    if (documentUri && documentUri.startsWith('content://')) {
      console.log('Converting document URI from content:// to file://');
      try {
        const convertedDocumentUri = await convertToFileUri(documentUri);
        if (convertedDocumentUri && convertedDocumentUri.startsWith('file://')) {
          documentUri = convertedDocumentUri;
          console.log('Document URI after conversion:', documentUri);
        } else {
          console.error('Document URI conversion failed - still content://:', convertedDocumentUri);
          showToast('Failed to process document file. Please try again.', 'error');
          return;
        }
      } catch (error) {
        console.error('Error converting document URI:', error);
        showToast('Failed to process document file. Please try again.', 'error');
        return;
      }
    }
    
    // Build the image objects with converted URIs
    const license_Image = {
      uri: licenseUri, // Should be file:// path now
      type: license[0]?.type || license[0]?.mimeType || 'application/pdf',
      name: license[0]?.name || license[0]?.filename || 'license.pdf',
    };
    const document_Image = {
      uri: documentUri, // Should be file:// path now
      type: document[0]?.type || document[0]?.mimeType || 'application/pdf',
      name: document[0]?.name || document[0]?.filename || 'document.pdf',
    };
    
    console.log('License Image formatted:', JSON.stringify(license_Image, null, 2));
    console.log('Document Image formatted:', JSON.stringify(document_Image, null, 2));
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
    try {
      // Use DocumentPicker for license to support PDF files
      // Try without type filter to allow all files
      const response = await pick({
        copyTo: 'cachesDirectory',
      });
      
      if (response && response.length > 0) {
        // Format the response to match expected structure
        const formattedResponse = Array.isArray(response) ? response : [response];
        
        // Process files and convert content:// URIs to file:// paths
        const formattedFiles = await Promise.all(
          formattedResponse.map(async (file) => {
            console.log('License file response:', JSON.stringify(file, null, 2));
            // Get the original URI (fileCopyUri is preferred, fallback to uri or path)
            const originalUri = file.fileCopyUri || file.uri || file.path;
            console.log('License file original URI:', originalUri);
            
            // Convert content:// URI to file:// path if needed
            let fileUri = originalUri;
            if (originalUri && originalUri.startsWith('content://')) {
              try {
                fileUri = await convertToFileUri(originalUri);
                console.log('License file converted URI:', fileUri);
                
                // Verify conversion was successful
                if (!fileUri || !fileUri.startsWith('file://')) {
                  console.error('License URI conversion failed - still content://:', fileUri);
                  showToast('Failed to process license file. Please try again.', 'error');
                  throw new Error('Failed to convert content URI to file URI');
                }
              } catch (error) {
                console.error('Error converting license URI:', error);
                showToast('Failed to process license file. Please try again.', 'error');
                throw error;
              }
            }
            
            return {
              uri: fileUri, // Use converted file:// path
              path: fileUri, // Use converted file:// path
              type: file.mimeType || file.type || 'application/pdf',
              name: file.name || file.filename || 'license.pdf',
              size: file.size || 0,
              fileCopyUri: fileUri, // Store converted URI for FormData
            };
          })
        );
        
        setLicense(formattedFiles);
        showToast('License document selected successfully', 'success');
      }
    } catch (err) {
      // Ignore cancellation errors
      if (err.code !== 'DOCUMENT_PICKER_CANCELED' && err.message !== 'User canceled document picker') {
        console.log('ImagePick Error:', err);
        showToast(err.message || 'Error selecting license document', 'error');
      }
    }
  };
  const ImagePickDocument = async () => {
    try {
      // Use DocumentPicker for insurance document to support PDF files
      // Try without type filter to allow all files
      const response = await pick({
        copyTo: 'cachesDirectory',
      });
      
      if (response && response.length > 0) {
        // Format the response to match expected structure
        const formattedResponse = Array.isArray(response) ? response : [response];
        
        // Process files and convert content:// URIs to file:// paths
        const formattedFiles = await Promise.all(
          formattedResponse.map(async (file) => {
            console.log('Document file response:', JSON.stringify(file, null, 2));
            // Get the original URI (fileCopyUri is preferred, fallback to uri or path)
            const originalUri = file.fileCopyUri || file.uri || file.path;
            console.log('Document file original URI:', originalUri);
            
            // Convert content:// URI to file:// path if needed
            let fileUri = originalUri;
            if (originalUri && originalUri.startsWith('content://')) {
              try {
                fileUri = await convertToFileUri(originalUri);
                console.log('Document file converted URI:', fileUri);
                
                // Verify conversion was successful
                if (!fileUri || !fileUri.startsWith('file://')) {
                  console.error('Document URI conversion failed - still content://:', fileUri);
                  showToast('Failed to process document file. Please try again.', 'error');
                  throw new Error('Failed to convert content URI to file URI');
                }
              } catch (error) {
                console.error('Error converting document URI:', error);
                showToast('Failed to process document file. Please try again.', 'error');
                throw error;
              }
            }
            
            return {
              uri: fileUri, // Use converted file:// path
              path: fileUri, // Use converted file:// path
              type: file.mimeType || file.type || 'application/pdf',
              name: file.name || file.filename || 'document.pdf',
              size: file.size || 0,
              fileCopyUri: fileUri, // Store converted URI for FormData
            };
          })
        );
        
        setDocuments(formattedFiles);
        showToast('Insurance document selected successfully', 'success');
      }
    } catch (err) {
      // Ignore cancellation errors
      if (err.code !== 'DOCUMENT_PICKER_CANCELED' && err.message !== 'User canceled document picker') {
        console.log('ImagePickDocument Error:', err);
        showToast(err.message || 'Error selecting insurance document', 'error');
      }
    }
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
          console.log("Response from Get Vehicle Types data", data);
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
        reference={vehicleNameRef}
        title="Vehicle Name*"
        placeholder="Vehicle Name"
        onChangeText={text => setVehicleName(text)}
        onSubmitEditing={() => vehicleColorRef.current.focus()}

      />
      <TextInput
        reference={vehicleColorRef}
        title="Vehicle Color*"
        placeholder="Vehicle Color"
        onChangeText={text => setVehicleColor(text)}
        onSubmitEditing={() => licensePlateNoRef.current.focus()}

      />
      <TextInput
        reference={licensePlateNoRef}
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
        title={'Upload Insurance Document'}
        description={'PDF, JPG (max 10MB)'}
        image={document}
        setImage={setDocuments}
        onPress={ImagePickDocument}
        certificateImage={{ height: '100%', width: '100%', borderRadius: vh * 2 }}
        uploadBoxStyle={{}}
        imageContainer={{ height: '90%', width: '90%' }}
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
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {renderItem()}
      </KeyboardAwareScrollView>
      <DropDown ref={DropDownRefHobby} />
    </View>
  );
};
export default RegisterVehicle;
