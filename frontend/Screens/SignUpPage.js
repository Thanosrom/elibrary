//React imports
import React, { useState } from 'react';
import { StyleSheet, Text, View , Image, TextInput,Pressable, Platform, Alert,  Dimensions , KeyboardAvoidingView, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Icon Imports
import { AntDesign,Entypo } from '@expo/vector-icons'; 
//APIs imports
import axios from 'axios';
//.Env imports
import {URL} from '@env';
//Lib Imports
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function SignUpPage() {

  //Constructors for user data - profile
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [repeatPassword,setRepeatPassword] = useState('');
  const [email,setEmail] = useState('');
  const [randomGenerator,setRandomGenerator] = useState('');
  const [modalLookVisible,setModalLookVisible] = useState(false);
  const [newVerifier,setNewVerifier] = useState();
  //Navigation Screen
  const navigation = useNavigation();
  
  function emailSender(){
    if(username.length>0 && (password == repeatPassword) && password.length>0 && repeatPassword.length>0 && email.length>0 ){
    axios.post(URL+'/emailSender',
        {
          usernameAXIOS : username,
          emailAXIOS : email  
        }).then((response)=>{
          console.log(response.data)
          setRandomGenerator(response.data)
        }).catch((error)=>console.log(error))
        Alert.alert("Check your email for verification code")
      }
      else{
        Alert.alert("Something went wrong")
      }
  }

  //Request to register user data
  function sendProfileData(){
        axios.post(URL+'/signUpData',
        {
          usernameAXIOS : username,
          passwordAXIOS : password,
          repeatPasswordAXIOS : repeatPassword,
          emailAXIOS : email  
        }).then((response)=>{
          console.log(response.data)
        })
      }
      
function checker(){
  if(newVerifier == randomGenerator){
    Alert.alert("Correct ,the user is verified")
    sendProfileData()
  }
  else{
    Alert.alert("Digits are not correct,please try again!")
  }

}
  return (
   
  <KeyboardAvoidingView
    style={{ height: Platform.OS ==='ios' ? Dimensions.get('window').height * 1 : Dimensions.get('window').height * 1}}
    behavior={(Platform.OS === 'ios') ? 'position' : "position"}
    enabled
    keyboardVerticalOffset={Platform.select({ ios: -80, android: -60 })}
  >
    <View style = {styles.container}>
      
      <View style = {styles.logoContainer}>     
        <Image 
          style = {styles.logo}
          source={require('../assets/book1.png')} />
      </View>

      <View style = {styles.register}>
   
        <View   style = {styles.viewsContainers}>
          <AntDesign name="user" size={20} color="gold" style = {{paddingTop: Platform.OS ==='ios' ? '4%' : '2%'}}/>
          <TextInput 
            style = {styles.correctTextInput}
            placeholder=' Username'
            onChangeText={newUsername => setUsername(newUsername)}
          />
        </View> 

      
        <View style = {styles.viewsContainers}>
          <Entypo name="key" size={20} color="gold" style = {{paddingTop: Platform.OS ==='ios' ? '4%' : '2%'}}/>
          <TextInput
            style = {styles.correctTextInput}
            placeholder=' Password'
            onChangeText={newPassword => setPassword(newPassword)}
            secureTextEntry={true}
          />
        </View> 

      
        <View style = {styles.viewsContainers}>
          <Entypo name="key" size={20} color="gold" style = {{paddingTop: Platform.OS ==='ios' ? '4%' : '2%'}} />
          <TextInput 
            style = {styles.correctTextInput}
            placeholder=' Repeat Password'
            onChangeText={newRepeatPassword => setRepeatPassword(newRepeatPassword)}
            secureTextEntry={true}
          />
        </View> 

      
        <View style = {styles.viewsContainers}>
          <Entypo name="email" size={20} color="gold"style = {{paddingTop: Platform.OS ==='ios' ? '4%' : '2%'}} />
          <TextInput 
            style = {styles.correctTextInput}
            placeholder=' Email'
            onChangeText={newEmail => setEmail(newEmail)}
          />
        </View> 

          <Pressable style = {styles.pressables} onPress = {()=>{emailSender()}}>
            <Text style = {styles.correctTextButton}>Sign up</Text>
          </Pressable>

          <Pressable style = {styles.pressables} onPress = {()=>{setModalLookVisible(!modalLookVisible)}}>
            <Text style = {styles.correctTextButton}>Open Verification Modal</Text>
          </Pressable>

          <Pressable style = {styles.pressables} onPress = {() => navigation.navigate('LogInPage') }>
            <Text style = {styles.correctTextButton}>Back</Text>
          </Pressable>

   
        </View>  

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLookVisible}
        onRequestClose={() => {
        setModalLookVisible(!modalLookVisible);
      }}
      >
     <KeyboardAvoidingView
        style={{ height: Platform.OS ==='ios' ? Dimensions.get('window').height * 1.8 : Dimensions.get('window').height * 1.5}}
        behavior={(Platform.OS === 'ios') ? 'position' : 'position'}
        enabled
        keyboardVerticalOffset={Platform.select({ ios: -980, android: -550 })}
       >
      <View style = {styles.verificationModal}>
        <Text style = {{textAlign:'center',fontSize:15}}>Please write the six digits verification code : </Text>
        <TextInput 
          placeholder='6-digit number'
          placeholderTextColor = 'grey'
          style = {styles.textInputDigit}
          onChangeText={newVerifier => setNewVerifier(newVerifier)}
        />
        <Pressable onPress = {()=>{checker()}} style = {{alignItems:'center',borderRadius:16,borderWidth: 1,backgroundColor:'gold',width:'45%',height:'10%',paddingTop:'1%',marginTop:'15%',marginLeft:'25%'}}>
          <Text style = {styles.correctTextButtonModal}>Verify</Text>
        </Pressable>

        <Pressable onPress = {()=>{setModalLookVisible(!modalLookVisible)}}style = {{alignItems:'center',borderRadius:16,borderWidth: 1,backgroundColor:'gold',width:'45%',height:'10%',paddingTop:'1%',marginTop:'15%',marginLeft:'25%'}}>
          <Text style = {styles.correctTextButtonModal}>Close</Text>
        </Pressable>
      </View>   
      </KeyboardAvoidingView>
      </Modal>
   

      </View>

      </KeyboardAvoidingView>
    
  );
}

const height = Dimensions.get('window').height;

//Components Style
const styles = StyleSheet.create({
  //Basic container
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'white',
  },
  //Logos container
  logo: {
    width:'60%',
    height:'60%',
    resizeMode:"contain",
    marginTop:'10%'
  },
  logoContainer:{
    alignItems:'center',
    backgroundColor:'white',
    height:'30%',
    marginTop:'5%',
    marginBottom:'5%'
  },
  //Container for register
  register:{
    alignItems:'center',
    marginTop:'0%',
  },
  //Container for each textinput and its elements
  viewsContainers:{
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius:5,
    width:'50%',
    height:Platform.OS ==='ios' ? '8.5%' : '9.5%',
    marginBottom:'3%',
    flexDirection:'row',
    paddingLeft:'2%',
    alignItems:'center',
  },
  pressables:{
    alignItems:'center',
    borderRadius:16,
    borderWidth: 1,
    backgroundColor:'gold',
    width:'45%',
    height:'8%',
    justifyContent:'center',
    marginBottom:'2%'
  },
  correctTextButton:{
    fontSize: RFValue(15,height),
  },
  correctTextInput:{
    fontSize: RFValue(15,height),
  },
  //For Verification Digits Modal
  verificationModal:{
    backgroundColor:'white',
    marginTop:Platform.OS ==='ios' ? '55%' : '40%',
    height:Platform.OS ==='ios' ? '34%' : '40%',
    width:'50%',
    marginLeft:'25%',
    borderRadius:15,
    borderColor:'black',
    borderWidth:2,
    paddingTop:Platform.OS ==='ios' ? '9%' : '0.3%',
  },
  textInputDigit:{
    textAlign:'center',
    marginTop:'20%',
    borderWidth:2,
    borderRadius:11,
    fontSize: RFValue(15,height),
    color:'black',
    height:'15%'
  },
  correctTextButtonModal:{
    fontSize: RFValue(15,height),
    textAlign:'center',
  }

});
