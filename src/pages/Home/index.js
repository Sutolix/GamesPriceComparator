import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TouchableHighlight, Text, View, Image, Pressable, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import styles from './styles.js'

import api from '../../services/api';

export default function Home() {

  const navigation = useNavigation()

  const [games, setGames] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

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

  function renderBoxModal() {
    setModalVisible(!modalVisible);
    loadModal()
  }

  // () => navigateToDetail(games[index].dealID)
  //  <Text>Rating: {games[index].steamRatingPercent}%</Text>

  // <Text>Metacritic Score: {games[index].metacriticScore}</Text>

  function loadModal() {

    return (
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
          </View>
          <Text style={styles.modalText}>Hello World!</Text>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>AnyGD</Text>
      </View>

      <FlatList
        data={games}
        style={styles.dealsContainer}
        keyExtractor={item => item.dealID}
        renderItem={({ index }) => (
          <View style={styles.dealBox}>
            <Pressable
              style={styles.imageContainer}
              onPress={() => {
                renderBoxModal();
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
