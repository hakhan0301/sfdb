import * as Device from 'expo-device';
import { Platform, Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { tables } from '../supabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function useNotifications(userId?: string) {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();

  useEffect(() => {
    if (!expoPushToken || !userId) return;

    tables.users().update({
      id: userId,
      notification_token: expoPushToken
    });
  }, [expoPushToken, userId]);

  useEffect(() => {
    registerDeviceForPushNotifications().then(setExpoPushToken);
    notificationListener.current = Notifications.addNotificationReceivedListener(setNotification);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
    };
  }, [userId]);


  return { expoPushToken, notification };
}

async function registerDeviceForPushNotifications() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
      bypassDnd: true,
      enableVibrate: true,
      enableLights: true,
      showBadge: true
    });

  }

  return token;
}

