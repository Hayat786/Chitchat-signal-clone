import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView,View ,TouchableOpacity} from 'react-native'
import { StyleSheet, ScrollView} from 'react-native'
import CustomListItems from"../components/CustomListItems"
import{ Avatar } from 'react-native-elements'
import{AntDesign,SimpleLineIcons} from '@expo/vector-icons'
import{FAB} from 'react-native-paper'

import { auth,db } from "../firebase";


const HomeScreen = ({navigation}) => {

const [chats,setChats] =useState([]);
    
    
    
    const signOutUser = () =>
    {
        auth.signOut().then(() => {

 navigation.replace("Login");
            
        });


    };


    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => 

        setChats(
            
            snapshot.docs.map((doc) => ({

id:doc.id,
data: doc.data(),




        }))
        )

        
        );
        return unsubscribe; 




    }, [])


useLayoutEffect(() => {
    navigation.setOptions({

        title:"Signal",
        headerStyle: {backgroundColor: "#fff"},
        headerTitleStyle: {color:"black"},
        headerTintcolor:"black",
         headerLeft: () => (
       <View style={{marginLeft:20}}>

           <TouchableOpacity onPress = {signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
            </TouchableOpacity>
            
            </View>
    ),

    headerRight: () => (


<View style={{

flexDirection: "row",
justifyContent: "space-between",
width:80,
marginRight:20,

}}>
    <TouchableOpacity onPress={()=> navigation.navigate("Camera")} activeOpacity={0.5}>
        <AntDesign name ='camerao' size={24} color='black'/>
 </TouchableOpacity>



 <TouchableOpacity onPress ={() => navigation.navigate("AddChat")} activeOpacity={0.5}>

     <SimpleLineIcons name='pencil'size={24} color="black"/>
 
 </TouchableOpacity>


</View>

    ),
         
              
           
         
        
  });



}, [navigation]);

const enterChat = (id,chatName) =>{

navigation.navigate("Chat",{

id,
chatName,

});

}
    
    
    return (
<SafeAreaView>
<ScrollView style={styles.container}>
    {chats.map(({id,data:{ chatName }}) => (
        

<CustomListItems 
key={id} id ={id} chatName={chatName} 
enterChat={enterChat}/>


    ))}

</ScrollView>

<FAB
    style={styles.fab}
    small
    icon="face-profile"
    color='black'
    onPress={() => navigation.navigate("account")}
  />


</SafeAreaView>


    );
    
    
};

export default HomeScreen

const styles = StyleSheet.create({

container:{
    height: "100%",



},
fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },


});
