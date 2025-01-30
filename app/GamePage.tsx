import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { imageMapping } from './images';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

interface Case {
  description: string;
  image: string;
}

export default function GamePage() {
  const { plateauId } = useLocalSearchParams();

  return (
    <SQLiteProvider databaseName="mydatabasetest3.db" assetSource={{ assetId: require('../assets/db/mydatabasetest3.db') }}>
      <ImageBackground source={require('../assets/bg/bg_1.png')} style={styles.background}>
        <Game plateauId={plateauId} />
      </ImageBackground>
    </SQLiteProvider>
  );
}

function Game({ plateauId }) {
  const db = useSQLiteContext();
  const [cases, setCases] = useState<Case[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const position = useSharedValue(0);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const result = await db.getAllAsync<Case>(`SELECT * FROM plateau${plateauId}`);
        
        const fullCases = [
          { description: "Case Vide", image: "cartevide_01" },
          { description: "Case Début", image: "carteDebut" },
          ...result,
          { description: "Case Fin", image: "carteFin" },
          { description: "Case Vide", image: "cartevide_01" },
        ];
  
        setCases(fullCases);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
  
    if (plateauId) {
      fetchCases();
    }
  }, [plateauId]);

  
  const goNext = () => {
    if (currentIndex < cases.length - 2) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const visibleCases = [
    cases[currentIndex - 1],
    cases[currentIndex],
    cases[currentIndex + 1]
  ].filter(Boolean);

  return (
    <View style={styles.container}>

      <View style={styles.controls}>
        <TouchableOpacity onPress={goPrev} disabled={currentIndex <= 1}>
          <Text style={styles.controlButton}>-1</Text>
        </TouchableOpacity>
        <Text style={styles.caseText}> {currentIndex} / {cases.length - 2}</Text>
        <TouchableOpacity onPress={goNext} disabled={currentIndex >= cases.length - 2}>
          <Text style={styles.controlButton}>+1</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.caseContainer}>
        {visibleCases.map((item, index) => (
          <Animated.View key={index} style={[styles.case]}>
            <Image source={imageMapping[item.image]} style={styles.caseImage} />
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    fontSize: 30,
    marginHorizontal: 20,
    color: 'white',
  },
  caseText: {
    fontSize: 20,
    color: 'white',
  },
  caseContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 400,
    overflow: 'hidden',
  },
  case: {
    width: '33%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  caseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
