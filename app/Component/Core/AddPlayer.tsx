//Import librairies
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

// Import Model
import Joueur from '../../Model/Joueur';
import AddPlayerProps from '../../Model/AddPlayersProps';

export default function AddPlayer({ setJoueurs }: AddPlayerProps) {

    //States
    const db = useSQLiteContext();
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');

    /**
     * Get the next index to use for a new user
     * 
     * @returns {Promise<number>} - The next index to use for a new user
     * @throws {Error} - If an error occurs
     */
    const getNextIndex = async () => {
        try {
            const result = await db.getFirstAsync<{ lastIndex: number }>(
                "SELECT MAX(id) AS lastIndex FROM users"
            );
      
            if (result && result.lastIndex !== null) {
                return result.lastIndex + 1;

            } else { 
                return 1 
            }

        } catch (error) {
          console.error("Erreur lors de la récupération du dernier index :", error);
          return 1;
        }
    };


    /**
     * Add a new player to the database.
     * 
     * @returns void
     * @throws {Error} - If an error occurs during the insertion in the database
     */
    const addPlayer = async () => {

        if (userName == '' || userImage == '') {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        const availableId = await getNextIndex();
        try {
            await db.runAsync('INSERT INTO users (id,name, image) VALUES (?, ?, ?)', [availableId, userName, userImage]);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du joueur:', error);
        }
        const result = await db.getAllAsync<Joueur>('SELECT * FROM users');

        setJoueurs(result);
        setUserName('');
        setUserImage('');
    };


    return (
        <View>
            <TextInput style={styles.input} value={userName} onChangeText={setUserName} placeholder="Nom du joueur" />
            <TextInput style={styles.input} value={userImage} onChangeText={setUserImage} placeholder="URL de l'image" />
            <Button onPress={addPlayer} title="Ajouter" color="#841584" />
        </View>
    );
}

//Styles
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: '100%',
    },
});