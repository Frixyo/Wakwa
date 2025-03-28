import { View, StyleSheet, ImageBackground } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import Edit from '../Component/Edit';

export default function EditPage() {
  const { plateauId } = useLocalSearchParams();
  return (
    <SQLiteProvider databaseName="mydatabasetest3.db" assetSource={{ assetId: require('../../assets/db/mydatabasetest3.db') }}>
      <ImageBackground source={require('../../assets/bg/bg_1.png')} style={styles.background}>
        <View>
          <Edit plateauId={plateauId}/>
        </View>
      </ImageBackground>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  }
});



