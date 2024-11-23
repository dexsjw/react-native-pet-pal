import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Heart } from 'lucide-react-native';
import { viewPet } from '../../service/PetPalService';
import JasminePetCard from '../../common/components/JasminePetCard';

const ViewPetPage = () => {
  const [ownersState, setOwnersState] = useState([]);
  const [likedPets, setLikedPets] = useState({});
  const [loading, setLoading] = useState(true);

  async function getViewPet() {
    try {
      const payload = await viewPet();
      setOwnersState(payload.owners);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getViewPet();
  }, []);

  const handleLike = (ownerId) => {
    setLikedPets(prevLikes => ({
      ...prevLikes,
      [ownerId]: !prevLikes[ownerId]
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      {ownersState.map((ownerState) => (
        <View key={ownerState.ownerId.toString()} style={styles.cardContainer}>
          <JasminePetCard
            id={ownerState.ownerId}
            name={ownerState.petName}
            gender={ownerState.petGender}
            age={ownerState.petAge}
            location={ownerState.areaLocation}
            imageSrc={ownerState.petPicture[0]} 
          />
          
          <TouchableOpacity
            style={[
              styles.likeButton, 
              { backgroundColor: likedPets[ownerState.ownerId] ? '#ff6347' : '#ffffff' }
            ]}
            onPress={() => handleLike(ownerState.ownerId)}
          >
            <Heart 
              color={likedPets[ownerState.ownerId] ? 'white' : 'gray'} 
              fill={likedPets[ownerState.ownerId] ? 'white' : 'none'}
              size={24}
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 16,
    alignItems: 'center',
  },
  cardContainer: {
    marginVertical: 8,
    width: '100%',
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  likeButton: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewPetPage;