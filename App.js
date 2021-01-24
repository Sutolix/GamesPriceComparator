import React from 'react'
import AppLoading from 'expo-app-loading'
import Routes from './src/routes'

import { useFonts, Harmattan_400Regular } from '@expo-google-fonts/harmattan'

export default function App(){

  let [fontsLoaded] = useFonts({
    Harmattan_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return(
    <Routes />
  );
}
