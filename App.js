import 'react-native-gesture-handler';
import React, { useEffect, useState} from 'react'
import { StyleSheet,View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import { createStackNavigator,} from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import AccountScreen from './screens/AccountScreen';
import { auth, firestore } from 'firebase';
import{AntDesign} from '@expo/vector-icons'


const Stack = createStackNavigator();

const globalScreenOptions =
 {

  headerStyle: {backgroundColor:"#2C6BED"},
  headerTitleStyle:{color:"white"},
  headerTintcolor:"white",
}

export default function App() {

  const [user,setuser] = useState('')

  useEffect(()=>{
const unregister = auth().onAuthStateChanged(userExist=>{

if(userExist){

firestore().collection('users').doc(userExist.uid)
.update({

  status:"online"
})
setuser(userExist)


}
else setuser("")

})

return ()=>{

  unregister()
}

},[])

  return (
    
    <NavigationContainer>

<Stack.Navigator

screenOptions ={globalScreenOptions}>

{  
user?
        <>
        <Stack.Screen name="home"  options={{
          headerRight:()=><AntDesign
           name='profile'
           size={34}
           color="green"
           style={{marginRight:10}}
           onPress={()=>{
             firestore().collection('users')
             .doc(user.uid)
             .update({
              status:firestore.FieldValue.serverTimestamp()
             }).then(()=>{
                 auth().signOut()
             })
           
         
           }}
           />,
          title:"Signal"
        }}> 
         {props => <HomeScreen {...props}  user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Chat" options={({ route }) => ({ title:<View><Text>{route.params.name}</Text><Text>{route.params.status}</Text></View> })}>
          {props => <ChatScreen {...props} user={user} /> }
        </Stack.Screen>
        <Stack.Screen name="account">
          {props => <  AccountScreen {...props} user={user}/> }
        </Stack.Screen>
        <Stack.Screen name="AddChat" component={AddChatScreen}/>
        </>
        :
        <>
        
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        
        </>
        
        }

</Stack.Navigator>

    </NavigationContainer>
    
    
  );
}

const styles = StyleSheet.create({
  container: {

    flex : 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#ffff",
  },
});
