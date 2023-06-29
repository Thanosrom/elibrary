//React imports
import React,{useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Image, Pressable,Dimensions} from 'react-native';
//Icon Imports
import { AntDesign } from '@expo/vector-icons'; 
//API imports
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
//My imports
import Header from './Header';
import {URL} from '@env';
//Context
import UserContext from '../Context/UserContext';
//Lib Imports
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function Profile() {

  //Constructors for Image
  //const [image, setImage] = useState();
  const [imageProfile, setImageProfile] = useState();
  const {userId,username,userEmail} = useContext(UserContext);
  
  console.log(username,userEmail,userId);
  useEffect(()=>{
    axios.post(URL+'/savedProfileImage',
    {
      username : username,
    }).then((response) =>{
      console.log(response.data[0].Image)
      setImageProfile(response.data[0].Image)
    }).catch((error) =>{
      Alert.alert(error)
    })
  },[])

  //Function from expo to upload the Image from Device to the app
  async function uploadImage(){

   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      //setImage(result.assets[0].uri);
      axios.post(URL+'/saveProfileImage',
      {
        userID : userId,
        userImage : result.assets[0].uri
      }).catch((error) =>{
        Alert.alert(error)
      })
    }
  }

 return (
  <View style = {styles.container}>

     {/* Header */}
    <Header />



      <View style = {styles.secondContainer}>
    
        <Pressable style = {styles.pressableImageUser} onPress = {()=> { uploadImage() }}>
          <Text style = {styles.textImageUser}>Upload User Image</Text>
        </Pressable>

      
        <View style = {styles.containerForImageUser}>
          {/* Showing image of the user */}
          <View style = {styles.containerForProfileText}>
            <AntDesign name="user" size={24} color="white" style = {{position:'absolute',alignSelf:'baseline',marginLeft:'2%',justifyContent:'center'}}/> 
            <Text style = {styles.textProfilePicture}>Profile Picture</Text>
          </View>

          <View style = {styles.containerForImage}>
            <Image source={{ uri: imageProfile }} style = {styles.itemImage} />
          </View>
        
        </View>

        {/* Showing user name */}
        <View style = {styles.containerForUsername}>
          <Text style = {styles.textProfile}>Profile Username</Text>
          <Text style = {styles.textGlobal}>{username}</Text>
        </View>
        <View style = {styles.containerForUserEmail}>
          {/* Showing email of the user */}
          <Text style = {styles.textProfile}>Profile UserEmail</Text>
          <Text style = {styles.textGlobal}>{userEmail}</Text>
        </View>

      </View>

  </View>
  );
}

const height = Dimensions.get('window').height;

//Components Style
const styles = StyleSheet.create({
  //Basic Container  
  container: {
      height:'100%',
      width:'100%',
    },
    //Container for All except Header
   secondContainer : {
    marginTop:'5%',
    height:'75%',
    width:'85%',
    alignSelf:'center',
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    elevation:22,
  },
  //Containers for each Username - Email - Image 
  containerForUsername:{
    height:'10%',
    width:'80%',
    backgroundColor:'gold',
    alignItems:'center',
    borderRadius:15,
    justifyContent:'center'
  },
  containerForUserEmail:{
    marginTop:'2%',
    height:'10%',
    width:'80%',
    backgroundColor:'gold',
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center'
  },
  containerForImageUser:{
    alignSelf:'center',
    height:'40%',
    width:'80%',
    backgroundColor:'gold',
    marginBottom:'2%',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:2,
    marginTop:'2%',
    borderRadius:15
  },
  containerForProfileText:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
    borderRadius:15, 
    width:'60%',
    height:'20%',
    justifyContent:'center',
    marginBottom:'2%',
    marginTop:'2%'
  },
  containerForImage:{
    width:'50%',
    height:'70%',
    backgroundColor:'white',
    borderWidth:10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100
  },
  //All Images
  itemImage:{
    width:'100%',
    height:'100%',
    borderRadius:55
  },
  //All Texts
  textProfile:{
    fontSize: RFValue(15,height),
    fontWeight:'bold',
    color:'black'
  },
  textGlobal:{
    fontSize: RFValue(15,height),
    color:'black',
  },
  textImageUser:{
    textAlign:'center',
    fontSize: RFValue(15,height),
    fontWeight:'bold',
    justifyContent:'center',
    color:'black'
  },
  textProfilePicture:{
    fontSize: RFValue(15,height),
    color:'white',
    textAlign:'center'
  },
  //Pressables
  pressableImageUser:{
    width:'80%',
    height:'10%',
    backgroundColor:'gold',
    borderRadius:55,
    borderWidth:1,
    borderColor:'black',
    marginBottom:'2%',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
  }
});