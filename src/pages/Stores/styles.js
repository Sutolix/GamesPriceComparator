import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

//C42021

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    padding: Constants.statusBarHeight + 20,
    backgroundColor: '#0B3948',
  },

  pageHeader: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },

  pageHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Harmattan_400Regular',
    fontSize: 22,
  },

  storeContainer: {
    width: '100%',
  },

  storeBox: {
    width: '33%',
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    margin: 2,
  },

  storeCover: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },

  storeName: {
    fontSize: 10,
    marginTop: 10,
  }

})
