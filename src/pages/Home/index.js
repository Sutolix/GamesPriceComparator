import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Linking } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

var axios = require('axios');
var config = {
  method: 'get',
  url: 'https://www.cheapshark.com/api/1.0/deals',
};

export default function Home() {

  const [games, setGames] = useState([])

    const styles = StyleSheet.create({
      stretch: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        backgroundColor: '#DDDDDD',
      },
    });

  function LoadGames() {
    axios(config)
    .then(function (response) {
      setGames(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    LoadGames()
  }, [])

  function openOnBroswer(dealID) {
    Linking.openURL(`https://www.cheapshark.com/redirect?dealID=${dealID}`)
  }

  return(
    <View style={{ backgroundColor: 'gray', padding: 10}}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Text>The Big Promotinos Just Here!</Text>
      </View>
      <ScrollView>
        {games.map((i) =>
          <View style={{marginBottom: 40}} key={i.dealID}>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={()=> openOnBroswer(i.dealID)}
            >
              <Image style={styles.stretch} source={{uri: i.thumb}}  />
            </TouchableHighlight>

            <Text>Title: {i.title}</Text>
            <Text>Sale Price: {i.salePrice}</Text>
            <Text>Normal Price: {i.normalPrice}</Text>
            <Text>On Sale: {i.isOnSale === '1' ? 'Yes' : 'No'}</Text>
            <Text>Metacritic Score: {i.metacriticScore}</Text>
            <Text>Rating: {i.steamRatingPercent}%</Text>
          </View>)
        }
      </ScrollView>

    </View>
  )
}
