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
  const convertToFileUri = async (uri, originalFileName = '') => {
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
        
        // Preserve file extension if available
        let fileExtension = '.tmp';
        if (originalFileName) {
          const extMatch = originalFileName.match(/\.([a-zA-Z0-9]+)$/);
          if (extMatch) {
            fileExtension = '.' + extMatch[1].toLowerCase();
          }
        }
        
        const filePath = `${cacheDir}/document_${timestamp}_${randomId}${fileExtension}`;
        
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
              console.log('All conversion methods failed, returning original URI:', readError);
              // Return original URI instead of throwing - let it be handled by the caller
              return uri;
            }
          }
        }
      }
      
      // Return original URI if it's neither content:// nor file://
      console.log('URI is neither file:// nor content://, returning as-is:', uri);
      return uri;
    } catch (error) {
      console.log('Error converting URI to file path:', error);
      // Return original URI on error instead of throwing
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
  const [VehicleTypeName, setVehicleTypeName] = useState('');

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
      const tempData = response?.vehicle?.map(val => {
        return { label: val?.name, value: val?.name, id: val?._id };
      });
      console.log('Response from Get Vehicle Types tempData ==>', tempData);

      // Only update if we have valid data
      if (tempData && tempData.length > 0) {
        setVehicleTypes(tempData);
      }
    } catch (err) {
      console.log('Error ==>', err);
      // On error, vehicleTypes will remain empty
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
        const licenseFileName = license[0]?.name || license[0]?.filename || 'license';
        const convertedLicenseUri = await convertToFileUri(licenseUri, licenseFileName);
        if (convertedLicenseUri && convertedLicenseUri.startsWith('file://')) {
          licenseUri = convertedLicenseUri;
          console.log('License URI after conversion:', licenseUri);
        } else {
          console.warn('License URI conversion may have failed - still content://:', convertedLicenseUri);
          // Don't fail completely, try to proceed with original URI
          licenseUri = convertedLicenseUri || licenseUri;
        }
      } catch (error) {
        console.error('Error converting license URI:', error);
        // Don't fail completely, use original URI
        licenseUri = licenseUri;
      }
    }
    
    if (documentUri && documentUri.startsWith('content://')) {
      console.log('Converting document URI from content:// to file://');
      try {
        const documentFileName = document[0]?.name || document[0]?.filename || 'document';
        const convertedDocumentUri = await convertToFileUri(documentUri, documentFileName);
        if (convertedDocumentUri && convertedDocumentUri.startsWith('file://')) {
          documentUri = convertedDocumentUri;
          console.log('Document URI after conversion:', documentUri);
        } else {
          console.warn('Document URI conversion may have failed - still content://:', convertedDocumentUri);
          // Don't fail completely, try to proceed with original URI
          documentUri = convertedDocumentUri || documentUri;
        }
      } catch (error) {
        console.error('Error converting document URI:', error);
        // Don't fail completely, use original URI
        documentUri = documentUri;
      }
    }
    
    // Verify files exist and are accessible
    if (licenseUri && licenseUri.startsWith('file://')) {
      const filePath = licenseUri.replace('file://', '');
      try {
        const exists = await BlobUtil.fs.exists(filePath);
        if (!exists) {
          console.error('License file does not exist at path:', filePath);
          showToast('License file not found. Please upload again.', 'error');
          return;
        }
        // Try to get file stats to verify it's readable
        try {
          const stat = await BlobUtil.fs.stat(filePath);
          console.log('License file stats:', { size: stat.size, path: filePath });
          if (stat.size === 0) {
            console.error('License file is empty');
            showToast('License file is empty. Please upload again.', 'error');
            return;
          }
        } catch (statError) {
          console.error('Error getting license file stats:', statError);
        }
      } catch (checkError) {
        console.error('Error checking license file:', checkError);
        showToast('Error verifying license file. Please upload again.', 'error');
        return;
      }
    } else if (licenseUri && licenseUri.startsWith('content://')) {
      console.warn('License URI is still content://, may cause issues:', licenseUri);
      // Try to convert one more time
      try {
        const fileName = license[0]?.name || license[0]?.filename || 'license';
        const converted = await convertToFileUri(licenseUri, fileName);
        if (converted && converted.startsWith('file://')) {
          licenseUri = converted;
          console.log('Converted license URI to file://:', licenseUri);
        }
      } catch (convertError) {
        console.error('Failed to convert license URI:', convertError);
      }
    }
    
    if (documentUri && documentUri.startsWith('file://')) {
      const filePath = documentUri.replace('file://', '');
      try {
        const exists = await BlobUtil.fs.exists(filePath);
        if (!exists) {
          console.error('Document file does not exist at path:', filePath);
          showToast('Document file not found. Please upload again.', 'error');
          return;
        }
        // Try to get file stats to verify it's readable
        try {
          const stat = await BlobUtil.fs.stat(filePath);
          console.log('Document file stats:', { size: stat.size, path: filePath });
          if (stat.size === 0) {
            console.error('Document file is empty');
            showToast('Document file is empty. Please upload again.', 'error');
            return;
          }
        } catch (statError) {
          console.error('Error getting document file stats:', statError);
        }
      } catch (checkError) {
        console.error('Error checking document file:', checkError);
        showToast('Error verifying document file. Please upload again.', 'error');
        return;
      }
    } else if (documentUri && documentUri.startsWith('content://')) {
      console.warn('Document URI is still content://, may cause issues:', documentUri);
      // Try to convert one more time
      try {
        const fileName = document[0]?.name || document[0]?.filename || 'document';
        const converted = await convertToFileUri(documentUri, fileName);
        if (converted && converted.startsWith('file://')) {
          documentUri = converted;
          console.log('Converted document URI to file://:', documentUri);
        }
      } catch (convertError) {
        console.error('Failed to convert document URI:', convertError);
      }
    }
    
    // Determine MIME type based on file extension
    const getMimeType = (uri, name, defaultType) => {
      const fileName = name || uri || '';
      const lowerName = fileName.toLowerCase();
      
      // Image types
      if (lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) {
        return 'image/jpeg';
      }
      if (lowerName.endsWith('.png')) {
        return 'image/png';
      }
      if (lowerName.endsWith('.gif')) {
        return 'image/gif';
      }
      if (lowerName.endsWith('.webp')) {
        return 'image/webp';
      }
      // PDF
      if (lowerName.endsWith('.pdf')) {
        return 'application/pdf';
      }
      
      // Use provided type or default
      return defaultType || 'application/octet-stream';
    };
    
    // Build the image objects with converted URIs
    const licenseFileName = license[0]?.name || license[0]?.filename || 'license';
    const licenseMimeType = getMimeType(
      licenseUri,
      licenseFileName,
      license[0]?.type || license[0]?.mimeType
    );
    
    const license_Image = {
      uri: licenseUri, // Should be file:// path now
      type: licenseMimeType,
      name: licenseFileName,
    };
    
    const documentFileName = document[0]?.name || document[0]?.filename || 'document';
    const documentMimeType = getMimeType(
      documentUri,
      documentFileName,
      document[0]?.type || document[0]?.mimeType
    );
    
    const document_Image = {
      uri: documentUri, // Should be file:// path now
      type: documentMimeType,
      name: documentFileName,
    };
    
    console.log('License Image formatted:', {
      uri: license_Image.uri,
      type: license_Image.type,
      name: license_Image.name,
    });
    console.log('Document Image formatted:', {
      uri: document_Image.uri,
      type: document_Image.type,
      name: document_Image.name,
    });
    
    // Build body with correct field names
    // Based on your example, both files should be doc_schedule
    // We'll send them as an array so FormData can append them multiple times
    const body = {
      vehicletype: vehicleType,
      brandname: brandName,
      vehiclename: vehicleName,
      vehiclecolor: vehicleColor,
      licenseNo: licensePlateNo,
      VinNo: vinNumber,
      // Send both files as doc_schedule - FormData will handle multiple files with same key
      doc_schedule: [license_Image, document_Image],
    };

    console.log('Sending registration body:', {
      vehicletype: body.vehicletype,
      brandname: body.brandname,
      vehiclename: body.vehiclename,
      vehiclecolor: body.vehiclecolor,
      licenseNo: body.licenseNo,
      VinNo: body.VinNo,
      license_plate: { uri: license_Image.uri, type: license_Image.type, name: license_Image.name },
      doc_schedule: { uri: document_Image.uri, type: document_Image.type, name: document_Image.name },
    });

    try {
      const response = await dispatch(vehicleRegister(body));
      console.log('Response from vehicleRegister ==>', response);
      if (response?.message) {
        showToast(response.message, 'success');
      }
      props.navigation.goBack();
    } catch (err) {
      console.error('Error from handleRegistration ==>', err);
      console.error('Error type:', typeof err);
      
      // Extract error message from different error formats
      let errorMessage = 'Failed to register vehicle. Please try again.';
      
      if (typeof err === 'string') {
        errorMessage = err;
        console.error('Error is a string:', err);
      } else if (err && typeof err === 'object') {
        console.error('Error keys:', Object.keys(err));
        
        // Check for responseText first (most useful)
        if (err.responseText || err.fullResponse) {
          const responseText = err.responseText || err.fullResponse || '';
          console.error('Server response text:', responseText);
          // Try to extract meaningful error message from HTML/text response
          if (responseText.length > 0) {
            // Show first 500 chars of server response
            const shortResponse = responseText.substring(0, 500);
            errorMessage = `Server Error: ${shortResponse}`;
            // If it looks like HTML, try to extract text content
            if (responseText.includes('<html') || responseText.includes('<!DOCTYPE')) {
              // Try to extract text between tags
              const textMatch = responseText.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || 
                               responseText.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
              if (textMatch && textMatch[1]) {
                const cleanText = textMatch[1].replace(/<[^>]+>/g, '').trim();
                if (cleanText) {
                  errorMessage = `Server Error: ${cleanText.substring(0, 200)}`;
                }
              }
            }
          }
        } else if (err.message) {
          errorMessage = err.message;
          // If it's the non-JSON response error, try to get more info
          if (err.message.includes('non-JSON response') && err.status) {
            errorMessage = `Server Error (Status ${err.status}): The server encountered an error. Check console for details.`;
          }
        } else if (err.status) {
          errorMessage = `Server error (Status: ${err.status}). Please check your files and try again.`;
        }
      }
      
      // Log full error for debugging
      console.error('Full error object:', err);
      
      showToast(errorMessage, 'error');
    }
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
            const fileName = file.name || file.filename || 'license';
            console.log('License file original URI:', originalUri);
            
            // Convert content:// URI to file:// path if needed
            let fileUri = originalUri;
            if (originalUri && originalUri.startsWith('content://')) {
              try {
                fileUri = await convertToFileUri(originalUri, fileName);
                console.log('License file converted URI:', fileUri);
                
                // Even if conversion didn't produce file://, still try to use it
                // The API might handle content:// URIs, or we can try again later
                if (!fileUri || (!fileUri.startsWith('file://') && !fileUri.startsWith('content://'))) {
                  console.warn('License URI conversion may have failed:', fileUri);
                  // Don't throw error, just warn and continue
                }
              } catch (error) {
                console.error('Error converting license URI:', error);
                // Don't throw, use original URI and let it be handled later
                fileUri = originalUri;
              }
            }
            
            return {
              uri: fileUri, // Use converted file:// path or original
              path: fileUri, // Use converted file:// path or original
              type: file.mimeType || file.type || 'application/pdf',
              name: fileName,
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
            const fileName = file.name || file.filename || 'document';
            console.log('Document file original URI:', originalUri);
            
            // Convert content:// URI to file:// path if needed
            let fileUri = originalUri;
            if (originalUri && originalUri.startsWith('content://')) {
              try {
                fileUri = await convertToFileUri(originalUri, fileName);
                console.log('Document file converted URI:', fileUri);
                
                // Even if conversion didn't produce file://, still try to use it
                // The API might handle content:// URIs, or we can try again later
                if (!fileUri || (!fileUri.startsWith('file://') && !fileUri.startsWith('content://'))) {
                  console.warn('Document URI conversion may have failed:', fileUri);
                  // Don't throw error, just warn and continue
                }
              } catch (error) {
                console.error('Error converting document URI:', error);
                // Don't throw, use original URI and let it be handled later
                fileUri = originalUri;
              }
            }
            
            return {
              uri: fileUri, // Use converted file:// path or original
              path: fileUri, // Use converted file:// path or original
              type: file.mimeType || file.type || 'application/pdf',
              name: fileName,
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
    if (DropDownRefHobby.current) {
      // Only show modal if we have API data
      if (!vehicleTypes || vehicleTypes.length === 0) {
        showToast('Vehicle types are loading. Please wait...', 'error');
        return;
      }
      
      DropDownRefHobby.current.show(
        'label',
        vehicleTypes,
        'Select Vehicle Type',
        data => {
          if (!data || !data.id) {
            return;
          }
          console.log('Response from Get Vehicle Types data', data);
          setVehicleType(data.id);
          setVehicleTypeName(data.value);
        },
        null,
        null,
      );
    } else {
      console.error('DropDownRefHobby.current is null');
      showToast('Unable to open vehicle type selector', 'error');
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
      <Text style={styles.licenseImageText}>License Image</Text>
      {/* <ImageUpload title="Upload License" description="PDF, JPG (max 3MB)" />
      <ImagePicker /> */}
      <ImageUpload
        title={'Upload License'}
        description={'PDF, JPG (max 3MB)'}
        image={license}
        setImage={setLicense}
        onPress={ImagePick}
        imagePicker={true}
        certificateImage={{ height: '100%', width: '100%', borderRadius: vh * 2 }}
        uploadBoxStyle={{}}
        imageContainer={{ height: '90%', width: '90%' }}
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
        imagePicker={true}
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
