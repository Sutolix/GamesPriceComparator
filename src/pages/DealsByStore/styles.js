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
    padding: 10,
    borderRadius: 10,
  },

  pageHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Harmattan_400Regular',
    fontSize: 22,
  },

  pageHeaderStoreName: {
    color: '#ffffff8f',
  },
})