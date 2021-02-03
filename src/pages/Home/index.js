import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Linking, Pressable, FlatList } from 'react-native';
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
      await api.get(`deals?limit=5`).then(response => {
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
        <Text style={styles.pageHeaderText}>AnyGD</Text>
      </View>
      <FlatList
        data={games}
        style={styles.dealsContainer}
        keyExtractor={ item => item.id}
        renderItem={({index}) => (
          <View style={styles.dealBox}>
            <Pressable
              style={styles.imageContainer}
              onPress={() => navigateToDetail(games[index].dealID)}
            >
              <Image style={styles.imageCover} source={{ uri: games[index].thumb }} />
            </Pressable>

            <View style={styles.dealBoxContent}>
              <Text>Title: {games[index].title}</Text>
              <Text>Sale Price: ${games[index].salePrice}</Text>
              <Text>Normal Price: ${games[index].normalPrice}</Text>
              <Text>On Sale: {games[index].isOnSale === '1' ? 'Yes' : 'No'}</Text>
              <Text>Metacritic Score: {games[index].metacriticScore}</Text>
              <Text>Rating: {games[index].steamRatingPercent}%</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}
