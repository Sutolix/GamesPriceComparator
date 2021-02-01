import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, Linking, Pressable, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'

import styles from './styles.js'

import api from '../../services/api';

export default function Details() {
  const navigation = useNavigation()
  //pra pegar o incident mandado pela página anterior
  const route = useRoute()
  const dealID = route.params.dealID

  const [gameInfo, setGameInfo] = useState({
    cheaperStores : [],
    metacriticScore: '',
    name: '',
    publisher: '',
    salePrice: '',
    steamRatingPercent: '',
    steamRatingText: '',
    thumb: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [hasCheaperStores, setHasCheaperStores] = useState(false)

  async function LoadGameDetails() {

    try {
      await api.get(`deals?id=${dealID}`).then(response => {
        let infos = response.data
        
        let cheaperStores = infos.cheaperStores
        //return: dealID, retailPrice, salePrice and store ID

        if (cheaperStores.length !== 0) {
          setHasCheaperStores(true)
        }

        setGameInfo({
          cheaperStores,
          metacriticScore: infos.gameInfo.metacriticScore,
          name: infos.gameInfo.name,
          publisher: infos.gameInfo.publisher,
          salePrice: infos.gameInfo.salePrice,
          steamRatingPercent: infos.gameInfo.steamRatingPercent,
          steamRatingText: infos.gameInfo.steamRatingText,
          thumb: infos.gameInfo.thumb,
        })
        setIsLoading(false)
      })

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    LoadGameDetails()
  }, [])

  function navigateBack() {
    navigation.goBack()
  }

  function openOnBroswer(dealID) {
    Linking.openURL(`https://www.cheapshark.com/redirect?dealID=${dealID}`)
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>Game Details</Text>
      </View>
      {isLoading ? <Text>Loading</Text> :
      <View>
        <ScrollView>
            <Text>Name: {gameInfo.name}</Text>
            <Text>Publisher: {gameInfo.publisher}</Text>
            <Text>Price: {gameInfo.salePrice}</Text>
            <Text>Steam Rating: {gameInfo.steamRatingText}</Text>
        </ScrollView>
        {hasCheaperStores ?
        <FlatList
          data={gameInfo.cheaperStores}
          style={{height:500, marginTop:20}}
          keyExtractor={item => item.id}
          renderItem={({index}) => (
            <View style={{marginBottom:10, backgroundColor:'green'}}>
              <Text>dealID:</Text>
              <Text>{gameInfo.cheaperStores[index].dealID}</Text>

              <Text>retailPrice:</Text>
              <Text>{gameInfo.cheaperStores[index].retailPrice}</Text>

              <Text>salePrice:</Text>
              <Text>{gameInfo.cheaperStores[index].salePrice}</Text>
            </View>
          )}
        />
        : <></>}
        </View>
      }
    </View>
  )
}
