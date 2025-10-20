import React, {useCallback, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {showToast} from '../../../Api/HelperFunction';
import {getNotification} from '../../../Redux/Actions/rider';
import actionTypes from '../../../Redux/Actions/actionTypes';

const NotificationCard = ({index, item}) => {
  console.log('item', item);
  const datetime = new Date(item?.date);
  console.log('date time ====>', datetime);
  return (
    <View style={styles.notificationCardContainer}>
      {index != 1 ? (
        <View style={styles.circle} />
      ) : (
        <View style={[styles.circle, {backgroundColor: '#fff'}]} />
      )}

      <View style={styles.innerContainer}>
        <GilroyRegular style={styles.notificationText} numberOfLines={2}>
          {item?.body}
        </GilroyRegular>
        <View style={styles.dateContainer}>
          <GilroyMedium style={styles.dateText}>
            {datetime?.toLocaleDateString()}
          </GilroyMedium>
          <GilroyMedium style={styles.dateText}>
            {datetime?.getHours() + ':' + datetime?.getMinutes()}
          </GilroyMedium>
        </View>
      </View>
    </View>
  );
};
const itemSeparate = () => <View style={styles.horizontalLine} />;
const renderEmptyContent = () => {
  return (
    <View style={styles.emptyContainer}>
      <GilroyMedium style={styles.emptyContainertext}>
        No Notification found
      </GilroyMedium>
    </View>
  );
};
const Notifications = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  // const [driverdetails, setdriverDetails] = useState()
  const getData = async () => {
    try {
      const response = await dispatch(getNotification());
      console.log('Response from Get Notification  ========>', response);

      // for saving ride id
      // let lastElIndex = response?.notification?.length - 1;
      // console.log('lastElIndex', lastElIndex);
      // let currentRideId = response?.notification[lastElIndex]?.payload?.id;
      // console.log('Current Notification', currentRideId);
      // dispatch({
      //   type: actionTypes.rideId,
      //   currentRideId,
      // });

      setDetails(response);
    } catch (err) {
      showToast(err);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={details?.notification}
        renderItem={({item, index}) => (
          <NotificationCard index={index} item={item} />
        )}
        ItemSeparatorComponent={itemSeparate}
        ListEmptyComponent={() => renderEmptyContent()}
      />
    </View>
  );
};
export default Notifications;
