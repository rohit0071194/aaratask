import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from '../Screens/Login'
import SignUpScreen from '../Screens/SignUp'
import HomeScreen from '../Screens/Home'

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    <Stack.Screen name="SignUp" component={SignUpScreen}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}