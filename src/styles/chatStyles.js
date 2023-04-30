import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      jokeImage:{
        width: '100%',
        height: '100%',
        zIndex: 10,
        position: 'absolute'
      }
      ,
      image: {
        flex: 1,
      },
      chatContainer:{
        flex: 1,
        width: "100%",
        borderColor: "rgb(255,255,255)",
        padding:10,
        alignItems: 'center',
        overflowY: "scroll"
      },
      sendContainer:{
        backgroundColor: "rgb(255,255,255)",
        flexDirection: "row",
        width: "100%",
        borderRadius: 25,
        height:45,
        marginBottom: 8,
        padding:5
      },
      sendText:{
        flex: 0.95,
        paddingLeft:25
      },
      sendButton:{
        padding:5
      },

      // ChatBox Component.

      chatBoxContainer:{
        flexDirection: "row",
        backgroundColor:"rgb(0,255,0)",
        width:"90%",
        padding:17,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignSelf: 'flex-end',
        margin: 10,
      },
      noUser:{
        backgroundColor:"rgb(255,255,255)",
        alignSelf: 'flex-start',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 15
      }
      ,
      commands:{
        backgroundColor:"rgb(33,198,255)",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 25
      }
      ,
      chatBoxUser:{
        fontWeight: 700,
        paddingRight: 10,
        fontSize:16
      },
      chatBoxMessage:{
        fontSize:15,
        flexShrink: 1
      },
      chatDate:{
        position: 'absolute',
        transform: [{translateX: 75}, {translateY: -12}],
        alignSelf:'flex-start',
        fontSize:10,
        fontWeight: 700,
      },
      deleteIcon:{
        position: 'absolute',
        zIndex:1,
        right: 5,
        fontSize: 10,
        backgroundColor: 'rgb(255,0,0)',
        borderRadius: 25,
        padding: 2,
        top:1
      }
      
})

