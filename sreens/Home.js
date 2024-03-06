import { View, StyleSheet, Dimensions, TouchableOpacity ,Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Home = ( {navigation}) => {
  const redirection =()=>{
    navigation.navigate('Music') 
  }
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/93241-music-player.json')}
        autoPlay
        loop
        style={{ width, height }}
      />
      <TouchableOpacity style={styles.buttonContainer}     onPress={redirection}>
          <Text>PRESS TO GO TO  Music</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 18, 
    alignSelf: 'center', 
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
  },
});
