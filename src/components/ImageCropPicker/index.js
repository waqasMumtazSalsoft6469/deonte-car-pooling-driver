import React from 'react';
import { Alert, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { showToast } from '../../Api/HelperFunction';

const ImageCropPicker = {
  /**
   * Open image picker with camera and gallery options
   * @param {Object} options - Configuration options
   * @param {Function} onImageSelected - Callback when image is selected
   * @param {Function} onError - Callback when error occurs
   */
  openPicker: (options = {}, onImageSelected, onError) => {
    const {
      title = 'Select Image',
      message = 'Choose an option',
      cameraText = 'Camera',
      galleryText = 'Gallery',
      cancelText = 'Cancel',
      cropping = true,
      cropperCircleOverlay = false,
      cropperToolbarTitle = 'Crop Image',
      cropperChooseText = 'Choose',
      cropperCancelText = 'Cancel',
      width = 1000,
      height = 1000,
      compressImageQuality = 0.8,
      mediaType = 'photo',
      includeBase64 = false,
    } = options;

    const pickerOptions = {
      width,
      height,
      cropping,
      cropperCircleOverlay,
      cropperToolbarTitle,
      cropperChooseText,
      cropperCancelText,
      compressImageQuality,
      includeBase64,
      mediaType,
    };

    Alert.alert(
      title,
      message,
      [
        {
          text: cameraText,
          onPress: () => ImageCropPicker.openCamera(pickerOptions, onImageSelected, onError),
        },
        {
          text: galleryText,
          onPress: () => ImageCropPicker.openGallery(pickerOptions, onImageSelected, onError),
        },
        { text: cancelText, style: 'cancel' },
      ],
      { cancelable: true }
    );
  },

  /**
   * Open camera directly
   * @param {Object} options - Picker options
   * @param {Function} onImageSelected - Callback when image is selected
   * @param {Function} onError - Callback when error occurs
   */
  openCamera: (options = {}, onImageSelected, onError) => {
    ImagePicker.openCamera(options)
      .then(image => {
        const imageData = ImageCropPicker.formatImageData(image);
        if (onImageSelected) {
          onImageSelected(imageData);
        }
        showToast('Image selected successfully', 'success');
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          let errorMessage = 'Error selecting image from camera';
          
          // Handle specific permission errors
          if (error.message && error.message.includes('camera permission')) {
            errorMessage = 'Camera permission is required. Please enable camera access in app settings.';
          } else if (error.message && error.message.includes('permission')) {
            errorMessage = 'Permission denied. Please check app permissions in settings.';
          }
          
          showToast(errorMessage, 'error');
          console.log('Camera Error: ', error);
          if (onError) {
            onError(error, errorMessage);
          }
        }
      });
  },

  /**
   * Open gallery directly
   * @param {Object} options - Picker options
   * @param {Function} onImageSelected - Callback when image is selected
   * @param {Function} onError - Callback when error occurs
   */
  openGallery: (options = {}, onImageSelected, onError) => {
    ImagePicker.openPicker(options)
      .then(image => {
        const imageData = ImageCropPicker.formatImageData(image);
        if (onImageSelected) {
          onImageSelected(imageData);
        }
        showToast('Image selected successfully', 'success');
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          const errorMessage = 'Error selecting image from gallery';
          showToast(errorMessage, 'error');
          console.log('Gallery Error: ', error);
          if (onError) {
            onError(error, errorMessage);
          }
        }
      });
  },

  /**
   * Format image data to consistent structure
   * @param {Object} image - Raw image data from picker
   * @returns {Object} Formatted image data
   */
  formatImageData: (image) => {
    // Extract filename from path
    const extractFileName = (path) => {
      if (!path) return 'image.jpg';
      const pathParts = path.split('/');
      return pathParts[pathParts.length - 1] || 'image.jpg';
    };

    return {
      uri: image.path,
      path: image.path,
      type: image.mime,
      mime: image.mime,
      name: image.filename || extractFileName(image.path),
      filename: image.filename || extractFileName(image.path),
      size: image.size,
      width: image.width,
      height: image.height,
      // Legacy support for old format
      fileName: image.filename || extractFileName(image.path),
      fileSize: image.size,
    };
  },

  /**
   * Open picker with profile picture specific options
   * @param {Function} onImageSelected - Callback when image is selected
   * @param {Function} onError - Callback when error occurs
   */
  openProfilePicturePicker: (onImageSelected, onError) => {
    ImageCropPicker.openPicker(
      {
        title: 'Select Profile Picture',
        message: 'Choose how you want to add your profile picture',
        cropperCircleOverlay: true,
        cropperToolbarTitle: 'Crop Profile Picture',
        width: 500,
        height: 500,
        compressImageQuality: 0.9,
      },
      onImageSelected,
      onError
    );
  },

  /**
   * Open picker with document specific options
   * @param {Function} onImageSelected - Callback when image is selected
   * @param {Function} onError - Callback when error occurs
   */
  openDocumentPicker: (onImageSelected, onError) => {
    ImageCropPicker.openPicker(
      {
        title: 'Select Document',
        message: 'Choose how you want to add your document',
        cropperCircleOverlay: false,
        cropperToolbarTitle: 'Crop Document',
        width: 1000,
        height: 1000,
        compressImageQuality: 0.8,
      },
      onImageSelected,
      onError
    );
  },

  /**
   * Open picker with custom options
   * @param {Object} customOptions - Custom configuration
   * @param {Function} onImageSelected - Callback when image is selected
   * @param {Function} onError - Callback when error occurs
   */
  openCustomPicker: (customOptions = {}, onImageSelected, onError) => {
    const defaultOptions = {
      title: 'Select Image',
      message: 'Choose an option',
      cropping: true,
      cropperCircleOverlay: false,
      cropperToolbarTitle: 'Crop Image',
      width: 1000,
      height: 1000,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    };

    const options = { ...defaultOptions, ...customOptions };
    ImageCropPicker.openPicker(options, onImageSelected, onError);
  },
};

export default ImageCropPicker;
