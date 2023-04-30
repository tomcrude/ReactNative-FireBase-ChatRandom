import {Main} from "./src/views/main.jsx"
import {Chat} from "./src/views/chat.jsx"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import {LogOut} from './src/components/logOut.jsx'

export default function App({navigation}) {

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen options={{headerShown: false}} name='home' component={Main}/>
        <Stack.Screen options={{ title: 'Random-Chat',  headerLeft: () => (<LogOut/>)}} name='chat' component={Chat}/>
      </Stack.Navigator>
    </NavigationContainer>  
  );
}

