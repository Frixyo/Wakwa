// Import librairies
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Link } from 'expo-router'; 
import {SQLiteProvider} from 'expo-sqlite';

// Import components
import Plateaux from '../components/cores/Plateaux';

export default function MainPage() {

  return (
    <SQLiteProvider databaseName="mydatabase2.db" assetSource={{ assetId: require('../../assets/db/mydatabase2.db') }}>
      <ImageBackground source={require('../../assets/bg/bg_1.png')} style={styles.background}>
        <ScrollView>

            <View>
              <Text>Home screen</Text>
              <Link href="/pages/JoueurPage"> Go to Joueur screen </Link>
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
