//Import librairies
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';

// Import Model
import Joueur from '../../Model/Joueur';
import AddPlayerProps from '../../Model/AddPlayersProps';

export default function AddPlayer({ setJoueurs }: AddPlayerProps) {

    //States
    const db = useSQLiteContext();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
  
    const getLastIndex = async () => {
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

    const addPlayer = async () => {

        if (name == '' || image == '') {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        const availableId = await getLastIndex();
        try {
            await db.runAsync('INSERT INTO users (id,name, image) VALUES (?, ?, ?)', [availableId, name, image]);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du joueur:', error);
        }
        const result = await db.getAllAsync<Joueur>('SELECT * FROM users');

        setJoueurs(result);
        setName('');
        setImage('');
    };
  
    return (
        <View>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nom du joueur" />
            <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="URL de l'image" />
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