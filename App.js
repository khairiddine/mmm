
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Home from './sreens/Home';
import Favoris from './sreens/Favoris';
import Music from './sreens/Music';

import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer >
    <Tab.Navigator  
       
      
 >
    <Tab.Screen   options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-account" color={color} size={40} />
          ),
        }}   name="Home" component={Home} />
    <Tab.Screen    options={{
            headerShown: false,
          tabBarLabel: 'Music',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="music-box-multiple" color={color} size={40} />
          ),
        }} name="Music" component={Music} />
    <Tab.Screen      options={{
          tabBarLabel: 'favoris',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="playlist-star" color={color} size={40} />
          ),
        }}    name="favoris" component={Favoris} />
   
  </Tab.Navigator>
  </NavigationContainer>
);
  
}


