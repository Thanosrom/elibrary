//React imports
import React, { useState,useEffect,useContext } from 'react';
import { StyleSheet, Text, View , Image, Pressable, ScrollView, Modal, Alert, Dimensions , Platform} from 'react-native';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
//Icon imports 
import { FontAwesome5 } from '@expo/vector-icons'; 
//APIs imports
import axios from 'axios';
import { Buffer } from "buffer";
//My imports
import Header from './Header';
//.Env imports
import {URL} from '@env';
//Context Import
import UserContext from '../Context/UserContext';
//Lib Imports
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


export default function Home() {
  //Constructors for books
  const [book,setBook] = useState([]);
  const [bookShow,setBookShow] = useState([]);
  const [ModalBookVisible,setModalBookVisible] = useState(false);
  const { userId } = useContext(UserContext);

  //Navigation use Hook
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setModalBookVisible(false)
      return () => {
      setModalBookVisible(false)
      };
    }, [])
  );
  
  //Getting all books
  useEffect(() => { 
    axios.get(URL+'/books').then((response) => { 
        var data = response.data;
        setBook(data);
      }).catch((error) => {
        console.log("Home axios error")
      }).catch((error) => {
        console.log("Home error",error)
      })
  },[]) 

  //Function to get the book that they are Bought and display them 
  function boughtChecker(){
    //Checking if the book is Bought
   axios.post(URL+'/getBooksBought',
    {
      userID : userId,
      bookID : bookShow.id
    }).then((response) => { 
        const data = response.data;
        console.log(data)
        //setBookIsBought(data);
        if(data[0].bookBought == 1){ 
          navigation.navigate('WebViewPdf',{paramKey:bookShow}) 
        }
        else{
          Alert.alert("Forbitten, book not Bought!")
        }
      }).catch((error) => {
        Alert.alert("Forbitten, book not Bought!")
      })
      
  
  }


  //Function to get books Rented and display them 
  function rentChecker(){
      //Checking if the book is Rented
      axios.post(URL+'/getBooksRent',
      {
        userID : userId,
        bookID : bookShow.id
      }).then((response) => { 
          const data = response.data;
          console.log(data)
  
          var today = new Date().getTime()/1000;
          console.log(today);
            
          var bookRentTimeStamp = new Date(data[0].TimeEnd).getTime()/1000;
          console.log(bookRentTimeStamp);

          var checker = (today > bookRentTimeStamp)
          console.log("Real time is greater than rent time ? Answer--> " + checker)
        
          if(data[0].bookRented == 1 && (today < bookRentTimeStamp)){ 
            navigation.navigate('WebViewPdf',{paramKey:bookShow}) 
          }
          else{
            Alert.alert("Forbitten,book not Rented!")
          }
    }).catch((error) =>{
      Alert.alert("Forbitten,book not Rented!")
    })
      
  }
  
  return (
    <View style = {styles.container}>
      
        {/* Header */}
        <Header />
        
          {/* Container for Home title and icon */}
          <View style = {styles.iconAndHomeView}>
             <FontAwesome5 style = {styles.iconNextToHome} name="book-open" size={24} color="black" />
             <Text style = {styles.homeText}>Home Page</Text>
          </View>

       
        
          <ScrollView>
            <View style = {styles.books}>
              {book.map((item)=>{
                return (
            
                  <View style = {styles.bookContainer} key = {item.id}>

                    <Text style = {styles.itemTitle}>
                        {item.title}
                    </Text>

                    <Text style = {styles.itemPrice}>
                        Price : {item.Price}
                    </Text>

                    <Text style = {styles.itemRentPrice}>
                        Rent Price : {item.RentPrice}
                    </Text>

                    {/* Here we are making a book image pressable and keep the book object to use it later as modal */}
                    <Pressable style = {styles.itemImage} onPress={ () => { setBookShow(item); setModalBookVisible(!ModalBookVisible)}}>
                      <Image 
                        style = {{width:'100%',height:'80%',borderRadius:1,resizeMode:'contain'}}
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
           
          {/* Check if the book is Rented ,so it can show it,also we send the book */}
           <Pressable style = {styles.pressableInsideModal} onPress = {() => { rentChecker() }}>
             <Text style = {styles.textInsideModal}>Show Book Rented</Text>
           </Pressable>

          {/* Pressable to Buy the book */}
          <Pressable style = {styles.pressableInsideModal} onPress={ () => {navigation.navigate('Payment',{paramKey:bookShow})}}>
            <Text style = {styles.textInsideModal}>Buy</Text>
          </Pressable>

          {/* Pressable to Rent the book */}
          <Pressable style = {styles.pressableInsideModal} onPress={ () => {navigation.navigate('PaymentRent',{paramKey:bookShow})}}>
            <Text style = {styles.textInsideModal}>Rent</Text>
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
  container: {
    backgroundColor:'white', 
    height:'100%',
    width:'100%'
  },
  //Home Container and Logo
  homeText:{
    fontSize: RFValue(25,height),
    margin:'1.5%'
  },
  iconAndHomeView:{  
    flexDirection:'row',
    justifyContent:'center',
    width:'100%',
  },
  iconNextToHome:{  
    margin:'3%',
  },
  //Each element - book
  books:{
    flexDirection:'row',
    flexWrap:'wrap',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  bookContainer:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
    borderRadius:15,
    margin:'3%',
    padding:'4%',
    paddingTop:'6%',
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.4,
  },
  itemTitle:{
    textAlign:'center',
    width:'80%',
    fontWeight:'bold',
    fontSize: RFValue(15,height),
    color:'white'
  },
  itemImage:{
    width:'100%',
    height:'80%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15,
  },
  itemPrice:{
    textAlign:'center',
    fontSize: RFValue(15,height),
    backgroundColor:'gold',
    width:'75%',
    marginTop:'3%',
    marginBottom:'3%'
  },
  itemRentPrice:{
    textAlign:'center',
    fontSize: RFValue(15,height),
    backgroundColor:'gold',
    width:'75%',
    color:'black'
  },
  //Modal for Books
  bookModal:{
    alignItems:'center',
    height:Platform.OS ==='ios' ? '70%' : '80%',
    width:'80%',
    backgroundColor:'black',
    marginTop:Platform.OS ==='ios' ? '40%' : '19%',
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
    height:Platform.OS ==='ios' ? '7%' : '10%',
    justifyContent:'center',
    alignItems:'center'
  },


});