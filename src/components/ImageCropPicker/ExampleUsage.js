import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImageCropPicker from './index';

const ExampleUsage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [documentImage, setDocumentImage] = useState(null);

  // Example 1: Profile Picture Selection
  const selectProfilePicture = () => {
    const handleImageChange = (imageData) => {
      console.log('Profile Picture Selected:', imageData);
      console.log('Image Path:', imageData.path);
      console.log('Image Type:', imageData.type);
      console.log('Image Name:', imageData.name);
      
      setProfileImage({ uri: imageData.uri });
      
      // Create image object for API (as requested)
      const imageObj = {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.name,
      };
      
      console.log('Image Object for API:', imageObj);
    };

    const handleError = (error, message) => {
      console.log('Profile Picture Error:', error, message);
    };

    ImageCropPicker.openProfilePicturePicker(handleImageChange, handleError);
  };

  // Example 2: Document Selection
  const selectDocument = () => {
    const handleImageChange = (imageData) => {
      console.log('Document Selected:', imageData);
      setDocumentImage({ uri: imageData.uri });
    };

    const handleError = (error, message) => {
      console.log('Document Error:', error, message);
    };

    ImageCropPicker.openDocumentPicker(handleImageChange, handleError);
  };

  // Example 3: Custom Configuration
  const selectCustomImage = () => {
    const handleImageChange = (imageData) => {
      console.log('Custom Image Selected:', imageData);
    };

    const handleError = (error, message) => {
      console.log('Custom Image Error:', error, message);
    };

    ImageCropPicker.openCustomPicker({
      title: 'Select Avatar',
      message: 'Choose your avatar',
      cropperCircleOverlay: true,
      width: 300,
      height: 300,
      compressImageQuality: 0.9,
    }, handleImageChange, handleError);
  };

  // Example 4: Basic Picker
  const selectBasicImage = () => {
    const handleImageChange = (imageData) => {
      console.log('Basic Image Selected:', imageData);
    };

    const handleError = (error, message) => {
      console.log('Basic Image Error:', error, message);
    };

    ImageCropPicker.openPicker({}, handleImageChange, handleError);
  };

  // Example 5: Direct Camera Access
  const takePhoto = () => {
    const handleImageChange = (imageData) => {
      console.log('Camera Photo:', imageData);
    };

    const handleError = (error, message) => {
      console.log('Camera Error:', error, message);
    };

    ImageCropPicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: true,
      compressImageQuality: 0.8,
    }, handleImageChange, handleError);
  };

  // Example 6: Direct Gallery Access
  const selectFromGallery = () => {
    const handleImageChange = (imageData) => {
      console.log('Gallery Image:', imageData);
    };

    const handleError = (error, message) => {
      console.log('Gallery Error:', error, message);
    };

    ImageCropPicker.openGallery({
      width: 1000,
      height: 1000,
      cropping: true,
      compressImageQuality: 0.8,
    }, handleImageChange, handleError);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ImageCropPicker Examples</Text>
      
      {/* Profile Picture Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Picture (Circular Crop)</Text>
        <TouchableOpacity style={styles.button} onPress={selectProfilePicture}>
          <Text style={styles.buttonText}>Select Profile Picture</Text>
        </TouchableOpacity>
        {profileImage && (
          <Image source={profileImage} style={styles.image} />
        )}
      </View>

      {/* Document Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Document (Square Crop)</Text>
        <TouchableOpacity style={styles.button} onPress={selectDocument}>
          <Text style={styles.buttonText}>Select Document</Text>
        </TouchableOpacity>
        {documentImage && (
          <Image source={documentImage} style={styles.image} />
        )}
      </View>

      {/* Custom Configuration Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Configuration</Text>
        <TouchableOpacity style={styles.button} onPress={selectCustomImage}>
          <Text style={styles.buttonText}>Select Custom Image</Text>
        </TouchableOpacity>
      </View>

      {/* Basic Picker Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Picker</Text>
        <TouchableOpacity style={styles.button} onPress={selectBasicImage}>
          <Text style={styles.buttonText}>Select Basic Image</Text>
        </TouchableOpacity>
      </View>

      {/* Direct Camera Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Direct Camera</Text>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Direct Gallery Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Direct Gallery</Text>
        <TouchableOpacity style={styles.button} onPress={selectFromGallery}>
          <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});

export default ExampleUsage;
