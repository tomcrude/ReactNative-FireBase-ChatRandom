import { ImageBackground, View, TextInput, FlatList,Dimensions,Image} from 'react-native';
import { useState } from 'react';
import {styles} from "../styles/chatStyles.js"
import { Icon } from 'react-native-elements'
import {ChatBox} from "../components/chatBox.jsx"
import {verifyMessage,verifyUser,getUserAsync,playSound} from "../utils/utils.js"
import {useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendMess,getAllMessages,getBackground, getScreamer, updateScreamer} from "../firebase/firebaseActions.js"
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function Chat({navigation}) {

  const [message,setMessage] = useState('')
  const [bg,setBg] = useState()
  const [commands, setCommands] = useState()
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(null)

  setUserAsync()

  const [joke, setJoke] = useState({})

  const {width} = Dimensions.get("window");

  async function getMessages(){
    let messagesArray = await getAllMessages();
    setMessages(messagesArray)
  }

  async function setUserAsync(){
    const user = await getUserAsync()
    setUser(user)
  }

  async function setBackground(){
    const url = await getBackground()
    setBg(url.url)
  }

  async function setScreamer(){
    const url = await getScreamer()
    setJoke(url)

    if(url.status === true){
      playSound()
      setTimeout(async()=>{
        await updateScreamer("",false)
      },2000)
    }      
  }

  useEffect(()=>{

    getMessages()

    setBackground()

    setInterval(()=>{

    setUserAsync() 

    verifyUser(navigation)
      
    getMessages()

    setScreamer()

    setBackground()


    
    },5000)

  },[])

  async function sendMessage(){
      setMessage('')

      const token = await AsyncStorage.getItem('token')

      const verifyMess = await verifyMessage(message)
      if (verifyMess[0] == "command" || verifyMess[0] == "" ){setCommands(verifyMess[1]); return setTimeout(()=>{setCommands(<></>)},8000)}
      const user = await AsyncStorage.getItem('username')
      await sendMess(message,user,token)
  }

  return (

    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{uri: bg}}>

        <View style={[styles.jokeImage,{display: joke.status ? "flex" : "none"}]}><Image style={{flex:1}} source={{uri: joke.status ? joke.url : "https://reactjs.org/logo-og.png"}}></Image></View>
    
        <View style={styles.chatContainer}>

        <FlatList inverted keyExtractor={(value)=>{return value.id}} style={{width: width}} data={[...messages].reverse()} renderItem={(value)=>{
 
          return (<><ChatBox id={value.item.id} showMe={value.item.user == user ? true : false} date={value.item.date} style={value.item.user != user ? styles.noUser : ""} user={value.item.user} message={value.item.mess}/></>)
        }}/>
        </View>
        {commands}

        <View style={styles.sendContainer}>
            <TextInput value={message} style={styles.sendText} onSubmitEditing={()=>{sendMessage()}} onChangeText={async (e)=>{setMessage(e)}} placeholder='Send a message'/>
            <View style={styles.sendButton}><Icon onPress={()=>{sendMessage()}} name='send'/></View>
        </View>


    </ImageBackground>
    </View>
  );}
