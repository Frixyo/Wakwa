import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Link } from 'expo-router'; 
import {SQLiteProvider} from 'expo-sqlite';
import Plateaux from './Component/Plateaux';

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
      </View>


      <Plateaux/>

      </ScrollView>
      </ImageBackground>
    </SQLiteProvider>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  }
});
