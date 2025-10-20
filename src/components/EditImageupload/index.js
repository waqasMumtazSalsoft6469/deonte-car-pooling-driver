import React from 'react';
import { useState } from 'react';
import { View, Image, Touchable, TouchableOpacity } from 'react-native';

import { image_url } from '../../Api/configs';
import { icons, images } from '../../assets';
import Ripple from '../Wrappers/Ripple';
import GilroyBold from '../Wrappers/Text/GilroyBold';
import GilroyRegular from '../Wrappers/Text/GilroyRegular';
import { styles } from './styles';

const EditImageUpload = props => {
  // function handleDelete (){
  //       props.DeletePress
  // }
  return (
    <View style={styles.mainContainer} >

      <View style={[styles.imageContainer, props?.imageContainer]}>
        {props.image &&
          props.image?.map((v, i) => {
            console.log('v --->', v);
            return (
              <View style={styles.ImageContainer}>
                <Image
                  key={v?.uri}
                  source={v?.name  ? { uri: v?.uri } : { uri: image_url + v }}
                  style={styles.certificateImage}

                />
                <TouchableOpacity style={styles.deleteContainer}
                  onPress={() => props.DeletePress(i)}
                >
                  <Image
                    key={v?.uri}
                    source={icons.dustbin}
                    style={styles.deleteImage}

                  />
                </TouchableOpacity>
              </View>
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
      {/* {props.imageSource.length < 1   &&  <Image source={icons.uploadIcon} style={styles.uploadIcon} />}
        {props.imageSource.length < 1   && (
          <View>
            <GilroyBold style={styles.text2}>{props.title}</GilroyBold>
            <GilroyRegular style={styles.text3}>
              {props.description}
            </GilroyRegular>
          </View>
        )} */}
      <Ripple
        style={[styles.uploadBox, props.uploadBoxStyle]}
        onPress={props.UploadPress}>
        <Image source={icons.uploadIcon} style={styles.uploadIcon} />
      </Ripple>
    </View>
  );
};

export default EditImageUpload;
