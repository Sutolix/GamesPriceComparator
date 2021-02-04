import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TouchableHighlight, Text, View, Image, Pressable, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import styles from './styles.js'

import api from '../../services/api';

export default function Home() {

  const navigation = useNavigation()

  const [games, setGames] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [dealId, setDealId] = useState('')
  const [dealName, setDealName] = useState('')
  const [dealThumb, setDealThumb] = useState('')
  const [dealRating, setDealRating] = useState('')
  const [dealMetacritic, setDealMetacritic] = useState('')

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

  function renderBoxModal(games) {
    setModalVisible(!modalVisible);
    setDealId(games.dealID)
    setDealName(games.title)
    setDealThumb(games.thumb)
    setDealRating(games.steamRatingPercent)
    setDealMetacritic(games.metacriticScore)
  }

  // () => navigateToDetail(games[index].dealID)
  //  <Text>Rating: {games[index].steamRatingPercent}%</Text>

  // <Text>Metacritic Score: {games[index].metacriticScore}</Text>

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>AnyGD</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Image style={styles.imageModalCover} source={{ uri: dealThumb }} />
            </View>
            <View style={styles.modalGameInfo}>
              <Text style={styles.modalText}>Title: {dealName}</Text>
              <Text style={styles.modalText}>Rating: {dealRating}</Text>
              <Text style={styles.modalText}>Metacritic: {dealMetacritic}</Text>
            </View>
            <View style={styles.modalButtonsSection}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  navigateToDetail(dealId)
                  setModalVisible(!modalVisible)
                }}>
                <Text style={styles.textStyle}>View</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#C42021' }}
                onPress={() => {
                  setModalVisible(false)
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
