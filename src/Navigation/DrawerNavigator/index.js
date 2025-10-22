import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Notifications from '../../screens/DrawerStack/Notifications';
import DrawerContent from '../../components/DrawerContent';
import HomeNavigator from '../HomeNavigator';
import ProfileNavigator from '../ProfileNavigator';
import ContactUs from '../../screens/DrawerStack/ContactUs';
import ContactUsNavigator from '../ContactUsNavigator';
import MyRidesNavigator from '../MyRidesNavigator';
import MyEarningsNavigator from '../MyEarningNavigator';
import MyVehicleNavigator from '../MyVehicleNavigator';
import PlayListNavigator from '../PlayListNavigator';
import RatingNavigator from '../RatingNavigator';
import RidesRequest from '../../screens/DrawerStack/RidesRequest';
import MyRidesRequestNavigator from '../MyRidesRequestNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(props) {
  return (
    <Drawer.Navigator
      screenOptions={props => {
        return {
          // ...getOptions(props),
          headerShown: false,
          // headerStyle: {
          //   height: 15 * vh,
          // },
          drawerType: 'slide',
          drawerStyle: {
            backgroundColor: 'white',
            width: '59%',
          },
          overlayColor: 'transparent',
          sceneContainerStyle: {
            backgroundColor: 'white', //transparent
          },
        };
      }}
      drawerContent={() => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeNavigator" component={HomeNavigator} />
      <Drawer.Screen name="MyVehicleNavigator" component={MyVehicleNavigator} />
      <Drawer.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <Drawer.Screen name="RatingNavigator" component={RatingNavigator} />
      <Drawer.Screen
        name="MyRidesRequestNavigator"
        component={MyRidesRequestNavigator}
      />
      <Drawer.Screen name="MyRidesNavigator" component={MyRidesNavigator} />

      <Drawer.Screen name="PlayListNavigator" component={PlayListNavigator} />
      <Drawer.Screen
        name="MyEarningsNavigator"
        component={MyEarningsNavigator}
      />
      <Drawer.Screen name="ContactUsNavigator" component={ContactUsNavigator} />
    </Drawer.Navigator>
  );
}
