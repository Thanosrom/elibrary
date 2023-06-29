//React imports
import React, { useState,useEffect, useContext} from 'react';
import { StyleSheet, Text, View , Image, Pressable, ScrollView, Modal, Alert, Dimensions , Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Icon imports
import { FontAwesome } from '@expo/vector-icons'; 
//APIs imports
import axios from 'axios';
import { Buffer } from "buffer";
//My imports
import Header from './Header';
//.Env imports
import {URL} from '@env';
//Context 
import UserContext from '../Context/UserContext';
//Lib Imports
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function BooksBought() {

  //Constructors 
  const [book,setBook] = useState([]);
  const [bookShow,setBookShow] = useState([]);
  const [ModalBookVisible,setModalBookVisible] = useState(false);
  const {userId} = useContext(UserContext);
  //Use of navigate Hook
  const navigation = useNavigation();

 useEffect(() => { 
    axios.post(URL+'/getUserBooks',{
      userID : userId
    }).then((response) => { 
      var data = response.data;
      console.log("Buy")
      setBook(data);
    }).catch((error) => {console.log(error)})
 },[]) 
 
  //Function to get the book that they are Bought and display them 
  function boughtChecker(){
   //Checking if the book is Bought
   axios.post(URL+'/getBooksBought',
    {
      userID : userId,
      bookID : bookShow.bookID
    }).then((response) => { 
        const data = response.data;
        console.log(data);
        if(data[0].bookBought == 1){ 
          navigation.navigate('WebViewPdf',{paramKey:bookShow}) 
        }
        else{
          Alert.alert("Forbitten, book not Bought!")
        }
      }).catch((error) => {
        Alert.alert("Forbitten, book not Bought!!")
        console.log(error)
      })
      
  
  }

 return (
 
  //Container
  <View style = {styles.container}>
    
    <Header />

    <View style = {styles.containerForBoughtText}>
      <FontAwesome name="book" size={24} color="white" />
      <Text style = {styles.textForBoughtBooks}>Bought Books</Text>
    </View>

    {/* ScrollView for Bought Books */}
    <ScrollView>

      <View style = {styles.books}>
        {book.map((item)=>{ 
          return (
            <View style = {styles.bookContainer} key = {item.id}>
              <Text style = {styles.itemTitle}>
              {item.title}
              </Text>

              {/* Here we are making a book image pressable and keep the book object to use it later as modal */}
              <Pressable style = {styles.itemImage} onPress={ () => { setBookShow(item); setModalBookVisible(!ModalBookVisible)}}>
              <Image 
                style = {styles.imagesStyle}
                source = {{uri :'data:image/png;base64,' + Buffer.from(item.image.data,'hex').toString('base64')}}  
              />
              </Pressable>   
                                  
                      
            </View>
          )
        })}
        </View>
        </ScrollView>
        

    
        {/* Modal to open book that is pressed */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={ModalBookVisible}
          onRequestClose={() => {
          setModalBookVisible(!ModalBookVisible);
        }}
        >
                   
        <View style = {styles.bookModal}>
          {/* Book title */}
          <Text style = {styles.bookShowTitleText}>{bookShow.title}</Text>

          {/* Book category */}
          <Text style = {styles.bookShowCategoryText}>Category : {bookShow.category}</Text>
                    
           {/* Check if the book is Bought ,so it can show it,also we send the book */}
           <Pressable style = {styles.pressableInsideModal} onPress = {() => { boughtChecker() }}>
             <Text style = {styles.textInsideModal}>Show Book Bought</Text>
           </Pressable>
           
          {/* Pressable to close the modal */}
          <Pressable style = {styles.pressableInsideModal} onPress={ () => {setModalBookVisible(!ModalBookVisible)}}>
            <Text style = {styles.textInsideModal}>Close</Text>
          </Pressable>
          
           {/* Here we see the book description */}
          <ScrollView style = {styles.scrollViewForDescribeModal}>
            <Text style = {styles.bookShowDescribeText}>Describe : </Text>
            <Text style = {styles.describeText}>{bookShow.describe}</Text>
          </ScrollView>

          </View>

                
      </Modal>

    
    

  </View>
 

  );
}
const height = Dimensions.get('window').height;

//Components Style
const styles = StyleSheet.create({
  container:{
    backgroundColor:'white', 
    height:'100%',
    width:'100%'
  },
  //Each element - book
  books:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  bookContainer:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
    borderRadius:15,
    margin:'3%',
    padding:'3%',
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').height * 0.3
  },
  containerForBoughtText:{
    width:'80%',
    height:'10%',
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:'3%',
    borderRadius:15,
    flexDirection:'row'
  },
  textForBoughtBooks:{
    color:'white',
    fontSize: RFValue(12,height),
    marginLeft:'5%'
  },
  itemTitle:{
    textAlign:'center',
    width:'80%',
    fontWeight:'bold',
    fontSize: RFValue(22,height),
    color:'white'
  },
  itemImage:{
    width:'90%',
    height:'80%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15,
  },
  imagesStyle:{
    width:'100%',
    height:'100%',
    borderRadius:1,
    marginTop:'5%',
    resizeMode:'contain'
  },
  //Modal for Books
  bookModal:{
    alignItems:'center',
    height:Platform.OS ==='ios' ? '70%' : '80%',
    width:'80%',
    backgroundColor:'black',
    marginTop:Platform.OS ==='ios' ? '40%' : '25%',
    marginLeft:'10%',
    borderRadius:25,
    borderWidth:1,
    elevation:15,
    padding:'1%'
  },
  //Modal Texts
  bookShowTitleText:{
    textAlign:'center',
    fontWeight:'bold',
    color:'white',
    fontSize: RFValue(15,height),
  },
  bookShowCategoryText:{
    textAlign:'center',
    color:'white',
    fontSize: RFValue(15,height),
  },
  textInsideModal:{
    textAlign:'center',
    color:'white',
    fontSize: RFValue(14,height),
  },
  bookShowDescribeText:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize: RFValue(15,height),
  },
  scrollViewForDescribeModal:{
    backgroundColor:'white',
    flexDirection:'column',
    padding:'5%',
    borderRadius:15,
  },
  describeText:{
    fontSize: RFValue(15,height),
  },
  //Modal pressables
  pressableInsideModal:{
    borderWidth:6,
    borderRadius:11,
    elevation:5,
    backgroundColor:'grey',
    width:'45%',
    height:Platform.OS ==='ios' ? '7%' : '9%',
    justifyContent:'center',
    alignItems:'center'
  }

});