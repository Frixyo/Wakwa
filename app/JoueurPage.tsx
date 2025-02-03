import { Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, ScrollView,ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Link } from 'expo-router'; 

interface Joueur {
  name: string;
  image: string;
  id: string;
}

export default function JoueurPage() {
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);

  return (
    <SQLiteProvider databaseName="mydatabasetest3.db" assetSource={{ assetId: require('../assets/db/mydatabasetest3.db') }}>
      <ImageBackground source={require('../assets/bg/bg_1.png')} style={styles.background}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>

            <View style={styles.content}>
              <Content joueurs={joueurs} setJoueurs={setJoueurs} />
              <AddPlayer setJoueurs={setJoueurs} />
              <Link href="/" > Go to Main screen </Link>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SQLiteProvider>
  );
}


interface ContentProps {
  joueurs: Joueur[];
  setJoueurs: (joueurs: Joueur[]) => void;
}

function Content({ joueurs, setJoueurs }: ContentProps) {
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
      console.log(`Joueur avec id ${index} supprimé.`);
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


interface AddPlayerProps {
  setJoueurs: (joueurs: Joueur[]) => void;
}

function AddPlayer({ setJoueurs }: AddPlayerProps) {
  const db = useSQLiteContext();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  async function getSmallestAvailableId(db : SQLiteDatabase) {
    const result = await db.getAllAsync('SELECT id FROM users ORDER BY id');
    let smallestId = 1;

    result.forEach((joueur) => {
      if (joueur.id === smallestId) {
        smallestId++;
      }
    });
  
    return smallestId;
  }

  const addPlayer = async () => {
    if (name == '' || image == '') {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const availableId = await getSmallestAvailableId(db);
    await db.runAsync('INSERT INTO users (id,name, image) VALUES (?, ?, ?)', [availableId, name, image]);
    const result = await db.getAllAsync<Joueur>('SELECT * FROM users');
    setJoueurs(result);
    setName('');
    setImage('');
    console.log(`Joueur avec id ${index} supprimé.`);
  };

  return (
    <View>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nom du joueur" />
      <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="URL de l'image" />
      <Button onPress={addPlayer} title="Ajouter" color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flexDirection: 'column',
    padding: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
});
