import { StyleSheet } from 'react-native'

//C42021

export default StyleSheet.create({
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
  modalImageSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  imageModalCover: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
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
})