import React from 'react'
import { Text, View, FlatList, Image, TouchableHighlight } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'

import styles from './styles.js'

export default function Stores() {
  const navigation = useNavigation()
  //pra pegar o incident mandado pela página anterior
  const route = useRoute()
  const stores = route.params.stores

  function navigateToDealsByStore(storeID, storeName) {
    navigation.navigate('DealsByStore', {storeID, storeName})
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
          <Text>Stores</Text>
      </View>

      <FlatList
        data={stores}
        style={styles.storeContainer}
        keyExtractor={item => item.storeID}
        numColumns={3}
        renderItem={({ index }) => (
          <TouchableHighlight
            style={styles.storeBox}
            activeOpacity={0.6}
            underlayColor="#ddd"
            onPress={() => {
              navigateToDealsByStore(stores[index].storeID, stores[index].storeName)
            }}
            >
            <View style={styles.storeInfos}>
              <Image style={styles.storeCover} source={{ uri: `https://www.cheapshark.com/${stores[index].images.logo}`}} />
              <Text style={styles.storeName}>{stores[index].storeName}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  )
}
