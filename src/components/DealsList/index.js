import React, { useState } from 'react'
import { Alert, FlatList, Modal, View, Image, Text, TouchableHighlight, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import styles from './styles.js'

export default function DealList({dealsArray, storesArray}) {

  const games = dealsArray
  const stores = storesArray

  const [dealPreviewModalVisible, setDealPreviewModalVisible] = useState(false)
  const [dealId, setDealId] = useState('')

  const [storeName, setStoreName] = useState('')
  const [dealName, setDealName] = useState('')
  const [dealThumb, setDealThumb] = useState('')
  const [dealRating, setDealRating] = useState('')
  const [dealMetacritic, setDealMetacritic] = useState('')

  const navigation = useNavigation()

  function navigateToDetail(dealID) {
    navigation.navigate('Details', { dealID })
  }


  function renderBoxModal(games) {
    setDealPreviewModalVisible(!dealPreviewModalVisible);
    setDealId(games.dealID)
    setDealName(games.title)
    setDealThumb(games.thumb)
    setDealRating(games.steamRatingPercent)
    setDealMetacritic(games.metacriticScore)

    let storesIsArray = Array.isArray(stores)

    if(!storesIsArray) {
      setStoreName(stores)
      return
    }

    stores.forEach((store) => {
      if (games.storeID === store.storeID) {
        setStoreName(store.storeName)
      }
    })
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dealPreviewModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalGameInfo}>
              <View style={styles.modalImageSection}>
                <Image style={styles.imageModalCover} source={{ uri: dealThumb }} />
              </View>
              <View style={styles.modalInfosSection}>
                <Text style={styles.modalText}>Title: {dealName}</Text>
                <Text style={styles.modalText}>Store: {storeName}</Text>
                <Text style={styles.modalText}>Rating: {dealRating}</Text>
                <Text style={styles.modalText}>Metacritic: {dealMetacritic}</Text>
              </View>
            </View>
            <View style={styles.modalButtonsSection}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  navigateToDetail(dealId)
                  setDealPreviewModalVisible(!dealPreviewModalVisible)
                }}>
                <Text style={styles.textStyle}>View</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#C42021' }}
                onPress={() => {
                  setDealPreviewModalVisible(false)
                }}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </Modal>

      {games.length == 0
      ?
        <Text>Sorry, no deals found</Text>
      :
        <FlatList
          data={games}
          style={styles.dealsContainer}
          keyExtractor={item => item.dealID}
          renderItem={({ index }) => (
            <View style={styles.dealBox}>
              <Pressable
                style={styles.imageContainer}
                onPress={() => {
                  renderBoxModal(games[index]);
                }}>
                <Image style={styles.imageCover} source={{ uri: games[index].thumb }} />
              </Pressable>

              <View style={styles.dealBoxContent}>
                <Text>Title: {games[index].title}</Text>
                <Text style={styles.dealBoxNormalPrice}>Normal Price: ${games[index].normalPrice}</Text>
                <Text style={styles.dealBoxSalePrice}>Sale Price: ${games[index].salePrice}</Text>
              </View>
            </View>
          )}
        />
      }

    </>
  )
}