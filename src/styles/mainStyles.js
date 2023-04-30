import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        alignItems: 'center',
      },
      h1:{
        fontSize: 40,
        color: "rgb(255,255,255)",
        letterSpacing: 2,
        marginTop: 205,
        marginBottom: 100
      },
      container2:{
        backgroundColor: "rgb(255,255,255)",
        width:300,
        height:200,
        borderRadius: 15,
        textAlign: "center",
        padding: 15
      },
      h2:{
        textAlign:"center",
        fontSize:20,
        fontWeight: 600
      },
      input:{                 
        borderBottomWidth: 1,
        fontSize:16,
        marginBottom: 40,
        marginTop:30
      },
      message:{
        color: "rgb(255,0,0)",
        marginBottom: 10,
        marginTop: -25
      }
})

