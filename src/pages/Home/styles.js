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

  imageModalCover: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  dealBoxContent: {
    justifyContent: 'center',
    padding: 5,
  },

  dealBoxNormalPrice: {
    fontSize: 14,
    color: '#ffffff99',
  },

  dealBoxSalePrice: {
    fontSize: 16,
  },

  /*Modal*/
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  openButton: {
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 2,
    marginLeft: 8,
    marginRight: 8,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
  },
  modalGameInfo: {
    marginTop: 10,
  },
  /*Fim do modal*/
  
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: '#fff'
  },
  storesPageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ordinationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})