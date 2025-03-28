// Import librairies
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Animated from 'react-native-reanimated';

// Import components
import MyModalActionGame from '../modals/ModalActionGame';
import MyModalParametre from '../modals/ModalParametre';

// Import constants
import { imageMapping,playerImageMapping } from '../../constants/images';

// Import models
import Case from '../../models/Case';
import Joueur from '../../models/Joueur';
import GameProps from '../../models/GameProps';


function Game({ plateauId }: GameProps) {
    const db = useSQLiteContext();
    const [cases, setCases] = useState<Case[]>([]);
    const [joueurs, setJoueurs] = useState<Joueur[]>([]);
    const [positionsJoueurs, setPositionsJoueurs] = useState<Record<string, number>>({});
    const [joueurActifIndex, setJoueurActifIndex] = useState(0);
    const [joueurSpinDice, setJoueurSpinDice] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(1);
  
    const [isModalVisibleActionGame, setModalVisibleActionGame] = useState(false);
    const [isModalVisibleParametre, setModalVisibleParametre] = useState(false);
  
    const fetchCases = async () => {
      try {
        const result = await db.getAllAsync<Case>(`SELECT * FROM plateau${plateauId}`);
    
        const fullCases: Case[] = [
          { description: "Case Vide", image: "cartevide_01" },
          { description: "Case Début", image: "carteDebut" },
          ...result.map(item => ({
            description: item.description,
            image: item.image as keyof typeof imageMapping, // Cast to expected type
          })),
          { description: "Case Fin", image: "carteFin" },
          { description: "Case Vide", image: "cartevide_01" },
        ];
    
        setCases(fullCases);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
    
    const fetchJoueurs = async () => {
      try {
        const result = await db.getAllAsync<Joueur>('SELECT * FROM users');
        setJoueurs(result);
        const initialPositions = Object.fromEntries(result.map(j => [j.name, 1]));
        setPositionsJoueurs(initialPositions);
      } catch (error) {
        console.error('Error fetching joueurs:', error);
      }
    };
    
    useEffect(() => {
      if (plateauId) {
        fetchCases();
        fetchJoueurs();
        console.log(joueurs);
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
  
    const openPopupActionGame = () => {
      setModalVisibleActionGame(true);
    };

    const closePopupActionGame = () => {
        setModalVisibleActionGame(false);
    };
  
    const openPopupParametre = () => {
      setModalVisibleParametre(true);
    };

    const closePopupParametre = () => {
        setModalVisibleParametre(false);
    };
  
    
    const changerJoueur = () => {
      const nextIndex = joueurActifIndex + 1;
      if (nextIndex >= joueurs.length) {
        setJoueurActifIndex(0);
      } else {
        setJoueurActifIndex(nextIndex);
      }
      setJoueurSpinDice(false);
    };
    
    useEffect(() => {
      if (joueurs.length > 0 && joueurs[joueurActifIndex]) {
        setCurrentIndex(positionsJoueurs[joueurs[joueurActifIndex].name]);
      }
    }, [joueurActifIndex, joueurs]);
    
  
    const rollDice = () => {
      if (joueurs.length === 0 || joueurSpinDice) return;
      const random = Math.floor(Math.random() * 6) + 1;
      setJoueurSpinDice(true);
      setPositionsJoueurs((prevPositions) => {
        const newPosition = Math.min((prevPositions[joueurs[joueurActifIndex].name] || 0) + random, cases.length - 2);
        return { ...prevPositions, [joueurs[joueurActifIndex].name]: newPosition };
      });
    
      const newIndex = positionsJoueurs[joueurs[joueurActifIndex].name] + random;
      setCurrentIndex(Math.min(newIndex, cases.length - 2));
    
    }
    
  
    return (
      <View style={styles.container}>
  
        <View style={styles.controlsTop}>
          <Text style={styles.caseTextTop}>{joueurs[joueurActifIndex]?.name || ""}</Text>
          <Text style={styles.caseTextTop}>{currentIndex} / {cases.length - 2}</Text>
          <TouchableOpacity onPress={openPopupParametre} style={styles.gameButton}>
              <Text style={styles.modalButtonText} >Parametre</Text>
          </TouchableOpacity>
        </View>
    
        <View>
          <View style={styles.caseContainer}>
            {visibleCases.map((item, index) => {
              const playersOnCase = joueurs.filter(joueur => positionsJoueurs[joueur.name] === index + currentIndex - 1); // Case correspondante
              return (
                <Animated.View key={index} style={[styles.case]}>
                  <Image source={imageMapping[item.image as keyof typeof imageMapping]} style={styles.caseImage} />
  
                  {playersOnCase.map((joueur, playerIndex) => {
                    const isActive = joueur.name === joueurs[joueurActifIndex].name;
                    const playerImageStyle = isActive
                      ? { width: 50, height: 50 ,bottom: '-10%' }
                      : { width: 30, height: 30, bottom: '-200%' };
    
                    return (
                      <Animated.View
                        key={playerIndex}
                        style={[{ left: isActive ? '40%' : `${(playerIndex + 1) * 10}%`, position: 'absolute'}]}
                      >
                        <Image
                          source={playerImageMapping[joueur.image]}
                          style={[styles.joueurImage, playerImageStyle]}
                        />
                      </Animated.View>
                    );
                  })}
                </Animated.View>
              );
            })}
          </View>
        </View>
    
        <View style={styles.controls}>
  
          <View>
            <TouchableOpacity onPress={changerJoueur} style={styles.gameButton}>
              <Text style={styles.gameButtonText}>Changer de joueur</Text>
            </TouchableOpacity>
          </View>
    
          <View>
            <TouchableOpacity onPress={openPopupActionGame} style={styles.gameButton}>
              <Text style={styles.gameButtonText}>Affichier la description</Text>
            </TouchableOpacity>
          </View>
    
          <View style={styles.controlsInterne}>
            <TouchableOpacity onPress={rollDice} style={styles.gameButton}>
              <Text style={styles.gameButtonText}>Lancer le Dé</Text>
            </TouchableOpacity>
    
            <View style={styles.controlsInternePosition}>
              <TouchableOpacity onPress={goPrev} disabled={currentIndex <= 1} style={[styles.gameButton, styles.gameButtonFlex]}>
                <Text style={styles.gameButtonText}>-1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goNext} disabled={currentIndex >= cases.length - 2} style={[styles.gameButton, styles.gameButtonFlex]}>
                <Text style={styles.gameButtonText}>+1</Text>
              </TouchableOpacity>
            </View>
  
          </View>
        </View>
    
        <MyModalActionGame isModalVisible={isModalVisibleActionGame} closePopupActionGame={closePopupActionGame} currentCase={cases[currentIndex]} />
        <MyModalParametre isModalVisible={isModalVisibleParametre} closePopupParametre={closePopupParametre} />

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
      alignItems: 'center'
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      top: 40,
      width: '90%',
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
      height: 200,
      overflow: 'hidden',
      position: 'relative',
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
    joueursContainer: {
      position: 'absolute',
      top: 40,
      left: 0,
      width: '100%',
      height: 200,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    joueurImage: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginVertical: 5,
    },
    modalDescription: {
      color: 'black',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    gameButton:{
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginVertical: 5,
    },
    gameButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    controlsInterne: {
      flexDirection: 'column',
    },
    controlsInternePosition:{
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    gameButtonFlex:{
      width: 50,    
    },
    controlsTop:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
    },
    caseTextTop:{
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginVertical: 5,
    },
  });

export default Game;