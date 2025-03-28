// Import librairies
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Link } from 'expo-router'; 
import {SQLiteProvider} from 'expo-sqlite';

// Import components
import Plateaux from '../components/cores/Plateaux';

export default function MainPage() {

  return (
    <SQLiteProvider databaseName="mydatabasetest3.db" assetSource={{ assetId: require('../../assets/db/mydatabasetest3.db') }}>
      <ImageBackground source={require('../../assets/bg/bg_1.png')} style={styles.background}>
        <ScrollView>

            <View>
              <Text>Home screen</Text>
              <Link href="/Page/JoueurPage"> Go to Joueur screen </Link>
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
