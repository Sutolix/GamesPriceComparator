import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, Linking, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'

import styles from './styles.js'

import api from '../../services/api';
import { FlatList } from 'react-native-gesture-handler';

export default function Details() {
  const navigation = useNavigation()
  //pra pegar o incident mandado pela página anterior
  const route = useRoute()
  const dealID = route.params.dealID

  const [gameInfo, setGameInfo] = useState({
    name: '',
    price: '',
    cheaperStores : {
      dealID: '',
      salePrice: '',
      retailPrice: ''
    },
  })
  const [isLoading, setIsLoading] = useState(true)

  async function LoadGameDetails() {

    try {
      await api.get(`deals?id=X8sebHhbc1Ga0dTkgg59WgyM506af9oNZZJLU9uSrX8%3D`).then(response => {
        let infos = response.data
        setGameInfo({
          name: infos.gameInfo.name,
          price: infos.gameInfo.salePrice,
          cheaperStores: {
            dealID: infos.cheaperStores.dealID,
            salePrice: infos.cheaperStores.salePrice,
            retailPrice: infos.cheaperStores.retailPrice,
          }
        })
        console.log(infos.cheaperStores)
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
        <ScrollView>
            <Text>{gameInfo.name}</Text>
        </ScrollView>
      }
    </View>
  )
}
View