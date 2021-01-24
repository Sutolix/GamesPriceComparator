import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Linking, Pressable } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

import styles from './styles.js'

import api from '../../services/api';

export default function Home() {

  const navigation = useNavigation()

  const [games, setGames] = useState([])

  function navigateToDetail(dealID) {
    //nome da rota
    navigation.navigate('Details', { dealID })
  }


  async function LoadGames() {

    try {
      await api.get(`deals`).then(response => {
        setGames(response.data)
      })

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    LoadGames()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>The Big Promotinos Just Here!</Text>
      </View>
      <ScrollView style={styles.dealsContainer}>
        {games.map((i) =>
          <View style={styles.dealBox} key={i.dealID}>

            <Pressable
              style={styles.imageContainer}
              onPress={() => navigateToDetail(i.dealID)}
            >
              <Image style={styles.imageCover} source={{ uri: i.thumb }} />
            </Pressable>

            <Text>Title: {i.title}</Text>
            <Text>Sale Price: {i.salePrice}</Text>
            <Text>Normal Price: {i.normalPrice}</Text>
            <Text>On Sale: {i.isOnSale === '1' ? 'Yes' : 'No'}</Text>
            <Text>Metacritic Score: {i.metacriticScore}</Text>
            <Text>Rating: {i.steamRatingPercent}%</Text>
          </View>)
        }
      </ScrollView>
    </View>
  )
}
