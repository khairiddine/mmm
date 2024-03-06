import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';

import { AntDesign } from '@expo/vector-icons'; 
import {Slider} from '@miblanchard/react-native-slider';
const { width, height } = Dimensions.get('window');
const Music = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();





  const [currentTime, setCurrentTime] = useState(0);
const [totalDuration, setTotalDuration] = useState(0);
const [remainingTime, setRemainingTime] = useState(0);


 /* const musicplay = async (selectedSong) => {
    
      const { sound } = await Audio.Sound.createAsync({ uri: selectedSong.preview });
  
      if (isPlaying) { 
        await sound.stopAsync();
        setIsPlaying(false);
       
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      
      }
    
  };*/
  async function playSound() {
    if (!isPlaying) {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({ uri: selectedSong.preview });
  
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
      setIsPlaying(true);
    }

     
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setTotalDuration(status.durationMillis / 1000);
      setRemainingTime((status.durationMillis - status.positionMillis) / 1000);
    }
  });



  }
  
  async function stopSound() {
    if (sound && isPlaying) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      setIsPlaying(false);
    }

  }

  

  state = {
    value: 10,
};



useEffect(() => {
  if (sound && isPlaying) {
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setCurrentTime(status.positionMillis / 1000);
        setRemainingTime((status.durationMillis - status.positionMillis) / 1000);
      }
    });
  }
}, [isPlaying]);










  
  useEffect(() => {
    if (searchQuery !== '') {
      fetchSongs();
    } else {
      setSongs([]);
    }
  }, [searchQuery]);

  const onChangeSearch = query => setSearchQuery(query);

  const handleSongPress = (song) => {
    setSelectedSong(song);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    
  };

  const fetchSongs = async () => {
    try {
      const response = await axios.get(
        `https://api.deezer.com/search?q=${searchQuery}`
      );

      if (response.data && response.data.data) {
        setSongs(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des chansons:', error);
    }
  };

  const renderSongItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSongPress(item)}>
      <View style={styles.songCard}>
        <Image
          source={{ uri: item.album.cover_big }}
          style={styles.songImage}
        />
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist.name}</Text>
        <Text>duration: {item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Rechercher une chanson ou un artiste"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={item => item.id.toString()}
      />

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={handleCloseModal}>
        <TouchableWithoutFeedback >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              {selectedSong && (
                <>
                
                <AntDesign name="arrowleft"  style={styles.closeButton} onPress={handleCloseModal} size={35} color="black" />
                  <Text style={styles.songTitle}>{selectedSong.title}</Text>
                  <Text style={styles.songArtist}>{selectedSong.artist.name}</Text>
                  <Image
                     source={{ uri: selectedSong.album.cover_big }}
                    style={styles.songImage}
                   /> 
    <View style={styles.Slider}>
                <Slider
                    value={this.state.value}
                    onValueChange={value => this.setState({value})}
                />
               <View style={styles.timeContainer}>
    <Text style={styles.timeText}>Temps: {currentTime.toFixed(0)}s</Text>
    <Text style={styles.timeText}>Temps restant: {remainingTime.toFixed(0)}s</Text>
  </View>
               
            </View>
            
      <View style={styles.player}>
              
                   <AntDesign   style={{ marginHorizontal: 30 }} name="banckward" size={50} color="black" />
                   <AntDesign
  style={{ marginHorizontal: 30 }}
  name={isPlaying ? 'pausecircle' : 'play'}
  onPress={isPlaying ? stopSound : playSound}
  size={50}
  color="black"
/>
                   <AntDesign   style={{ marginHorizontal: 30 }} name="forward" size={50} color="black" />
                  {/* Ajoutez ici le contenu supplémentaire de la modal */}
                  </View>
                </>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  songCard: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  songImage: {
    width: 300,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  songTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  songArtist: {
    fontSize: 14,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: width, // Utilisez une largeur de 90% de l'écran
   height: height,// Définissez une largeur maximale pour le contenu modal
  },
  Slider: {
    
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    width:width-40,
},
player: {
  
  flexDirection: 'row', // Affiche les éléments en ligne
  justifyContent: 'center', // Centre les éléments horizontalement
  alignItems: 'center', // Centre les éléments verticalement
  marginHorizontal: 40, // Ajoute une marge horizontale de 10 pixels
},


  
});

export default Music;
