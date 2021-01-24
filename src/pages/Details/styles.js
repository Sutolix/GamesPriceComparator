import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    padding: Constants.statusBarHeight + 20,
    backgroundColor: 'gray',
  },
  
  pageHeader: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#16db93',
    borderRadius: 10,
  },
  
  pageHeaderText: {
    color: '#fff',
    fontWeight: '800',
    fontFamily: 'Harmattan_400Regular',
    fontSize: 24,
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  imageCover: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },


})