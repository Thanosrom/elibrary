//React imports
import React, { useState,useEffect} from 'react';
import { StyleSheet, Text, View , Image, Pressable, ScrollView, Modal, Alert, Dimensions , Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//My imports
import Header from './Header';
//Lib Imports
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MyBooks() {

  //Use of navigate Hook
  const navigation = useNavigation();

  return (
 
  //Container
  <View style = {styles.container}>
    
    <Header />

   
    <View style = {styles.secondContainer}>
      <Text style = {styles.collectionText}>Collection</Text>
      <Pressable style = {styles.pressables} onPress = {()=> {navigation.navigate('BooksBought')}}>
        <Text style = {styles.textsPressables}>Show Bought Books</Text>
      </Pressable>

      <Pressable style = {styles.pressables} onPress = {()=> {navigation.navigate('BooksRented')}}>
        <Text style = {styles.textsPressables}>Show Rented Books</Text>
      </Pressable>

    </View>

  </View>
 

  );
}
const height = Dimensions.get('window').height;

//Components Style
const styles = StyleSheet.create({
  //Basic Container
  container:{
    backgroundColor:'white', 
    height:'100%',
    width:'100%',
  },
  //Second Container for All
  secondContainer:{
    width:'90%',
    height:'50%',
    backgroundColor:'black',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    marginTop:'20%',
    borderRadius:15
  },
  //All Texts
  textsPressables:{
    color:'black',
    fontSize: RFValue(15,height),
    fontWeight:'bold'
  },
  collectionText:{
    fontSize: RFValue(22,height),
    color:'gold',
    fontWeight:'bold'
  },
  pressables:{
    width:'50%',
    height:'10%',
    backgroundColor:'gold',
    marginTop:'3%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15
  }
});