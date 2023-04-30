import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device';

export async function getToken(){

    let token;

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });


    await registerForPushNotificationsAsync().then(token => data(token));

    function data(toke){
        token = toke
    }

    return token;

  }

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
  
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;}
  
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;}

        token = (await Notifications.getExpoPushTokenAsync()).data;
  
        } else {alert("Must use physical device for Push Notifications");}
  
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            showBadge: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FE9018",
        });
       
    return token;}}



export async function sendNotification(expoPushToken,user,mess){
    
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: user,
        body: mess,
        data: { testData: 'data' },
      };
     
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      }).catch(e => console.log(e))

}