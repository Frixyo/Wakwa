// Imort librairies
import { Text, View, StyleSheet, Button} from 'react-native';
import { useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

// Import models
import Joueur from '../../models/Joueur';
import PlayersProps from '../../models/PlayersProps';


export default function Players({ joueurs, setJoueurs }: PlayersProps) {
    const db = useSQLiteContext();
  
    useEffect(() => {
      const fetchJoueurs = async () => {
        const result = await db.getAllAsync<Joueur>('SELECT * FROM users');
        setJoueurs(result);
      };
  
      fetchJoueurs();
    }, [db]);
  
    const supprimerJoueur = async (index) => {
      try {
        await db.runAsync('DELETE FROM users WHERE id = $id', { $id: index });
        await db.runAsync("UPDATE users SET id = (SELECT COUNT(*) FROM users u2 WHERE u2.id < users.id) + 1;");
        await db.runAsync("DELETE FROM sqlite_sequence WHERE name = 'users';");

        const updatedJoueurs = await db.getAllAsync<Joueur>('SELECT * FROM users');
        setJoueurs(updatedJoueurs);
        
      } catch (error) {
        console.error('Erreur lors de la suppression du joueur:', error);
      }
    };
  
    return (
      <View>
        {joueurs.length > 0 ? (
          joueurs.map((joueur, index) => (
            <View key={index}>
              <Text>{`${joueur.name} - ${joueur.image} - ${joueur.id}`}</Text>
              <Button onPress={() => supprimerJoueur(joueur.id)} title="Supprimer" color="#841584" />
            </View>
          ))
        ) : (
          <Text>Aucun joueur trouvé.</Text>
        )}
      </View>
    );
}