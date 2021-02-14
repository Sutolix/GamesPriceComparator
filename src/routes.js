import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Home from './pages/Home'
import Details from './pages/Details'
import Stores from './pages/Stores'
import DealsByStore from './pages/DealsByStore'


export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Details" component={Details} />
        <AppStack.Screen name="Stores" component={Stores} />
        <AppStack.Screen name="DealsByStore" component={DealsByStore} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
