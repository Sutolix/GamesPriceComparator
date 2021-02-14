import React, { useEffect, useState, useCallback } from 'react'
import { Alert, TouchableHighlight, Text, View, Image, Pressable, FlatList, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { MaterialIcons } from '@expo/vector-icons'

import DealList from '../../components/DealsList'

import styles from './styles.js'

import api from '../../services/api';

export default function Home() {



  const [load, setLoad] = useState(true)
  const [games, setGames] = useState([])
  const [stores, setStores] = useState([])
  const [dealsOrdinationModalVisible, setDealsOrdinationModalVisible] = useState(false)

  const navigation = useNavigation()


  const [apiSort, setApiSort] = useState('')


  function navigateToStores(stores) {
    navigation.navigate('Stores', { stores })
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

  async function LoadGames() {
    try {
      await api.get(`deals?sortBy=${apiSort}`).then(response => {
        setGames(response.data)
      })

    } catch (error) {
      console.log(error)
    }
    setLoad(false)
  }

  useEffect(() => {
    LoadGames()
    LoadStores()
  }, [])

  const handleOrdination = useCallback(() => {
    setLoad(true)
    LoadGames()
  }, [apiSort])



  function showOrdinationModal() {
    setDealsOrdinationModalVisible(!dealsOrdinationModalVisible)
  }

  function newOrdination(sort) {
    setApiSort(sort)
    handleOrdination()
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
            navigateToStores(stores)
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

      {load ?
        <Text>Loading...</Text>
      :
        <DealList dealsArray={games} storesArray={stores}/>
      }

    </View>
  );
}
