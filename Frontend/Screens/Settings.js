//React imports
import React, { useState,useContext } from 'react';
import { StyleSheet, Text, View , Image, TextInput, Pressable, Modal, Dimensions , KeyboardAvoidingView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//APIs imports
import axios from 'axios';
//My imports
import Header from './Header';
//.Env imports
import {URL} from '@env';
//Context
import UserContext from '../Context/UserContext';
//Lib Imports
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function Settings() {

  //Use of navigation Hook
  const navigation = useNavigation();
  
  //Constructors for modals
  const [modalChangeUsernameVisible,setModalChangeUsernameVisible] = useState(false);
  const [modalChangePasswordVisible,setModalChangePasswordVisible] = useState(false);
  const [modalChangeEmailVisible,setModalChangeEmailVisible] = useState(false);
  const [modalDeleteVisible,setModalDeleteVisible] = useState(false);

  //Constructors for profile edit
  const [newUpdateUsername,setNewUpdateUsername] = useState();
  const [newUpdatePassword,setNewUpdatePassword] = useState();
  const [newUpdateRepeatPassword,setNewUpdateRepeatPassword] = useState();
  const [newUpdateEmail,setNewUpdateEmail] = useState();
  const {userId,userPassword,userEmail,username} = useContext(UserContext);
  
  //Request to update username
  function updateUsername(){
      axios.post(URL+"/updateUsername",
        {
          newUsernameAXIOS : newUpdateUsername,
          idAXIOS : userId
        }).then((response)=>{
          if(response.data == true){
            Alert.alert("Username Changed")
          }
          else{
            Alert.alert("Something Went wrong")
          }
        }).catch((error) => {
          console.log("Update axios username error")
        })
       }
    
    
    //Request to update user email
    function updateEmail(){
        axios.post(URL+"/updateEmail",
          {
            newEmailAXIOS : newUpdateEmail,
            idAXIOS : userId
          }).then((response)=>{
            if(response.data == true){
              Alert.alert("Email Changed")
            }
            else{
              Alert.alert("Something Went wrong")
            }
          }).catch((error) => {
            console.log("Update axios Email error")
          })
      }

    //Request to update user password
    function updatePassword(){
        if(newUpdatePassword == newUpdateRepeatPassword){
        axios.post(URL+"/updatePassword",
          {
            newPasswordAXIOS : newUpdatePassword,
            newRepeatPasswordAXIOS : newUpdateRepeatPassword,
            idAXIOS : userId
          }).catch((error) => {console.log("Update axios Password error")})
          Alert.alert("Password Changed")
        }
         else {
          Alert.alert("Paswords does not match")
         }
      }

      //Request to delete user
      function updateDelete(){
          axios.post(URL+"/updateDelete",
            {
              idAXIOS : userId
            }).then((response)=>{
              if(response.data == true){
                Alert.alert("User Deleted")
              }
              else{
                Alert.alert("Something Went wrong")
              }
            }).catch((error) => {
              console.log("Delete axios error")
            })
        }

return (
  
  <View style = {styles.container}>

    {/* Header */}
    <Header />

    {/* Container for Image and settings Text */}
    <View style = {styles.imageView}>  
      <Text style = {styles.settingsPageText}>Settings Page</Text>
      <Image 
        style = {styles.settingsImage}
        source = {require('../assets/settings1.png')}  
      />
    </View>
   
   
    {/* Containers for the Settings Menu */}
    <View style = {{backgroundColor:'black' ,borderWidth:5,borderRadius:15,width:'85%',height:'50%',alignSelf:'center',justifyContent:'center'}}>
        
      <View style = {styles.changeViewFirst}>
        <Text style = {styles.changeText}>Username Settings</Text>
        <Pressable style = {styles.changePressable} onPress = {() => setModalChangeUsernameVisible(!modalChangeUsernameVisible)}>
          <Text style = {styles.changePressableText}>Change Username</Text>
        </Pressable>
      </View>

     
      <View style = {styles.changeView}>
        <Text style = {styles.changeText}>Email Settings</Text>
        <Pressable style = {styles.changePressable} onPress = {() => setModalChangeEmailVisible(!modalChangeUsernameVisible)}>
          <Text style = {styles.changePressableText}>Change Email</Text>
        </Pressable>
      </View>

    
      <View style = {styles.changeView}>
        <Text style = {styles.changeText}>Password Settings</Text>
        <Pressable style = {styles.changePressable} onPress = {() => setModalChangePasswordVisible(!modalChangeUsernameVisible)}>
          <Text style = {styles.changePressableText}>Change Password</Text>
        </Pressable>
      </View>

      <View style = {styles.deleteAccountView}>
      <Text style = {styles.deleteAccountText}>Do you wan't to delete your Account? </Text>
        <Pressable style = {styles.deleteAccountPressable} onPress = {() => setModalDeleteVisible(!modalDeleteVisible)}>
          <Text style = {styles.changePressableText}>Delete Account</Text>
        </Pressable>
      </View>
      
  </View>

 
  {/* All Modals for settings  */}

  {/* Username Modal */}


  <Modal
    animationType="slide"
    transparent={true}
    visible={modalChangeUsernameVisible}
    onRequestClose={() => {
      setModalChangeUsernameVisible(!modalChangeUsernameVisible);
    }}
  >
    <KeyboardAvoidingView
      style={{ height: Platform.OS ==='ios' ? Dimensions.get('window').height * 1 : Dimensions.get('window').height * 1}}
      behavior={(Platform.OS === 'ios') ? '' : ''}
      enabled
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
    >

    <View style = {styles.modalView}>

      <TextInput 
          style = {styles.modalFirstTextInput}
          placeholder='New Username'
          placeholderTextColor = 'grey'
          onChangeText={newUpdateUsername => setNewUpdateUsername(newUpdateUsername)}
        />

      <Pressable style = {styles.modalFirstPressable} onPress = {()=> {updateUsername()}}>
        <Text style = {styles.modalFirstText}>Change</Text>
      </Pressable>
   
      <Pressable style = {styles.closeModalPressable} onPress = {()=> {setModalChangeUsernameVisible(!modalChangeUsernameVisible)}}>
        <Text style = {styles.closeModalText}>Close Modal</Text>
      </Pressable>
    </View>
    </KeyboardAvoidingView>
  </Modal>
  



  {/* Email Modal */}
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalChangeEmailVisible}
    onRequestClose={() => {
      setModalChangeEmailVisible(!modalChangeEmailVisible);
    }}
  >
    <KeyboardAvoidingView
      style={{ height: Platform.OS ==='ios' ? Dimensions.get('window').height * 1 : Dimensions.get('window').height * 1}}
      behavior={(Platform.OS === 'ios') ? '' : ''}
      enabled
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
    >
    <View style = {styles.modalView}>

      <TextInput 
          style = {styles.modalFirstTextInput}
          placeholder='New Email'
          placeholderTextColor = 'grey'
          onChangeText={newUpdateEmail => setNewUpdateEmail(newUpdateEmail)}
        />

      <Pressable style = {styles.modalFirstPressable} onPress = {()=> {updateEmail()}}>
        <Text style = {styles.modalFirstText}>Change</Text>
      </Pressable>
   
      <Pressable style = {styles.closeModalPressable} onPress = {()=> {setModalChangeEmailVisible(!modalChangeEmailVisible)}}>
        <Text style = {styles.closeModalText}>Close Modal</Text>
      </Pressable>
    </View>

    </KeyboardAvoidingView>

  </Modal>
  

  {/* Password Modal */}
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalChangePasswordVisible}
    onRequestClose={() => {
      setModalChangeEmailVisible(!modalChangePasswordVisible);
    }}
  >
    <KeyboardAvoidingView
      style={{ height: Platform.OS ==='ios' ? Dimensions.get('window').height * 1 : Dimensions.get('window').height * 1}}
      behavior={(Platform.OS === 'ios') ? '' : ''}
      enabled
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
    >  
    <View style = {styles.modalView}>

      <TextInput 
          style = {styles.modalFirstTextInput}
          placeholder='Password'
          placeholderTextColor = 'grey'
          onChangeText={newUpdatePassword => setNewUpdatePassword(newUpdatePassword)}
        />

      <TextInput 
          style = {styles.modalFirstTextInput}
          placeholder='Repeat Password'
          placeholderTextColor = 'grey'
          onChangeText={newUpdateRepeatPassword => setNewUpdateRepeatPassword(newUpdateRepeatPassword)}
        />

      <Pressable style = {styles.modalFirstPressable} onPress = {()=> {updatePassword()}}>
        <Text style = {styles.modalFirstText}>Change</Text>
      </Pressable>
   
      <Pressable style = {styles.closeModalPressable} onPress = {()=> {setModalChangePasswordVisible(!modalChangePasswordVisible)}}>
        <Text style = {styles.closeModalText}>Close Modal</Text>
      </Pressable>
    </View>

    </KeyboardAvoidingView>  

  </Modal>


    {/* Delete Modal */}
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalDeleteVisible}
    onRequestClose={() => {
      setModalDeleteVisible(!modalDeleteVisible);
    }}
  >

    <View style = {styles.modalDeleteView}>
        <Text style = {{color:'white',fontWeight : 'bold', marginTop:'20%'}}>Are you sure you for this action ?</Text>
        <Pressable style = {styles.closeModalPressable} onPress = {() => {updateDelete(); navigation.navigate('LogInPage')}}>
        <Text style = {styles.closeModalText}>Yes</Text>
        </Pressable>

        <Pressable style = {styles.closeModalPressable}  onPress = {() => setModalDeleteVisible(!modalDeleteVisible)}>
        <Text style = {styles.closeModalText}>No</Text>
        </Pressable>

    </View>

  </Modal>



</View>
  );
}

const height = Dimensions.get('window').height;

//Components Style
const styles = StyleSheet.create({
  //Container
  container: {
    height:'100%',
    width:'100%', 
    backgroundColor:'white',
  },
  //For the Image
  imageView:{
    height:'30%',
    width:'100%',
    alignItems:'center',
    },
  //For Settings Image and Text
  settingsImage:{
    resizeMode:'contain',
    height:Platform.OS ==='ios' ? '100%' : '80%',
    width:'40%'
  },
  settingsPageText:{
    fontSize: RFValue(25,height),
    fontWeight:'bold'
  },
  //For Settings Menu
  changeViewFirst:{
    marginBottom:Platform.OS ==='ios' ? '1%' : '2%',
    alignItems:'center',
    justifyContent:'center',
    height:'13%',
    width:'100%',
  },
  changeView:{
    marginTop:Platform.OS ==='ios' ? '8%' : '5%',
    marginBottom:Platform.OS ==='ios' ? '1%' : '2%',
    alignItems:'center',
    justifyContent:'center',
    height:'13%',
    width:'100%',
  },
  changeText:{
    fontSize: RFValue(17,height),
    fontWeight:'bold',
    color:'white'
  },
  changePressable:{
    marginTop:'2%',
    elevation:44,
    backgroundColor:'gold',
    borderRadius:11,
    borderColor:'black',
    borderWidth:1,
    width:'50%',
    height:'80%',
    alignItems:'center',
    justifyContent:'center',
  },
  changePressableText:{
    fontSize: RFValue(15,height),
    justifyContent:'center',
    alignItems:'center'
  },
  //Special for Delete Button and Text
  deleteAccountView:{
    marginTop:Platform.OS ==='ios' ? '8%' : '5%',
    alignItems:'center',
    height:'13%',
    width:'100%',
  },
  deleteAccountPressable:{
    marginTop:'2%',
    elevation:44,
    backgroundColor:'gold',
    borderWidth:1,
    borderRadius:11,
    borderColor:'black',
    width:'45%',
    height:'80%',
    alignItems:'center',
    justifyContent:'center',
  },
  deleteAccountText:{
      color:'white',
      fontSize: RFValue(15,height),
  },
  //For Modal
  modalView:{
    width:'65%',
    height:'45%',
    marginTop:Platform.OS === 'ios' ? '50%' : '50%',
    marginLeft:'20%',
    backgroundColor:'black',
    borderRadius:15,
    alignItems:'center'
  },
  modalDeleteView:{
    width:'65%',
    height:'40%',
    marginTop:Platform.OS === 'ios' ? '50%' : '30%',
    marginLeft:'20%',
    backgroundColor:'black',
    borderRadius:15,
    alignItems:'center',
  },
  modalFirstTextInput:{
    fontSize: RFValue(15,height),
    height: '9%',
    backgroundColor:'white',
    borderRadius:15,
    marginTop:'20%',
    width:'55%',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  modalFirstPressable:{
   height: '9%',
   color:'white',
   marginTop:'16%',
   borderWidth:2,
   borderRadius:5,
   width:'55%',
   alignItems:'center',
   borderColor:'white',
   justifyContent:'center'
  },
  modalFirstText:{
   color:'white',
   fontSize: RFValue(15,height),
  },
  closeModalPressable:{
   height:'9%',
   color:'white',
   marginTop:'14%',
   borderWidth:2,
   borderRadius:5,
   width:'55%',
   alignItems:'center',
   borderColor:'white',
   justifyContent:'center'
  },
  closeModalText:{
   color:'white', 
   fontSize: RFValue(15,height),
  }

});