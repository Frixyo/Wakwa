import { StyleSheet, ImageBackground} from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import Game from '../Component/Game';

export default function GamePage() {
  const { plateauId } = useLocalSearchParams();

  return (
    <SQLiteProvider databaseName="mydatabasetest3.db" assetSource={{ assetId: require('../../assets/db/mydatabasetest3.db') }}>
      <ImageBackground source={require('../../assets/bg/bg_1.png')} style={styles.background}>

        <Game plateauId={Array.isArray(plateauId) ? plateauId[0] : plateauId} />
        
      </ImageBackground>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
