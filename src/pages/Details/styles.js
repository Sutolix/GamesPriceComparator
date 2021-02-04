import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    padding: Constants.statusBarHeight + 20,
    backgroundColor: '#0B3948',
  },
  
  pageHeader: {
    marginBottom: 20,
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
  },

  cheaperStoresItem: {
    marginBottom:10,
    backgroundColor:'#9ED0E6',
    padding: 10,
  },

  shopButton: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '900',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 10,
  },

  gameInfo: {
    marginTop: 10,
  }

})