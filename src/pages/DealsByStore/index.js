import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableHighlight, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'

import api from '../../services/api';

import styles from './styles.js'

import DealList from '../../components/DealsList'

export default function DealsByStore() {

  const route = useRoute()
  const storeID = route.params.storeID
  const storeName = route.params.storeName

  const [load, setLoad] = useState(true)
  const [games, setGames] = useState([])

  async function LoadGames() {
    try {
      await api.get(`deals?storeID=${storeID}`).then(response => {
        setGames(response.data)
      })

    } catch (error) {
      console.log(error)
    }
    setLoad(false)
  }
  
  useEffect(() => {
    LoadGames()
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>{storeName}</Text>
        <Text style={styles.pageHeaderStoreName}>DealsByStore</Text>
      </View>

      {load ?
        <Text>Loading...</Text>
      :
        <DealList dealsArray={games} storesArray={storeName}/>
      }
    </View>
  )
}