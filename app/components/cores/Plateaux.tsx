// Import librairies
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import {useSQLiteContext } from 'expo-sqlite';

// Import components
import ModalMain from '../modals/ModalMain';

// Import models
import Plateau from '../../models/Plateau';



function Plateaux() {
    const db = useSQLiteContext();
    const [plateaux, setPlateaux] = useState<Plateau[]>([]);
    const [listPlateaux, setListPlateaux] = useState<Record<string, number>>({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPlateauIndex, setSelectedPlateauIndex] = useState<number | null>(null);
  
    const fetchPlateaux = async () => {
      try {
        const result = await db.getAllAsync<Plateau>('SELECT * FROM plateaux');
        setPlateaux(result);
  
        const result1 = await db.getAllAsync('SELECT * FROM Plateau1');
        const result2 = await db.getAllAsync<Plateau>('SELECT * FROM Plateau2');
        const result3 = await db.getAllAsync<Plateau>('SELECT * FROM Plateau3');
        const result4 = await db.getAllAsync<Plateau>('SELECT * FROM Plateau4');
        const result5 = await db.getAllAsync<Plateau>('SELECT * FROM Plateau5');
        const result6 = await db.getAllAsync<Plateau>('SELECT * FROM Plateau6');
        const result7 = await db.getAllAsync<Plateau>('SELECT * FROM Plateau7');
        const result8 = await db.getAllAsync<Plateau>('SELECT * FROM Plateau8');
        setListPlateaux({
          1: result1.length,
          2: result2.length,
          3: result3.length,
          4: result4.length,
          5: result5.length,
          6: result6.length,
          7: result7.length,
          8: result8.length
        });
  
      } catch (error) {
        console.error('Erreur lors de la récupération des plateaux:', error);
      }
    };
  
    useEffect(() => {
      fetchPlateaux();
    }, []);
  
    const handleButtonPress = (index: number) => {
      setSelectedPlateauIndex(index);
      setModalVisible(true);
    };
  
    const closePopup = () => {
      setModalVisible(false);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {plateaux.map((plateau) => (
            <TouchableOpacity style={styles.item} key={plateau.id} onPress={() => handleButtonPress(plateau.id)} >
              <Text >{plateau.name}</Text>
            </TouchableOpacity>
          ))}
        </View>  
        
        <ModalMain isModalVisible={isModalVisible} closePopup={closePopup} selectedPlateauIndex={selectedPlateauIndex} listPlateaux={listPlateaux}
        />

      </View>
    );
}

const styles = StyleSheet.create({
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
});

export default Plateaux;
