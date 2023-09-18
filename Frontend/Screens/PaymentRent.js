//React imports
import React, { useState,useContext } from 'react';
import { StyleSheet, View, Text, Pressable, Alert, Image , Platform , KeyboardAvoidingView , Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Icon imports
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
//API imports
import axios from 'axios';
import { StripeProvider, CardField, CardFieldInput, createToken, confirmPayment } from '@stripe/stripe-react-native';
import { Buffer } from "buffer";
//useConfirmPayment,useStripe
//My imports
import Header from './Header';
//.Env imports
import {URL} from '@env';
//Context 
import UserContext from '../Context/UserContext';
//Lib Imports
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function PaymentRent({route}) {

  //Constructors for Card Details
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const {userId} = useContext(UserContext);
  //Use of navigate Hook
  const navigation = useNavigation();

  //My local variables
  const bookItem = route.params.paramKey;
  const bookID = bookItem.id;
  const bookRent = bookItem.RentPrice;
  const bookImage = bookItem.image;

  //Payment function
  const pay = async () => {
  
    //First we create token for the payment
    const resToken = await createToken({...card,type:'Card'})

    //Then we create data for the payment , like amount and currency
    const payData = {
      amount : bookRent * 100,
      currency : "eur",
    }
    
   //If credit card fields are correct fil out ,then continue to further confirmations
    if(Object.keys(resToken) == "token"){
    //Request to check the success of the payment 
    await axios.post(URL+"/createPayment", 
    {...payData}).then((response)=>{
      const { confirmPaymentIntent } = confirmPayment(response.data.paymentIntent,{paymentMethodType : 'Card'})
    
      //If confirm is true then update the book table in Bought Column
      if(Object.keys(response.data).length > 1){
        Alert.alert("Success payment")
        //Request to inform the table that this book is bought
        axios.post(URL+"/bookRent",
        {
          bookCheckID : bookID,
          userBoughtItID : userId
        }).catch((error)=>{
          console.log("Axios request failed to buy the book")
        })
        //End of second Axios request
      }
      else
      {
        console.log("Token Error ,maybe card credits is wrong")
        Alert.alert("Error in payment,maybe card credits are wrong?")
      }
    }).catch((error)=>{
      console.log("Axios request for payment failed")
    })
    //End of first Axios request
  }
  else{
    Alert.alert("Card credentials are not Valid")
  }
}


  



return (
    
  //Stripe public key provider
  <StripeProvider
    publishableKey = "pk_test_51MAWjfI5vsjFWvGhrr5n2mAujexURegEgW4ujlSPpois9Em7FBzHrEkuv5zkeRjck8CeLBAcI761eVqgWQ3mL6EX00oSp0WeB6"
    merchantIdentifier = "merchant.com.{{E-LIBRARY}}" 
    urlScheme = "your-url-scheme" 
  >
  <KeyboardAvoidingView
      style={{ height: Platform.OS ==='ios' ? Dimensions.get('window').height * 1 : Dimensions.get('window').height * 1}}
      behavior={(Platform.OS === 'ios') ? 'position' : 'position'}
      enabled
      keyboardVerticalOffset={Platform.select({ ios: -50, android: -50 })}
  >
  <View style = {styles.container}>

  {/* Header */}
  <Header />
    
    
      {/* Container */}
      <View style={styles.container}>
        <View style = {styles.viewContainerForInfos}>
          <Text style = {styles.bookText}>{bookItem.title}</Text>
          <View style = {styles.imageView}>
            <Image 
              style = {{width:'30%',height:'60%',borderRadius:22,position:'relative',resizeMode:'contain'}}
              source = {{uri :'data:image/png;base64,' + Buffer.from(bookImage.data,'hex').toString('base64')}}  
            />
            <AntDesign name="checkcircleo" size={24} color="white" style = {{}} />
          </View>
        </View>
        
        <View style = {styles.viewForCardinfo}>
          <Text style = {styles.creditText}>Credit Card Informations</Text>
          <FontAwesome5 name="id-card-alt" size={30} color="black" />
        </View>

        <View style = {{alignItems:'center',width:'100%',height:'100%'}}>

        {/* Card component from Stripe */}
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            borderWidth:2,
            borderRadius:15
          }}
          style={{
            width: '80%',
            height: '8%',
            marginVertical: '15%',
          }}
          onCardChange={(cardDetails) => {
            setCard(cardDetails);
          }}
        />

      {/* Pressable in order for the client to pay */}
      <Pressable style = {styles.pressable} onPress = {() => {pay()}}>
          <Text style = {styles.pressableText}>Rent</Text>
      </Pressable>
      </View>

      </View>

    </View>
    </KeyboardAvoidingView>
  </StripeProvider>

  )
  
}

const height = Dimensions.get('window').height;

//Components Style
const styles = StyleSheet.create({
  //Container
  container: {
    height:'100%',
    width:'100%',
    backgroundColor:'white'
  },
  viewContainerForInfos:{
    width:'100%',
    height:'30%',
    backgroundColor:'black',
    alignItems:'center',
    marginTop:'4%',
    borderRadius:15
  }, 
  bookText:{
    marginTop:'4%',
    marginBottom:'2%',
    color:'white',
    fontSize: RFValue(20,height),
  },
  imageView:{
    width:'100%',
    height:'100%',
    alignItems:'center',
  },
  viewForCardinfo:{
    width:'100%',
    height:'8%',
    alignItems:'center',
    borderRadius:15,
    marginTop:'3%',
    justifyContent:'center',
    paddingTop: Platform.OS ==='ios' ? '4.2%' : '5.1%',
    backgroundColor:'gold',
    borderWidth:1
  },
  creditText:{
    color:'black',
    textAlign:'center',
    fontSize: RFValue(25,height),
  }, 
  //Pressable for the payment
  pressable: {
    backgroundColor: 'gold',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    alignItems:'center',
    height:'8%' ,
    justifyContent:'center',
    width:'50%'  
  },
  pressableText:{
    fontSize: RFValue(20,height),
  }

})