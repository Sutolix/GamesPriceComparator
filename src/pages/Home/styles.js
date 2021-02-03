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

  dealBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
    borderColor: '#ccc',
    borderBottomWidth: 1,

    backgroundColor: '#9ED0E6',
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'white',
  },

  imageCover: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },

  dealBoxContent: {
    justifyContent: 'center',
    padding: 5,
  },

})