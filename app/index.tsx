import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Button, ScrollView } from 'react-native';
import { Link } from 'expo-router'; 
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

interface Plateau {
  id: string;
  name: string;
}

export default function Index() {
  

  return (
    <SQLiteProvider databaseName="mydatabasetest3.db" assetSource={{ assetId: require('../assets/db/mydatabasetest3.db') }}>
      <ImageBackground source={require('../assets/bg/bg_1.png')} style={styles.background}>
      <ScrollView>
      <View>
        <Text>Home screen</Text>
        <Link href="/JoueurPage"> Go to Joueur screen </Link>
        <Link href="/GamePage"> Go to Game screen </Link>
        <Link href="/EditPage"> Go to Edit screen </Link>
      </View>


      <Plateaux/>

      </ScrollView>
      </ImageBackground>
    </SQLiteProvider>
  );
}

function Plateaux() {
  const db = useSQLiteContext();
  const [plateaux, setPlateaux] = useState<Plateau[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlateauIndex, setSelectedPlateauIndex] = useState(null);

  const fetchPlateaux = async () => {
    try {
      const result = await db.getAllAsync<Plateau>('SELECT * FROM plateaux');
      setPlateaux(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des plateaux:', error);
    }
  };

  useEffect(() => {
    fetchPlateaux();
  }, []);

  const handleButtonPress = (index) => {
    setSelectedPlateauIndex(index);
    setModalVisible(true);
  };

  const closePopup = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {plateaux.length > 0 ? (
          plateaux.map((plateau) => (
            <TouchableOpacity style={styles.item} key={plateau.id} onPress={() => handleButtonPress(plateau.id)} >
                <Text >{plateau.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Aucun plateau trouvé.</Text>
        )}
      </View>
      
      <Modal isVisible={isModalVisible} onBackdropPress={closePopup}>
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Options</Text>

            <TouchableOpacity style={styles.modalButton}>
              <Link href={`/GamePage?plateauId=${selectedPlateauIndex}`}>
                <Text style={styles.modalButtonText}>Start Game</Text>
              </Link>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Option 2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={closePopup}>
                <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
      </Modal>

    
    </View>
  );
}



const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    marginTop: 20,
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
  },
  modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  modalButton: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginVertical: 5,
  },
  modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
});
