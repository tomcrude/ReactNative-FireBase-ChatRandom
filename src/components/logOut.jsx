import { View} from 'react-native';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export function LogOut() {

const navigation = useNavigation();

  return (
    <View style={{marginRight: 75,marginLeft:5,fontSize: 20,padding:6}}>
        <Icon onPress={async()=>{await AsyncStorage.removeItem('username');navigation.navigate('home')}} size={30} name='logout'/>
    </View>
  );
}