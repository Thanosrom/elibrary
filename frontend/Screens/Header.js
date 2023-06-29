//React imports
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, Dimensions} from 'react-native';
import { useNavigation , useFocusEffect } from '@react-navigation/native';
//Icon Imports
import { SimpleLineIcons } from '@expo/vector-icons';
//Icons inside header modal
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
//Lib Imports
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function Header() {

  //Use of navigation Hook
  const navigation = useNavigation();

  //Modal Constructor
  const [modalVisible,setModalVisible] = useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
   
      setModalVisible(false)
      return () => {
      setModalVisible(false)
      };
    }, [])
  );

    return (
    
    <View style = {styles.Container}>

   

      {/* Modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

        <View style = {styles.modalStyle}>
          
          {/* Pressable and Text for each functionality  */}
          <Pressable  style = {styles.pressable} onPress = { () => navigation.navigate('Home')}>
            <AntDesign name="home" size={24} color="black" style = {{marginRight:'2%',marginLeft:'2%'}}/>
            <Text style = {styles. textInsideModalPressables}>Home</Text>
          </Pressable>
            
          <Pressable  style = {styles.pressable} onPress = { () => navigation.navigate('MyBooks')}>
          <Feather name="book" size={24} color="black" style = {{marginRight:'2%',marginLeft:'2%'}}/>
            <Text style = {styles. textInsideModalPressables}>My Collection</Text>
          </Pressable>

          <Pressable  style = {styles.pressable} onPress = { () => navigation.navigate('Profile')}>
            <AntDesign name="profile" size={24} color="black" style = {{marginRight:'2%',marginLeft:'2%'}}/>
            <Text style = {styles. textInsideModalPressables}>Profile</Text>
          </Pressable>
          
          
          <Pressable style = {styles.pressable} onPress = { () => navigation.navigate('Settings')}>
            <Feather name="settings" size={24} color="black" style = {{marginRight:'2%',marginLeft:'2%'}}/>
            <Text style = {styles. textInsideModalPressables}>Settings</Text>
          </Pressable>  

          <Pressable style = {styles.pressable} onPress = { () => navigation.navigate('LogInPage')}>
            <AntDesign name="logout" size={24} color="black" style = {{marginRight:'2%',marginLeft:'2%'}}/>
            <Text style = {styles. textInsideModalPressables}>Log Out</Text>
          </Pressable> 

          <Pressable onPress={ () => {setModalVisible(!modalVisible)}} style = {styles.pressable}>
            <AntDesign name="closecircleo" size={24} color="black" style = {{marginRight:'2%',marginLeft:'2%'}}/>
            <Text style = {styles. textInsideModalPressables}>Close modal</Text>
          </Pressable>

        </View>


      </Modal>

      {/* Pressable Mechanism in order to open the Modal */}
      <Pressable onPress={ () => {setModalVisible(!modalVisible)}} style = {styles.pressableMenu}>
        <SimpleLineIcons style = {styles.iconMenu} name="menu" size={24} color="white" />
        <Text style = {styles.menuText}>Menu</Text>
      </Pressable>

      <View style ={{width:'50%',alignItems:'center',justifyContent:'center'}}>
        <Text style = {styles.nameText}> E-Library</Text>
      </View>
   
    </View>
  );}

  const height = Dimensions.get('window').height;

//Components Style
const styles = StyleSheet.create({
  //Header bar
 Container: {
    marginTop:'8%',
    flexDirection:'row',
    height:'11%',
    backgroundColor:'black',
    borderRadius:25,
    alignItems:'center',
  },
  menuText:{
    textAlign:'center',
    color:'white',
    marginLeft:'5%',
      fontSize: RFValue(15,height),
  },
  nameText:{
    fontSize: RFValue(15,height),
    color:'white',
  },
  pressableMenu:{
    flexDirection:'row',
    marginLeft:'5%',
    alignItems:'center',
    width:'20%'
  },
  //Modal
  modalStyle: {
   backgroundColor:'black', 
   width:'100%',
   height:'100%',
   elevation:15,
   borderRadius:22,
   justifyContent:'center',
   alignItems:'center',
   flex:2
  },
  pressable:{
    borderRadius:15,
    alignItems:'center',
    elevation:8,
    height:'8%',
    width:'50%',
    backgroundColor:'white',
    margin:'2%',
    flexDirection:'row'
  },
  textInsideModalPressables:{
    fontWeight:'bold',
    fontSize: RFValue(15,height),
  },
});