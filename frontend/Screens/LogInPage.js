//React imports
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View , Image, TextInput, Pressable, Platform, Alert , Dimensions , KeyboardAvoidingView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Icon Imports
import { AntDesign,Entypo } from '@expo/vector-icons'; 
//APIs imports
import axios from 'axios';
//.Env imports
import {URL} from '@env';
//Context Import
import UserContext from '../Context/UserContext';
//Lib Imports
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function LogInPage() {

  //Constructors for user data - profile
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const {loginUser} = useContext(UserContext);
  

  const usernameArray = 'USERNAME';
  const usernameArray2 = usernameArray.split('');

  
  const passwordArray = 'PASSWORD';
  const passwordArray2 = passwordArray.split('');
  
  //Navigation Screen
  const navigation = useNavigation();

  //Request to check if profile details are correct
  function getProfile(){

      axios.post(URL+'/checkData',
      {
        usernameCheckAXIOS : username,
        passwordCheckAXIOS : password, 
      })
      .then((response)=>{
        console.log(response.data.dataOfProfile)
        
        const userData = {
          username: response.data.dataOfProfile.username,
          id: response.data.dataOfProfile.id,
          image: response.data.dataOfProfile.image,
          email: response.data.dataOfProfile.email,
          password : response.data.dataOfProfile.password
        };
        loginUser(userData);

        if(response.data.responseOfProfile == false){
          Alert.alert("Access Dinied")
        }
        else{
          navigation.navigate('Home')
        }

      }).catch((error) => {
        
      })

  }

  return (

   <KeyboardAvoidingView
    style={{ height: Platform.OS ==='ios' ? Dimensions.get('window').height * 1 : Dimensions.get('window').height * 1}}
    behavior={(Platform.OS === 'ios') ? 'position' : "position"}
    enabled
    keyboardVerticalOffset={Platform.select({ ios: -80, android: -80 })}
   >
   <View>

    {/* Page Container */}
    <View style={styles.container}>

      <View style = {styles.logoContainer}>     
        <Image 
          style = {styles.logo}
          source={require('../assets/book1.png')} 
        />
      </View>

      {/* Login system container without the image */}
      <View style = {styles.LogInSystem}>

        {/* Gold username */}
        <View style = {styles.containerGoldBlack}>
          
            {usernameArray2.map((item)=>{
                return (
                  <View style = {styles.viewGOLD}> 
                   <Text style = {styles.textGOLD}>{item}</Text>
                  </View>
                )
            })}
        
          
        </View>
     
        {/* TextInput Container for username */}
        <View style = {styles.username}>
          <AntDesign name="user" size={20} color="gold"/>
          <TextInput 
            placeholder=' Username'
            onChangeText={newUsername => setUsername(newUsername)}
            style = {styles.textInputStyle}
          />
        </View> 

        {/* Black password */}
        <View style = {styles.containerGoldBlack}>

          {passwordArray2.map((item)=>{
                return (
                  <View style = {styles.viewBLACK}> 
                    <Text style = {styles.textBLACK}>{item}</Text>
                  </View>
                )
            })}
        

        </View>
        {/* TextInput Container for password */}
        <View style = {styles.password}>
          <Entypo name="key" size={20}  color="black"/>
          <TextInput
            placeholder=' Password'
            onChangeText={newPassword => setPassword(newPassword)}
            style = {styles.textInputStyle}
            secureTextEntry={true}
          />
        </View> 

        {/* Pressable for Sing In */}
        <Pressable style = {styles.pressableSignIn} onPress = {() => {getProfile()}}>
          <Text style = {styles.signText}>Sign in</Text>
        </Pressable>
         
        {/* Pressable for Sing Up */}
        <Pressable style = {styles.pressableSignUp} onPress = { () => navigation.navigate('SignUpPage')}>
          <Text style = {styles.signText}>Sign Up</Text>
        </Pressable>
        
      </View> 

    </View>

  </View>

  </KeyboardAvoidingView>
  );
  
}

const height = Dimensions.get('window').height;

//Components style
const styles = StyleSheet.create({
  //Basic Container
  container:{
    width:'100%',
    height:'103%',
    backgroundColor:'white',
  },
  //Logo Container
  logo: {
    width:'60%',
    height:'60%',
    resizeMode:"contain",
    marginBottom:'-20%'
  },
  logoContainer:{
    alignItems: 'center',
    marginTop:'20%',
    height:'30%',
    marginTop:'30%'
  },
  //Login System container
  LogInSystem:{
    alignItems:'center',
    height:'60%'
  },
 //------------------START BLACK AND GOLD
  containerGoldBlack:{
    flexDirection:'row'
  },
  viewGOLD:{
    marginTop:'1%',
    width:'7%',
    backgroundColor:'gold',
    paddingLeft:'2%',
    paddingRight:'2%',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'0.5%',
    display:'flex',
    flexDirection:'row'
  },
  textGOLD:{
    fontSize: RFValue(15,height),
    color:'white'
  },
  viewBLACK:{
    marginTop:'1%',
    width:'7%',
    backgroundColor:'black',
    paddingLeft:'2%',
    paddingRight:'2%',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'0.5%',
    display:'flex',
    flexDirection:'row'
   },
  textBLACK:{
    fontSize: RFValue(15,height),
    color:'white'
  },
  //--------------------END BLACK AND GOLD
  username:{
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius:5,
    width:'65%',
    height:Platform.OS ==='ios' ? '10%' : '12%',
    marginBottom:'3%',
    flexDirection:'row',
    paddingLeft:'2%',
    alignItems:'center',
  },
  password:{
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius:5,
    width:'65%',
    height:Platform.OS ==='ios' ? '10%' : '12%',
    marginBottom:'3%',
    flexDirection:'row',
    paddingLeft:'2%',
    alignItems:'center',
 },
  pressableSignIn:{
    alignItems:'center',
    borderRadius:16,
    borderWidth: 1,
    backgroundColor:'gold',
    height:Platform.OS ==='ios' ? '9%' : '10%',
    width:'45%',
    justifyContent:'center',
  },
  pressableSignUp:{
    marginTop:'3%',
    alignItems:'center',
    borderRadius:16,
    borderWidth: 1,
    backgroundColor:'gold',
    height:Platform.OS ==='ios' ? '9%' : '10%',
    width:'45%',
    justifyContent:'center'
  },
  signText:{
    fontSize: RFValue(15,height),
  },
  textInputStyle:{
    fontSize: RFValue(15,height),
  }
 
});
