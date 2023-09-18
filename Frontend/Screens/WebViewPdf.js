//React imports
import React from 'react';
import { StyleSheet, View,Text,Pressable, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Lib Imports
import {WebView} from 'react-native-webview';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function WebViewPdf({route}) {

 //Use of navigate Hook
 const navigation = useNavigation();

 //Local Variables 
 const bookItem = route.params.paramKey;
 const itemConverted = bookItem.book;
 
 return (
 
  //Container
  <View style = {styles.container}>
    {/* WebView in order to show Books */}
    <WebView 
      scrollEnabled={true}
      source={{
      uri:itemConverted
      }}/> 
      
      {/* Pressable in order to quit book sessions */}
      <View style = {styles.centeredPressable}>
        <Pressable style = {styles.pressableModal} onPress = {() => {navigation.navigate('Home')}}>
          <Text style = {styles.coloredText}>Close WebView</Text>
        </Pressable> 
      </View>

    </View>
 

  );
}

const height = Dimensions.get('window').height;

//Components Style
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  centeredPressable:{
    alignItems:'center',height:'5%'
  },
  pressableModal:{
    borderWidth:2,
    width:'100%',
    height:'100%',
    paddingTop:2,
    backgroundColor:'black',
  },
  coloredText:{
    color:'white',
    textAlign:'center',
    fontSize: RFValue(20,height),
  },

});