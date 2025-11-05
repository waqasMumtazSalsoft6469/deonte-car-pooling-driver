import React from 'react';
import { Image, View, Text } from 'react-native';
import { image_url } from '../../Api/configs';
import { icons } from '../../assets';
import Ripple from '../Wrappers/Ripple';
import { styles } from './styles';
import GilroyRegular from '../Wrappers/Text/GilroyRegular';

const ImageUpload = props => {
  const isPDFFile = (file) => {
    const uri = file?.uri || file?.path || '';
    const type = file?.type || file?.mimeType || '';
    const name = file?.name || file?.filename || '';
    return type?.includes('pdf') || 
           type === 'application/pdf' || 
           name?.toLowerCase().endsWith('.pdf') ||
           uri?.toLowerCase().endsWith('.pdf');
  };

  return (
    <View>
      <Ripple
        style={[styles.uploadBox, props.uploadBoxStyle]}
        onPress={props.onPress}>
        <View style={[styles.imageContainer, props?.imageContainer]}>
          {(!props.image || props.image?.length === 0) && (
            <Image source={icons.uploadIcon} style={styles.uploadIcon} />
          )}

          {props.image &&
            props.image?.map((v, index) => {
              console.log('v --->', v?.uri);
              const isPDF = isPDFFile(v);
              
              if (isPDF) {
                // Show PDF icon and filename for PDF files
                return (
                  <View key={v?.uri || index} style={styles.pdfContainer}>
                    <Image source={icons.uploadIcon} style={styles.pdfIcon} />
                    <GilroyRegular style={styles.pdfFileName} numberOfLines={1}>
                      {v?.name || v?.filename || 'License.pdf'}
                    </GilroyRegular>
                  </View>
                );
              } else {
                // Show image preview for image files
                return (
                  <Image
                    key={v?.uri || index}
                    source={
                      props?.imagePicker ? {uri: v?.uri || v?.path} : {uri: image_url + v}
                    }
                    style={styles.certificateImage}
                  />
                );
              }
            })}
          {/* {
            props.imageSource.length > 0 ?            
             props.imageSource?.map(v => {
              console.log('v --->', v);
              return (
                <Image
                  key={v?.uri}
                  source={{
                    uri: image_url +  v?.uri,
                  }}
                  style={styles.certificateImage}
                
                />
              );
            }) : <Image
            source={{uri: props.imageSource}}
            style={[styles.certificateImage, props?.certificateImage]}
          />
            } */}
        </View>
        {/* {props?.imageSource?.length < 1 && (
          <Image source={icons.uploadIcon} style={styles.uploadIcon} />
        )}
        {props?.imageSource?.length < 1 && (
          <View>
            <GilroyBold style={styles.text2}>{props.title}</GilroyBold>
            <GilroyRegular style={styles.text3}>
              {props.description}
            </GilroyRegular>
          </View>
        )} */}
      </Ripple>
    </View>
  );
};

export default ImageUpload;
