import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  // await messaging().registerDeviceForRemoteMessages(); // IMPORTANT!

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    return getFcmToken();
  }
}

const getFcmToken = async () => {
  const token = await messaging().getToken();
  console.log(token, 'fcm token');
  if (token) {
    return token;
  }
};

export const NotificationListener = handleNotification => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
  });

  messaging().setBackgroundMessageHandler(remoteMessage => {
    console.log(remoteMessage, 'background message');
    PushNotification.createChannel(
      {
        channelId: 'channel-id2', // (required)
        channelName: 'My channel', // (required)
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    const dat = {
      channelId: 'channel-id2', // (required)
      channelName: 'My channel',
      //... You can use all the options from localNotifications
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
    };
    PushNotification.localNotification(dat);
  });

  messaging().onMessage(async remoteMessage => {
    console.log('on message what happened:', remoteMessage);
    PushNotification.createChannel(
      {
        channelId: 'channel-id2', // (required)
        channelName: 'My channel', // (required)
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    const dat = {
      channelId: 'channel-id2', // (required)
      channelName: 'My channel',
      //... You can use all the options from localNotifications
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
    };
    handleNotification(remoteMessage);
    PushNotification.localNotification(dat);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });
};
