// Import librairies
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import {useSQLiteContext } from 'expo-sqlite';

// Import components
import ModalMain from '../modals/ModalMain';

// Import models
import Plateau from '../../models/Plateau';



export default function Plateaux() {

    // States
    const db = useSQLiteContext();
    const [plateaux, setPlateaux] = useState<Plateau[]>([]);
    const [listPlateaux, setListPlateaux] = useState<Record<string, number>>({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPlateauIndex, setSelectedPlateauIndex] = useState<number | null>(null);
  
    useEffect(() => {
      fetchPlateaux();
    }, []);
  
    /**
     * Fetch all plateaux from the database.
     * 
     * @returns void
     * @throws {Error} - If an error occurs during the fetch
     */
    const fetchPlateaux = async () => {
      try {
        const result = await db.getAllAsync<Plateau>('SELECT * FROM plateaux');
        setPlateaux(result);
  
        const result1 = await db.getAllAsync('SELECT * FROM cases WHERE plateaux_id = 1');
        const result2 = await db.getAllAsync('SELECT * FROM cases WHERE plateaux_id = 2');
        const result3 = await db.getAllAsync('SELECT * FROM cases WHERE plateaux_id = 3');
        const result4 = await db.getAllAsync('SELECT * FROM cases WHERE plateaux_id = 4');
        const result5 = await db.getAllAsync('SELECT * FROM cases WHERE plateaux_id = 5');
        const result6 = await db.getAllAsync('SELECT * FROM cases WHERE plateaux_id = 6');
        const result7 = await db.getAllAsync('SELECT * FROM cases WHERE plateaux_id = 7');
        const result8 = await db.getAllAsync('SELECT * FROM cases WHERE plateaux_id = 8');
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

    /**
     * Handle the button press event.
     * 
     * @param {number}
     * @returns void
     */
    const handleButtonPress = (index: number) => {
      setSelectedPlateauIndex(index);
      setModalVisible(true);
    };
  
    /**
     * Close the modal popup.
     * 
     * @returns void
     */
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
            
            <ModalMain isModalVisible={isModalVisible} closePopup={closePopup} selectedPlateauIndex={selectedPlateauIndex} listPlateaux={listPlateaux}/>

        </View>
    );
}

// Styles
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

