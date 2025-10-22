import React from 'react';
import { Image, View } from 'react-native';
import { image_url } from '../../Api/configs';
import { icons } from '../../assets';
import Ripple from '../Wrappers/Ripple';
import { styles } from './styles';

const ImageUpload = props => {
  return (
    <View>
      <Ripple
        style={[styles.uploadBox, props.uploadBoxStyle]}
        onPress={props.onPress}>
        <View style={[styles.imageContainer, props?.imageContainer]}>
          <Image source={icons.uploadIcon} style={styles.uploadIcon} />

          {props.image &&
            props.image?.map(v => {
              console.log('v --->', v?.uri);
              return (
                <Image
                  key={v?.uri}
                  source={
                    props?.imagePicker ? {uri: v?.uri} : {uri: image_url + v}
                  }
                  style={styles.certificateImage}
                />
              );
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
