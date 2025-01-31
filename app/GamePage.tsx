import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { imageMapping,playerImageMapping } from './images';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import { Link } from 'expo-router'; 


interface Case {
  description: string;
  image: string;
}

interface Joueur {
  name: string;
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

  const openPopupParametre = () => {
    setModalVisibleParametre(true);
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
      <View style={styles.controls}>
        <Text style={styles.caseText}> {currentIndex} / {cases.length - 2}</Text>
        <TouchableOpacity onPress={openPopupParametre}>
            <Text style={styles.controlButton}>Affichier la description</Text>
          </TouchableOpacity>
      </View>
  
      <View>
        <View style={styles.caseContainer}>
          {visibleCases.map((item, index) => {
            const playersOnCase = joueurs.filter(joueur => positionsJoueurs[joueur.name] === index + currentIndex - 1); // Case correspondante
            return (
              <Animated.View key={index} style={[styles.case]}>
                <Image source={imageMapping[item.image]} style={styles.caseImage} />

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
          <TouchableOpacity onPress={changerJoueur}>
            <Text style={styles.controlButton}>Changer de joueur</Text>
          </TouchableOpacity>
        </View>
  
        <View>
          <TouchableOpacity onPress={openPopupActionGame}>
            <Text style={styles.controlButton}>Affichier la description</Text>
          </TouchableOpacity>
        </View>
  
        <View>
          <TouchableOpacity onPress={rollDice}>
            <Text style={styles.controlButton}>Lancer le Dé</Text>
          </TouchableOpacity>
  
          <View>
            <TouchableOpacity onPress={goPrev} disabled={currentIndex <= 1}>
              <Text style={styles.controlButton}>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goNext} disabled={currentIndex >= cases.length - 2}>
              <Text style={styles.controlButton}>+1</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  
      <MyModalActionGame isModalVisible={isModalVisibleActionGame} setModalVisible={setModalVisibleActionGame} currentCase={cases[currentIndex]} />
      <MyModalParametre isModalVisible={isModalVisibleParametre} setModalVisible={setModalVisibleParametre} />
    </View>
  );
  
  
  
  
  
}


function MyModalActionGame({ isModalVisible, setModalVisible, currentCase }) {
  const description = currentCase?.description ?? "test";

  const closePopup = () => {
    setModalVisible(false);
  };

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={closePopup}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Description</Text>
        <Text style={styles.modalDescription}>{description}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={closePopup}>
          <Text style={styles.modalButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}


function MyModalParametre({ isModalVisible, setModalVisible}) {

  const closePopup = () => {
    setModalVisible(false);
  };

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={closePopup}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Parametre</Text>
        <Text style={styles.modalDescription}>Attention la partie ne sera pas sauvegardé</Text>

        <TouchableOpacity style={styles.modalButton} onPress={closePopup}>
          <Link href={`/`}>
            <Text style={styles.modalButtonText}>Quitter la partie</Text>
          </Link>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.modalButton}>
          <Text style={styles.modalButtonText}>Close</Text>
        </TouchableOpacity>

        
      </View>
    </Modal>
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
    height: 200,
    overflow: 'hidden',
    position: 'relative', // Permet de positionner les joueurs dessus
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

  // 🔹 Ajout du style pour afficher les joueurs
  joueursContainer: {
    position: 'absolute',
    top: 40, // Ajuster selon la position des cases
    left: 0,
    width: '100%',
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  joueurIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Pour rendre visible
    justifyContent: 'center',
    alignItems: 'center',
  },
  joueurImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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
});
