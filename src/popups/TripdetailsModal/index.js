import React, {useState, useCallback, useEffect, useRef, useImperativeHandle } from 'react';
import {Text, View, LayoutAnimation, Image} from 'react-native';
import {styles} from './styles';
import MapView from 'react-native-maps';
import GilroyMedium from '../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../components/Wrappers/Text/GilroyRegular';
import RobotoMedium from '../../components/Wrappers/Text/RobotoMedium';
import Ripple from 'react-native-material-ripple';
import {icons, images} from '../../assets';
import ReportModal from '../ReportModal';
import GilroyBold from '../../components/Wrappers/Text/GilroyBold'; 
import GeneralModal from '../GeneralModal';
import vh from '../../utils/units/vh';
import PickDropLocation from '../../components/PickDropLocation';
import {useDispatch} from 'react-redux';
import {showToast} from '../../Api/HelperFunction';
import {acceptRideAction} from '../../Redux/Actions/rideAction';
import {useFocusEffect} from '@react-navigation/native';
import {rideDeatilsAction} from '../../Redux/Actions/rideAction'
import MapViewDirections from 'react-native-maps-directions';
import { apikey } from '../../Api/configs';
import PopupWrapper from '../PopupWrapper';

const CustomButton = props => {
  return (
    <Ripple
      style={[styles.buttonContainer, props.customButtonStyle]}
      onPress={props.onPress}>
      <GilroyBold style={styles.buttonText}>{props.children}</GilroyBold>
    </Ripple>
  );
};

// const UserRequestCard = props => {
//   const mapViewRef =  useRef()

//   const [deatils, setDetails] = useState();
//   const [showPopUp, setShowPopup] = useState(true)
//   const dispatch = useDispatch();
//   const modalRef = useRef();
//   const rejectRef = useRef();
//   const modalRef2 = useRef();
//   const modalRef4 = useRef();

//   const handleAcceptButton = async () => {
//     try {
//       // const id = '62c6930848572e20ac4e4095';
//       const response = await dispatch(acceptRideAction(props?.route?.params?.id));
//       showToast(response?.message);
//       setShowPopup(false)
//       modalRef2.current.hide();
//     } catch (err) {
//       showToast(err);
//       setShowPopup(true)
//     }
//   };
//   const getData = async () => {
//     try {
//       const response = await dispatch(rideDeatilsAction(props?.route?.params?.id));
//       setDetails(response);
//       mapViewRef.current?.animateToRegion({
//         latitude: response?.ride?.pickuplocation?.coordinates[1],
//         longitude: response?.ride?.pickuplocation?.coordinates[0],   
//         latitudeDelta: 0.0922,
//         ongitudeDelta: 0.0421,
//     })
//     } catch (err) {
//         showToast(err)
//     }
//   };
//   useFocusEffect(
//     useCallback(() => { 
//       getData();

//  }, []));


//  return (
//     <View style={{alignItems:'center'}} >
        
//      {showPopUp && <View style={styles.CardContainer}>
//       <View style={styles.usernameProfileContainer}>
//         <View style={styles.profileContainer}>
//           <Image source={images.userProfileImage} style={styles.profileImage} />
//         </View>
//         <RobotoMedium style={styles.userNameText}>{deatils?.ride?.user?.firstName ? deatils?.ride?.user?.firstName + ' ' + deatils?.ride?.user?.lastName: 'Guest User'}</RobotoMedium>
//       </View>
//       <PickDropLocation data={deatils} />

//       <View style={styles.ButtonsStyle}>
//         <CustomButton
//           customButtonStyle={styles.acceptBtn}
//           onPress={() => modalRef.current.show()}>
//           Accept
//         </CustomButton>
//         <CustomButton
//           customButtonStyle={styles.rejectBtn}
//           onPress={() => rejectRef.current.show()}>
//           Reject
//         </CustomButton>
//       </View>
//       </View>}
//       <GeneralModal //screen 7
//         reference={modalRef}
//         icon={images.exclamationMark}
//         // text1={'Logout'}
//         text2={'Are you sure you want to accept\nthis ride ?'}
//         text2Style={{height: null}}
//         button1Text={'Yes'}
//         onButton1Press={() => {
//           handleAcceptButton();
//         }}
//         button2Text={'No'}
//       />
//       <GeneralModal //screen 7
//         reference={rejectRef}
//         icon={images.exclamationMark}
//         // text1={'Logout'}
//         text2={'Are you sure you want to reject\nthis ride ?'}
//         text2Style={{height: null}}
//         button1Text={'Yes'}
//         onButton1Press={() => {
//           //   props.navigation.navigate('AuthStack');
//           modalRef2.current.show();
//         }}
//         button2Text={'No'}
//       />
//       <ReportModal //screen 7
//         reference={modalRef2}
//         text1={'Rejection Reason'}
//         title="Please Provide a Reason"
//         smallMainIconStyle
//         text2Style={{height: null, fontSize: 1.9 * vh}}
//         button1Text={'Continue'}
//         onButton1Press={() => {
//           modalRef4.current.show();
//           modalRef2.current.hide();
//         }}
//         onHide={() => {}}
//         button2Text={'Cancel'}
//       />
//       <GeneralModal //screen 7
//         reference={modalRef4}
//         icon={icons.tickModal}
//         text2={'Ride has been rejected.'}
//         text2Style={{height: null, fontSize: 1.9 * vh}}
//         smallMainIconStyle
//       />
//     </View>
//   );
// };

const TripRequestModal = props => {
    const mapViewRef =  useRef()

    const [deatils, setDetails] = useState();
    const [showPopUp, setShowPopup] = useState(true)
    const dispatch = useDispatch();
    const modalRef = useRef();
    const rejectRef = useRef();
    const modalRef2 = useRef();
    const modalRef4 = useRef();
  

    let TripRequestModal = useRef(null);
  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  const show = () => {
    TripRequestModal?.current?.show();
  };

  const hide = () => {
    TripRequestModal?.current?.hide();
    if (props.onHide) {
      props.onHide();
    }
    // if (props?.onHide) {
    //     props?.onHide()
    // }
  };

  const onYes = () => {
    if (props?.onAccept) {
      props?.onAccept();
    }

    hide();
  };


    const handleAcceptButton = async () => {
      try {
        // const id = '62c6930848572e20ac4e4095';
        const response = await dispatch(acceptRideAction(props?.route?.params?.id));
        showToast(response?.message);
        setShowPopup(false)
        modalRef2.current.hide();
      } catch (err) {
        showToast(err);
        setShowPopup(true)
      }
    };
    const getData = async () => {
      try {
        const response = await dispatch(rideDeatilsAction(props?.route?.params?.id));
        setDetails(response);
        mapViewRef.current?.animateToRegion({
          latitude: response?.ride?.pickuplocation?.coordinates[1],
          longitude: response?.ride?.pickuplocation?.coordinates[0],   
          latitudeDelta: 0.0922,
          ongitudeDelta: 0.0421,
      })
      } catch (err) {
          showToast(err)
      }
    };
    useFocusEffect(
      useCallback(() => { 
        getData();
  
   }, []));
  
  return (
    <PopupWrapper
      reference={TripRequestModal}
      onCancel={() => {
        if (props.onHide) {
          props.onHide();
        }
      }}>
    <View style={styles.container}>
   
   <View style={{alignItems:'center'}} >
        
        <View style={styles.CardContainer}>
         <View style={styles.usernameProfileContainer}>
           <View style={styles.profileContainer}>
             <Image source={images.userProfileImage} style={styles.profileImage} />
           </View>
           <RobotoMedium style={styles.userNameText}>{deatils?.ride?.user?.firstName ? deatils?.ride?.user?.firstName + ' ' + deatils?.ride?.user?.lastName: 'Guest User'}</RobotoMedium>
         </View>
         <PickDropLocation data={deatils} />
   
         <View style={styles.ButtonsStyle}>
           <CustomButton
             customButtonStyle={styles.acceptBtn}
             onPress={() => modalRef.current.show()}>
             Accept
           </CustomButton>
           <CustomButton
             customButtonStyle={styles.rejectBtn}
             onPress={() => rejectRef.current.show()}>
             Reject
           </CustomButton>
         </View>
         </View>
         <GeneralModal //screen 7
           reference={modalRef}
           icon={images.exclamationMark}
           // text1={'Logout'}
           text2={'Are you sure you want to accept\nthis ride ?'}
           text2Style={{height: null}}
           button1Text={'Yes'}
           onButton1Press={() => {
             handleAcceptButton();
           }}
           button2Text={'No'}
         />
         <GeneralModal //screen 7
           reference={rejectRef}
           icon={images.exclamationMark}
           // text1={'Logout'}
           text2={'Are you sure you want to reject\nthis ride ?'}
           text2Style={{height: null}}
           button1Text={'Yes'}
           onButton1Press={() => {
             //   props.navigation.navigate('AuthStack');
             modalRef2.current.show();
           }}
           button2Text={'No'}
         />
         <ReportModal //screen 7
           reference={modalRef2}
           text1={'Rejection Reason'}
           title="Please Provide a Reason"
           smallMainIconStyle
           text2Style={{height: null, fontSize: 1.9 * vh}}
           button1Text={'Continue'}
           onButton1Press={() => {
             modalRef4.current.show();
             modalRef2.current.hide();
           }}
           onHide={() => {}}
           button2Text={'Cancel'}
         />
         <GeneralModal //screen 7
           reference={modalRef4}
           icon={icons.tickModal}
           text2={'Ride has been rejected.'}
           text2Style={{height: null, fontSize: 1.9 * vh}}
           smallMainIconStyle
         />
       </View>
    </View>
    </PopupWrapper>
  );
};
export default TripRequestModal;
