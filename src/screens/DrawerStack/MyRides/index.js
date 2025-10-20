import React, { useCallback, useState, useRef } from 'react';
import { Text,View,Image,FlatList} from 'react-native';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import {styles} from "./styles"
import { icons,images } from '../../../assets';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import Ripple from 'react-native-material-ripple';
import {getAllRidesData} from '../../../Redux/Actions/rider'
import { useDispatch } from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';
import MapViewDirections from 'react-native-maps-directions';
import { apikey } from '../../../Api/configs';

const Rides =(props)=>{
  console.log("response from get Ride Props ==>", props)
    const [markerRegion, setmarkerRegion] = useState({
        latitude:props?.data?.pickuplocation?.coordinates ? props?.data?.pickuplocation?.coordinates[1]  :  24.873844,
        longitude: props?.data?.pickuplocation?.coordinates ? props?.data?.pickuplocation?.coordinates[0] : 67.0672913,
        latitudeDelta: 0.2022,
        longitudeDelta: 0.1821,
      });
    const date = new Date(props?.data?.createdAt)
const mapViewRef = useRef();
const mapDirectionRef = useRef()
    
    return (
        <View>
            <View style={styles.rideContainer}>
                <View>
            <View style={styles.driverNameContainer}>
            <GilroyMedium style={styles.driverNameStyle}>{props?.data?.driver?.firstName + ' ' + props?.data?.driver?.lastName}</GilroyMedium>
            <GilroyRegular style={styles.driverNameStyle}>{date?.toLocaleDateString()}</GilroyRegular>
            </View>
            <View style={styles.driverNameContainer}>
            <GilroyRegular style={styles.idStyle}>{props?.data?.driver?.drivervehicletype?.licenseNo ? props?.data?.driver?.drivervehicletype?.licenseNo : ''}</GilroyRegular>
            <GilroyRegular style={styles.idStyle}>$ {props?.data?.totalbill ? props?.data?.totalbill : 0 }</GilroyRegular>
            </View>
            </View>
            <Image source={icons.arrowRight} style={styles.arrowIcon}/>
            </View>
            {/* <Image source={images.rideMap} style={styles.rideMapStyle}/> */}
            <MapView
             ref={mapViewRef}
             style={styles.rideMapStyle}
             initialRegion={{
               ... markerRegion,
              }}>
                <Marker coordinate={{ ...markerRegion }}>
              <Image
                source={icons.circle}
                resizeMode="contain"
                style={{ height: vh * 2.5, width: vw * 2.5 }}
              />

</Marker>

<MapViewDirections
            ref={mapDirectionRef}
            origin={{...markerRegion}}
            destination={{
                  latitude:
                  props?.data?.dropofflocation?.coordinates[1],
                  longitude:
                  props?.data?.dropofflocation?.coordinates[0],
                  latitudeDelta: 0.2022,
                  longitudeDelta: 0.1821,
                }}
            apikey={apikey}
            mode="DRIVING"
            strokeColor="black"
            strokeWidth={vh * 0.2}
            
          ></MapViewDirections>
          <Marker coordinate={{  latitude:
                  props?.data?.dropofflocation?.coordinates[1],
                  longitude:
                  props?.data?.dropofflocation?.coordinates[0] }}>
              <Image
                source={icons.circle}
                resizeMode="contain"
                style={{ height: vh * 2.5, width: vw * 2.5 }}
              />

</Marker>
              </MapView>
            <View style={styles.bookedContainer}>
                <GilroyBold style={styles.bookedText}>{props?.data?.rideStatus}</GilroyBold>
            </View>
        </View>
    )
}

const MyRides=(props)=>{

    const dispatch = useDispatch()
    const [details, setDetails] = useState()
    const [refresh,setRefresh] = useState(false)
    // const [driverdetails, setdriverDetails] = useState()
    const getData= async () =>{
    try{
        const response = await dispatch(getAllRidesData())
        setDetails(response)
    }catch(err){
        showToast(err)
    }
}
useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

const getDataonRefresh = async () =>{
            try{
                const response = await dispatch(getAllRidesData(true))
                setDetails(response)
                setRefresh(false)
            }catch(err){
                showToast(err)
            }
     
    
}
const onRefreshhandler = () =>{
    setRefresh(true)
    getDataonRefresh()
}

  const renderEmptyContent = () =>{
return(
    <View style={styles.emptyContainerStyles}>
        <GilroyMedium style={styles.emptyText}>No Ride found</GilroyMedium>
    </View>
)
  }
    return (
   <View style={styles.container}>
       <FlatList
        data={details?.ride}
        renderItem={({index, item})=>(
        <Ripple onPress={()=> props.navigation.navigate("RideDetails",{data: item?._id})}>
       <Rides data={item}/>
       </Ripple>
       )}
       refreshing={refresh}
       onRefresh={onRefreshhandler}
       
       showsVerticalScrollIndicator={false}
       ListEmptyComponent={renderEmptyContent()}
       />
   </View>
    )
}
export default MyRides