import { FlatList, Text, View} from 'react-native';
import {styles} from "../styles/chatStyles.js"
import { Icon } from 'react-native-elements'
import {removeMessage} from "../firebase/firebaseActions.js"

export function ChatBox(props) {

  async function remove(){removeMessage(props.id)}

  return (
    <>
    {props.showMe && (
      <View style={styles.deleteIcon}><Icon onPress={()=>{remove()}} color={'rgb(255,255,255)'} name='delete'/></View>
    )}
    <View style={props.user != "user" ? [styles.chatBoxContainer,props.style] : [styles.chatBoxContainer]}>
        <Text style={styles.chatBoxUser}>{props.user}:</Text>
        <Text style={styles.chatBoxMessage}>{props.message}</Text>
    </View>
    <Text style={styles.chatDate}>{props.date}</Text>
    </>
  );
}