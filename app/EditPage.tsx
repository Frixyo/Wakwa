import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Link } from 'expo-router'; 
import { imageMapping } from './images'; 

interface Case {
  description: string;
  image: string;
}

export default function EditPage() {
  const { plateauId } = useLocalSearchParams();

  return (
    <SQLiteProvider databaseName="mydatabasetest3.db" assetSource={{ assetId: require('../assets/db/mydatabasetest3.db') }}>
      <ImageBackground source={require('../assets/bg/bg_1.png')} style={styles.background}>
        <View>
          <Edit plateauId={plateauId}/>
        </View>
      </ImageBackground>
    </SQLiteProvider>
  );
}


function Edit({ plateauId }) {
  const db = useSQLiteContext();
  const [plateauName, setPlateauName] = useState("");
  const [cases, setCases] = useState<Case[]>([]);

  // Récupérer les données du plateau
  useEffect(() => {
    const fetchData = async () => {
      try {
        const plateauResult = await db.getFirstAsync(`SELECT name FROM Plateaux WHERE id = ?`,[plateauId]);
        setPlateauName(plateauResult?.name || "");

        const result = await db.getAllAsync<Case>(`SELECT * FROM plateau${plateauId}`);
        setCases(result);
        console.log(result);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchData();
  }, [plateauId]);

  const addCase = () => {
    setCases([...cases, { description: "", image: "cartebb_01" }]); //TODO : changer l'image avec un random de imageMapping
  };

  const removeCase = () => {
    setCases(cases.slice(0, -1));
  };

  const updateCase = (index: number, value: string) => {
    const newCases = [...cases];
    newCases[index] = value;
    setCases(newCases);
  };

  // Enregistrer les modifications
  const saveChanges = async () => {
    try {
      await db.runAsync(`UPDATE Plateaux SET name = ? WHERE id = ?`, [
        plateauName,
        plateauId,
      ]);

      await db.runAsync(`DELETE FROM plateau${plateauId}`);

      if (cases.length > 0) {
        const placeholders = cases.map(() => "(?, ?)").join(", ");
        const values = cases.flatMap(({description, image }) => [description, image]);
      
        await db.runAsync(
          `INSERT INTO plateau${plateauId} (description, image) VALUES ${placeholders}`,
          values
        );
      }
      

      console.log("Données enregistrées !");
    } catch (error) {
      console.error("Erreur d'enregistrement :", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nom du Plateau :</Text>
      <TextInput
        value={plateauName}
        onChangeText={setPlateauName}
        style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
      />

      <FlatList
        data={cases}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            <Text>{`N°${index + 1}`}</Text>
            <TextInput
              value={item}
              onChangeText={(text) => updateCase(index, text)}
              style={{ borderWidth: 1, flex: 1, marginLeft: 10, padding: 5 }}
            />
          </View>
        )}
      />

      <Button title="Ajouter une case" onPress={addCase} />
      <Button title="Supprimer la dernière case" onPress={removeCase} />
      <Button title="Terminer" onPress={saveChanges} />

      <TouchableOpacity>
        <Link href={`/`}>
          <Text style={styles.modalButtonText}>Quitter la partie</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}




const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



