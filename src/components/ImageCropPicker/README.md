# ImageCropPicker Component

A global utility component for handling image selection with cropping functionality using `react-native-image-crop-picker`.

## Features

- ✅ **Camera & Gallery** - Both options available
- ✅ **Built-in Cropping** - Automatic image cropping
- ✅ **Profile Pictures** - Special circular cropping
- ✅ **Document Cropping** - Square cropping for documents
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Consistent Format** - Standardized image data structure
- ✅ **Toast Notifications** - User feedback for actions

## Usage

### Basic Usage

```javascript
import ImageCropPicker from '../components/ImageCropPicker';

const MyComponent = () => {
  const handleImageSelected = (imageData) => {
    console.log('Selected Image:', imageData);
    // imageData contains: uri, path, type, mime, name, filename, size, width, height
  };

  const handleError = (error, message) => {
    console.log('Error:', error, message);
  };

  const selectImage = () => {
    ImageCropPicker.openPicker({}, handleImageSelected, handleError);
  };

  return (
    <TouchableOpacity onPress={selectImage}>
      <Text>Select Image</Text>
    </TouchableOpacity>
  );
};
```

### Profile Picture Selection

```javascript
const selectProfilePicture = () => {
  ImageCropPicker.openProfilePicturePicker(
    (imageData) => {
      console.log('Profile Picture:', imageData);
      setProfileImage({ uri: imageData.uri });
    },
    (error, message) => {
      console.log('Error:', error, message);
    }
  );
};
```

### Document Selection

```javascript
const selectDocument = () => {
  ImageCropPicker.openDocumentPicker(
    (imageData) => {
      console.log('Document:', imageData);
      setDocument(imageData);
    },
    (error, message) => {
      console.log('Error:', error, message);
    }
  );
};
```

### Custom Configuration

```javascript
const selectCustomImage = () => {
  ImageCropPicker.openCustomPicker(
    {
      title: 'Select Avatar',
      message: 'Choose your avatar',
      cropperCircleOverlay: true,
      width: 300,
      height: 300,
      compressImageQuality: 0.9,
    },
    (imageData) => {
      console.log('Custom Image:', imageData);
    },
    (error, message) => {
      console.log('Error:', error, message);
    }
  );
};
```

### Direct Camera Access

```javascript
const takePhoto = () => {
  ImageCropPicker.openCamera(
    {
      width: 1000,
      height: 1000,
      cropping: true,
      compressImageQuality: 0.8,
    },
    (imageData) => {
      console.log('Camera Image:', imageData);
    },
    (error, message) => {
      console.log('Error:', error, message);
    }
  );
};
```

### Direct Gallery Access

```javascript
const selectFromGallery = () => {
  ImageCropPicker.openGallery(
    {
      width: 1000,
      height: 1000,
      cropping: true,
      compressImageQuality: 0.8,
    },
    (imageData) => {
      console.log('Gallery Image:', imageData);
    },
    (error, message) => {
      console.log('Error:', error, message);
    }
  );
};
```

## Image Data Structure

The component returns a consistent image data structure:

```javascript
{
  uri: "file:///path/to/image.jpg",        // Image URI
  path: "file:///path/to/image.jpg",       // Image path (same as uri)
  type: "image/jpeg",                      // MIME type
  mime: "image/jpeg",                      // MIME type (same as type)
  name: "image.jpg",                       // File name
  filename: "image.jpg",                   // File name (same as name)
  size: 1024000,                          // File size in bytes
  width: 1000,                            // Image width
  height: 1000,                           // Image height
  // Legacy support
  fileName: "image.jpg",                  // Legacy file name
  fileSize: 1024000,                     // Legacy file size
}
```

## Configuration Options

### openPicker Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | String | 'Select Image' | Alert title |
| `message` | String | 'Choose an option' | Alert message |
| `cameraText` | String | 'Camera' | Camera button text |
| `galleryText` | String | 'Gallery' | Gallery button text |
| `cancelText` | String | 'Cancel' | Cancel button text |
| `cropping` | Boolean | true | Enable cropping |
| `cropperCircleOverlay` | Boolean | false | Circular crop overlay |
| `cropperToolbarTitle` | String | 'Crop Image' | Crop toolbar title |
| `cropperChooseText` | String | 'Choose' | Crop choose button text |
| `cropperCancelText` | String | 'Cancel' | Crop cancel button text |
| `width` | Number | 1000 | Output image width |
| `height` | Number | 1000 | Output image height |
| `compressImageQuality` | Number | 0.8 | Image compression quality (0-1) |
| `mediaType` | String | 'photo' | Media type filter |
| `includeBase64` | Boolean | false | Include base64 data |

## Methods

### openPicker(options, onImageSelected, onError)
Opens image picker with camera and gallery options.

### openCamera(options, onImageSelected, onError)
Opens camera directly.

### openGallery(options, onImageSelected, onError)
Opens gallery directly.

### openProfilePicturePicker(onImageSelected, onError)
Opens picker with profile picture specific options (circular crop, 500x500).

### openDocumentPicker(onImageSelected, onError)
Opens picker with document specific options (square crop, 1000x1000).

### openCustomPicker(customOptions, onImageSelected, onError)
Opens picker with custom configuration.

### formatImageData(image)
Formats raw image data to consistent structure.

## Error Handling

The component handles errors gracefully:

- **User Cancellation** - No error thrown when user cancels
- **Toast Notifications** - User-friendly error messages
- **Console Logging** - Detailed error information for debugging
- **Callback Support** - Custom error handling via callbacks

## Examples

### Form Integration

```javascript
const [profileImage, setProfileImage] = useState(null);

const handleImageChange = (imageData) => {
  console.log('Image Path:', imageData.path);
  console.log('Image Type:', imageData.type);
  console.log('Image Name:', imageData.name);
  
  setProfileImage({ uri: imageData.uri });
  
  // Create image object for API
  const imageObj = {
    uri: imageData.uri,
    type: imageData.type,
    name: imageData.name,
  };
  
  // Use imageObj for API calls
  uploadImage(imageObj);
};
```

### Multiple Image Types

```javascript
const selectProfilePicture = () => {
  ImageCropPicker.openProfilePicturePicker(handleImageChange);
};

const selectLicense = () => {
  ImageCropPicker.openDocumentPicker(handleImageChange);
};

const selectCustomImage = () => {
  ImageCropPicker.openCustomPicker({
    cropperCircleOverlay: true,
    width: 300,
    height: 300,
  }, handleImageChange);
};
```

## Dependencies

- `react-native-image-crop-picker`
- `react-native`
- `showToast` utility function

## Notes

- All images are automatically compressed and resized
- Profile pictures get circular crop overlay
- Documents get square crop overlay
- Error handling is built-in with user-friendly messages
- Consistent data structure across all methods
