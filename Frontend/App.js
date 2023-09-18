//React imports
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//My imports
import Home from './Screens/Home';
import SignUpPage from './Screens/SignUpPage';
import LogInPage from './Screens/LogInPage';
import Profile from './Screens/Profile';
import WebViewPdf from './Screens/WebViewPdf';
import Settings from './Screens/Settings';
import Payment from './Screens/Payment';
import PaymentRent from './Screens/PaymentRent';
import MyBooks from './Screens/MyBooks';
import BooksBought from './Screens/BooksBought';
import BooksRented from './Screens/BooksRented';

//Import Context
import UserProvider from './Context/UserProvider';


//My local variables
const Stack = createNativeStackNavigator();

//Ignore logs
LogBox.ignoreLogs([`new NativeEventEmitter()`]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {

  return (
   <UserProvider>
    
    <NavigationContainer>

      <Stack.Navigator>
        
        <Stack.Screen name = "LogInPage" component = {LogInPage} options = {{ headerShown : false}} />    
        <Stack.Screen name = "SignUpPage" component = {SignUpPage} options = {{ headerShown : false}} />    
        <Stack.Screen name = "Home" component = {Home} options = {{ headerShown : false }} /> 
        <Stack.Screen name = "Profile" component = {Profile} options = {{ headerShown : false}} />  
        <Stack.Screen name = "WebViewPdf" component = {WebViewPdf} options = {{ headerShown : false}} />  
        <Stack.Screen name = "Settings" component = {Settings} options = {{ headerShown : false}} />    
        <Stack.Screen name = "Payment" component = {Payment} options = {{ headerShown : false}} />
        <Stack.Screen name = "PaymentRent" component = {PaymentRent} options = {{ headerShown : false}} />
        <Stack.Screen name = "MyBooks" component = {MyBooks} options = {{ headerShown : false}} />
        <Stack.Screen name = "BooksBought" component = {BooksBought} options = {{ headerShown : false}} />
        <Stack.Screen name = "BooksRented" component = {BooksRented} options = {{ headerShown : false}} />

     </Stack.Navigator>
  
   </NavigationContainer>

  </UserProvider>
  )
};
  