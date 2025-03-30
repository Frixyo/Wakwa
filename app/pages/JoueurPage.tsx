// Import librairies
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView,ImageBackground } from 'react-native';
import { useState } from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { Link } from 'expo-router';

// Import components
import Players from '../components/cores/Players';
import AddPlayer from '../components/cores/AddPlayer';

// Import models
import Joueur from '../models/Joueur';


export default function JoueurPage() {
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);

  return (
    <SQLiteProvider databaseName="mydatabase2.db" assetSource={{ assetId: require('../../assets/db/mydatabase2.db') }}>
      <ImageBackground source={require('../../assets/bg/bg_1.png')} style={styles.background}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>

            <View style={styles.players}>
              <Players joueurs={joueurs} setJoueurs={setJoueurs} />
              <AddPlayer setJoueurs={setJoueurs} />
              <Link href="/" > Go to Main screen </Link>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SQLiteProvider>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  players: {
    flexDirection: 'column',
    padding: 16,
  },
});
