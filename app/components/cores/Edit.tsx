// Import librairies
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView,TouchableOpacity, Image } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { Link } from 'expo-router'; 

// Import constants
import { imageMappingPlayable } from '../../constants/images';

// Import models
import Case from '../../models/Case';
import EditProps from '../../models/EditProps';


function Edit({ plateauId } : EditProps) {

  //States
  const db = useSQLiteContext();
  const [plateauName, setPlateauName] = useState("");
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plateauResult = await db.getFirstAsync<{ name: string }>(`SELECT name FROM Plateaux WHERE id = ?`,[plateauId]);
        setPlateauName(plateauResult?.name || "");

        const result = await db.getAllAsync<Case>(`SELECT * FROM plateau${plateauId}`);
        setCases(result);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchData();
  }, [plateauId]);

  const addCase = () => {
    setCases([...cases, { description: "", image: randomCase() }]);
  };

  const randomCase = (): keyof typeof imageMappingPlayable => {
    const keys = Object.keys(imageMappingPlayable) as Array<keyof typeof imageMappingPlayable>;
    const randomIndex = Math.floor(Math.random() * keys.length); 
    return keys[randomIndex];
  };

  const removeCase = () => {
    setCases(cases.slice(0, -1));
  };

  const updateCase = (index: number, newDescription: string) => {
    const newCases = [...cases];
    newCases[index] = { ...newCases[index], description: newDescription }; 
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
    <View style={styles.ViewPage}>
      <View style={styles.ViewTitle}>
        <Text>Nom du Plateau :</Text>
        <TextInput
          value={plateauName}
          onChangeText={setPlateauName}
          style={styles.TextInputTitle}
        />
      </View>
      <View style={styles.ViewEdit}>
        <View>
          <ScrollView style={styles.ScrollViewEdit}>
            {cases.map((item, index) => (
              <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                <Text>{`N°${index + 1}`}</Text>
                <Image 
                  source={imageMappingPlayable[item.image]} 
                  style={{ width: 50, height: 50, resizeMode: "contain", marginLeft: 10 }} 
                />
                <TextInput
                  value={item.description}
                  onChangeText={(text) => updateCase(index, text)}
                  style={{ borderWidth: 1, flex: 1, marginLeft: 10, padding: 5 }}
                />
              </View>
            ))}
          </ScrollView>

        </View>
        <View>
          <Button title="Ajouter une case" onPress={addCase} />
          <Button title="Supprimer la dernière case" onPress={removeCase} />
          <Button title="Terminer" onPress={saveChanges} />

          <TouchableOpacity>
            <Link href={`/`}>
              <Text>Quitter la partie</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  ViewPage: {
    flexDirection: 'column',
    padding: 16,
  },
  ViewEdit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ScrollViewEdit: {
    width: '400%',
    height: '85%',
  },
  ViewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },TextInputTitle : {
    width: 400,
  },
});


export default Edit;