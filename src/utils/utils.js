import {getUser,updateBackground, updateScreamer} from "../firebase/firebaseActions.js"
import {ChatBox} from "../components/chatBox.jsx"
import {styles} from "../styles/chatStyles.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

// Verify username.

export async function verify(name){

if  (name.length == 0){
    return 'You must enter a username to continue.';
  }
  else if (name.length <= 4 || name.length >= 13 ){
    return 'The username must have at least 5 characters and a maximum of 12.';
  }
  const search = await getUser(name)
  if (search == '400'){return 'An error has occurred.'}
  if (search != '404'){return 'The username is already in use.'}
  return 'success'
}
 

// Verify message.

export async function verifyMessage(message){

  let status = ['',<></>]

  if (message.length === 0){return ['',<></>]}
  if (message == '/commands'){return ['command', <ChatBox style={styles.commands} user="Commands" message="/screamer 1 /screamer 2 /background 1 /background 2 /background 3 /background 4 /background 5"/>]}
  
  if (message[0] == '/'){
    const data = message.split(' ')
    if (message.slice(0,11) == "/background"){

      if(data[1] <= 5 && data[1] > 0){

        let url;

        if (data[1] == 1){url = 'https://firebasestorage.googleapis.com/v0/b/projectx-7ad0d.appspot.com/o/back-1.png?alt=media&token=87d17324-2212-48ab-a75d-584eb3de9151' }
        if (data[1] == 2){url = 'https://firebasestorage.googleapis.com/v0/b/projectx-7ad0d.appspot.com/o/back-2.png?alt=media&token=8ee6bfd8-b989-46a6-aad5-2ae9cc177f7e' }
        if (data[1] == 3){url = 'https://firebasestorage.googleapis.com/v0/b/projectx-7ad0d.appspot.com/o/back-3.png?alt=media&token=854b25d9-d714-4d68-84cd-bceee1d6e23a' }
        if (data[1] == 4){url = 'https://firebasestorage.googleapis.com/v0/b/projectx-7ad0d.appspot.com/o/back-4.png?alt=media&token=70b53e3c-ee7e-4922-b3b8-89eb69a1f532' }
        if (data[1] == 5){url = 'https://firebasestorage.googleapis.com/v0/b/projectx-7ad0d.appspot.com/o/back-5.png?alt=media&token=3c8f93ff-0bdc-44fc-94d4-ad40777a4c35' }
        
        await updateBackground(url)

        status = ['',<></>]
      }}
    if (message.slice(0,9) == "/screamer"){

      if(data[1] <= 2 && data[1] > 0){

        let url;

        if (data[1] == 1){url = 'https://firebasestorage.googleapis.com/v0/b/projectx-7ad0d.appspot.com/o/screamer-1.png?alt=media&token=f49196dc-9647-4018-b099-4dbc3a26d1c2'}
        if (data[1] == 2){url = 'https://firebasestorage.googleapis.com/v0/b/projectx-7ad0d.appspot.com/o/screamer-2.png?alt=media&token=94a1bb3c-d93e-47f9-b5da-1fa9acf2ad68'}
      
        await updateScreamer(url,true)

        status = ['',<></>]
      }}
    
    return status;
  } 
  return 'success'
}

// Verify user.

export async function verifyUser(navigation){
  const user = await AsyncStorage.getItem('username')
  if (user == null){navigation.navigate('home')}}

// Get user.

export async function getUserAsync(){
    const user = await AsyncStorage.getItem('username');
    return user;}

// Play audio.

export async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('../../assets/sounds/screamer.mp3')
    );await sound.playAsync();}


