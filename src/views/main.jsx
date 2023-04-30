import { ImageBackground, Text, View, TextInput,Button,Keyboard} from 'react-native';
import {  useState } from 'react';
import {styles} from "../styles/mainStyles.js"
import {createUser} from "../firebase/firebaseActions.js"
import {verify} from "../utils/utils.js"
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Main({navigation}) {

  const [keyboard, setKeyboard] = useState(false)

  const keyboardShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      setKeyboard(true)
    }
    );
  const keyboardHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      setKeyboard(false)
    }
);


  const [name,setname] = useState('')
  const [message,setMessage] = useState(null)
  

  async function send(){


    const verifyUsername = await verify(name);

    if (verifyUsername !== "success"){return setMessage(verifyUsername)}

    let query = await createUser(name)
      
    if (query === '400'){
      return setMessage("An error has occurred.")
    }
    
    await AsyncStorage.setItem('token',query)
    await AsyncStorage.setItem('username',name)
    
    navigation.navigate('chat')
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{uri:'https://firebasestorage.googleapis.com/v0/b/projectx-7ad0d.appspot.com/o/back-4.png?alt=media&token=70b53e3c-ee7e-4922-b3b8-89eb69a1f532'}}>
        <Text style={styles.h1}>Welcome to Random-Chat</Text>
        <View style={[styles.container2,{ marginTop: keyboard == true ? -80: 5}]}>
            <Text style={styles.h2}>Introduce a name</Text>
            <TextInput style={styles.input} onSubmitEditing={()=>{send()}} onChangeText={(e)=>{setname(e)}} placeholder='Introduce a username here.'/>
            <Text style={styles.message}>{message}</Text>
            <Button title='Continue' onPress={()=>{send()}}/>
        </View>

      </ImageBackground>
    </View>
  );
}

