import React, { useState } from 'react'
import { Alert, TouchableHighlight, Text, View, Modal } from 'react-native';

import styles from './styles.js'



export default function SlideModal(){

  const [openModal, setOpenModal] = useState(true);

  console.log(`Modal: ${openModal}`)

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={openModal}
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
            setOpenModal(false);
          }}>
          <Text style={styles.textStyle}>Close</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
  )
}
