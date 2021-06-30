import { auth, firestore } from 'firebase'
import React ,{useEffect,useState, useLayoutEffect} from 'react'
import { View, Text,ActivityIndicator ,StyleSheet,Image ,TouchableOpacity} from 'react-native'
import { Button } from 'react-native-paper'
import { Avatar } from 'react-native-paper'



export default function AccountScreen({user,navigation}) {




    const [profile,setProfile] = useState('')


    const signOutUser = () =>
    {
        auth.signOut().then(() => {

 navigation.replace("Login");
            
        });


    };



    useLayoutEffect(()=>{

        navigation.setOptions({
            title:"Signal",
            headerStyle: {backgroundColor: "#fff"},
        headerTitleStyle: {color:"black"},
        headerTintcolor:"black",
            headerLeft: () =>(


<View style={{marginLeft:20}}>


 
 </View>

    

            )


            
        

        })





    },[navigation])

useEffect(()=>{


firestore().collection('users').doc(user.uid).get().then(docSnap=>{

setProfile(docSnap.data())


})

},[navigation])
    return (
        <View style={styles.container}>
             
            <Image style={styles.img} source={{uri:auth?.currentUser?.photoURL}} />
            <Text>Name -{signOutUser}</Text>
<Button 
style={styles.btn}
onPress={()=>{
    firestore().collection('users')
    .doc(user.uid)
    .update({
        status:firestore.FieldValue.serverTimestamp()
    }).then(()=>{
        auth().signOut()
    })


}}>
    
Logout</Button>
            
           
           
        </View>



    )
}

const styles = StyleSheet.create({
    container:
    {

        flex:1,
        backgroundColor:"green",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    img:{
        width:200,
        height:200,
        borderRadius:100,
        borderWidth:3,
        borderColor:"white"
    },
    text:{
        fontSize:23,
        color:"white"
    },
    btn:{
        borderColor:"white",
        borderWidth:3
    }



})