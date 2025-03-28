import { Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, ScrollView,ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Link } from 'expo-router';

// Import Components
import Players from '../Component/Core/Players';
import AddPlayer from '../Component/Core/AddPlayer';
// Import Model
import Joueur from '../Model/Joueur';


export default function JoueurPage() {
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);

  return (
    <SQLiteProvider databaseName="mydatabasetest3.db" assetSource={{ assetId: require('../../assets/db/mydatabasetest3.db') }}>
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
