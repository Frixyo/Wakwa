// Import librairies
import { StyleSheet, ImageBackground } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';

// Import components
import Edit from '../components/cores/Edit';

export default function EditPage() {
  const { plateauId } = useLocalSearchParams();

  return (
    <SQLiteProvider databaseName="mydatabase2.db" assetSource={{ assetId: require('../../assets/db/mydatabase2.db') }}>
      <ImageBackground source={require('../../assets/bg/bg_1.png')} style={styles.background}>

        <Edit plateauId={Array.isArray(plateauId) ? plateauId[0] : plateauId}/>

      </ImageBackground>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  }
});



