import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TouchableHighlight, Text, View, Image, Pressable, FlatList, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

import styles from './styles.js'

import api from '../../services/api';

export default function Home() {

  const navigation = useNavigation()

  const [games, setGames] = useState([])
  const [stores, setStores] = useState([])
  const [dealsOrdinationModalVisible, setDealsOrdinationModalVisible] = useState(false)
  const [dealPreviewModalVisible, setDealPreviewModalVisible] = useState(false)
  const [dealId, setDealId] = useState('')
  const [storeName, setStoreName] = useState('')
  const [dealName, setDealName] = useState('')
  const [dealThumb, setDealThumb] = useState('')
  const [dealRating, setDealRating] = useState('')
  const [dealMetacritic, setDealMetacritic] = useState('')

  const [apiSort, setApiSort] = useState('')

  function navigateToDetail(dealID) {
    //nome da rota
    navigation.navigate('Details', { dealID })
  }


  async function LoadGames() {

    try {
      await api.get(`deals?sortBy=${apiSort}`).then(response => {
        setGames(response.data)
      })

    } catch (error) {
      console.log(error)
    }

  }

  async function LoadStores() {

    try {
      await api.get(`stores`).then(response => {
        setStores(response.data)
      })

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    LoadGames()
    LoadStores()
  }, [])

  function renderBoxModal(games) {
    setDealPreviewModalVisible(!dealPreviewModalVisible);
    setDealId(games.dealID)
    setDealName(games.title)
    setDealThumb(games.thumb)
    setDealRating(games.steamRatingPercent)
    setDealMetacritic(games.metacriticScore)

    stores.forEach((store) => {
      if(games.storeID === store.storeID) {
        setStoreName(store.storeName)
      }
    })
  }

  function showOrdinationModal() {
    setDealsOrdinationModalVisible(!dealsOrdinationModalVisible)
  }

  function newOrdination(sort) {
    setApiSort(sort)
    LoadGames()
    setDealsOrdinationModalVisible(!dealsOrdinationModalVisible)
  }




  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>AnyGD</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableHighlight
          style={styles.itemButton}
          activeOpacity={0.6}
          onPress={() => {
            console.log('store page')
          }}
        >
          <View style={styles.storesPageButton}>
            <MaterialIcons name="store" size={32} color="#C42021" />
            <Text>Stores</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.itemButton}
          activeOpacity={0.6}
          onPress={() => {
            showOrdinationModal()
          }}
        >
          <View style={styles.ordinationButton}>
            <MaterialIcons name="swap-vert" size={32} color="#C42021" />
            <Text>Ordination</Text>

            <Modal
              animationType="slide"
              transparent={true}
              visible={dealsOrdinationModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View>
                    <Text style={styles.ordinationModalTitle}>Deals Ordination:</Text>
                  </View>
                  <View style={styles.buttonsOrdinationSection}>

                    <TouchableHighlight
                      style={styles.ordinationButtonItem}
                      onPress={() => { newOrdination('deal-rating') }}
                    >
                      <Text style={styles.sortText}>Deal Rating</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={styles.ordinationButtonItem}
                      onPress={() => { newOrdination('title') }}
                    >
                      <Text style={styles.sortText}>Title</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={styles.ordinationButtonItem}
                      onPress={() => { newOrdination('savings') }}
                    >
                      <Text style={styles.sortText}>Savings</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={styles.ordinationButtonItem}
                      onPress={() => { newOrdination('price') }}
                    >
                      <Text style={styles.sortText}>Price</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={styles.ordinationButtonItem}
                      onPress={() => { newOrdination('metacritic') }}
                    >
                      <Text style={styles.sortText}>Metacritic</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={styles.ordinationButtonItem}
                      onPress={() => { newOrdination('reviews') }}
                    >
                      <Text style={styles.sortText}>Reviews</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={styles.ordinationButtonItem}
                      onPress={() => { newOrdination('release') }}
                    >
                      <Text style={styles.sortText}>Release</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={styles.ordinationButtonItem}
                      onPress={() => { newOrdination('store') }}
                    >
                      <Text style={styles.sortText}>Store</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={styles.ordinationButtonItem}
                      onPress={() => { newOrdination('recent') }}
                    >
                      <Text style={styles.sortText}>Recent</Text>
                    </TouchableHighlight>

                  </View>
                  <View style={styles.modalButtonsSection}>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                      onPress={() => {
                        setApiSort('')
                      }}>
                      <Text style={styles.textStyle}>Reset</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: '#C42021' }}
                      onPress={() => {
                        setDealsOrdinationModalVisible(false)
                      }}>
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </TouchableHighlight>
      </View>

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
    </View>
  );
}
