import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, FlatList, Image, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import plateauData from './assets/plateau.json';
import { imageMapping } from './images';

const GamePage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { plateauIndex } = route.params; // Retrieve the plateauIndex from the route params
    const [images, setImages] = useState([]);
    const [middleIndex, setMiddleIndex] = useState(0);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [boolDice, setBoolDice] = useState(false);
    const [diceImage, setDiceImage] = useState(require('./assets/dice.png'));

    const [players, setPlayers] = useState([
        { name: 'Player 1', position: 1, image: require('./assets/pion/pionBleu.png') },
        { name: 'Player 2', position: 1, image: require('./assets/pion/pionVert.png') },
        { name: 'Player 3', position: 1, image: require('./assets/pion/pionRose.png') }
    ]);

    useEffect(() => {
        loadPlateauData(plateauIndex);
    }, [plateauIndex]);

    const loadPlateauData = (index) => {
        try {
            const selectedPlateau = plateauData.plateaus[index].plateau;
            const data = [
                { image: imageMapping['cartevide_01'], text: 'Case Vide' },
                { image: imageMapping['carteDebut'], text: 'Case Debut' },
                ...selectedPlateau.map(item => ({
                    image: imageMapping[item.image],
                    text: item.text
                })),
                { image: imageMapping['carteFin'], text: 'Case Fin' },
                { image: imageMapping['cartevide_01'], text: 'Case Vide' }
            ];
            setImages(data);
        } catch (error) {
            console.error('Error loading plateau data:', error);
        }
    };

    const renderItem = ({ item, index }) => {
        const absoluteIndex = middleIndex + index;
        const playerOnThisCase = players.find(player => player.position === absoluteIndex);

        return (
            <View style={styles.caseContainer}>
                <Image source={item.image} style={styles.caseImage} resizeMode="contain" onLongPress={() => { Alert.alert('Case Info', item.text) }} />
                {playerOnThisCase && (
                    <Image source={playerOnThisCase.image} style={styles.playerImage} resizeMode="contain" />
                )}
            </View>
        );
    };

    const handleMoveToIndex = (index) => {
        if (index >= 0 && index <= images.length - 3) {
            setMiddleIndex(index);
        }
    };

    const rollDice = () => {
        if (!boolDice) {
            const result = Math.floor(Math.random() * 6) + 1;
            Alert.alert('Dice Roll', `You rolled a ${result}!`);
            const newPlayers = [...players];
            let newPosition = newPlayers[activePlayerIndex].position + result;

            if (newPosition >= images.length - 1) {
                newPosition = images.length - 2;
            }

            newPlayers[activePlayerIndex].position = newPosition;
            setPlayers(newPlayers);
            setMiddleIndex(newPlayers[activePlayerIndex].position - 1);
            setBoolDice(true);
            setDiceImage(require('./assets/loop.png'));
            console.log('Players:', newPlayers);
        } else {
            const nextPlayerIndex = (activePlayerIndex + 1) % players.length;
            setActivePlayerIndex(nextPlayerIndex);
            setMiddleIndex(players[nextPlayerIndex].position - 1);
            setBoolDice(false);
            setDiceImage(require('./assets/dice.png'));
        }
    };

    const handleButtonPress = () => {
        navigation.navigate('HomePage');
    };

    return (
        <ImageBackground
            source={require('./assets/bg/bg_1.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.middleCaseText}>{middleIndex + 1} / {images.length - 2}</Text>
                <FlatList
                    data={images.slice(middleIndex, middleIndex + 3)}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => (middleIndex + index).toString()}
                    horizontal={true}
                    contentContainerStyle={styles.casesContainer}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                />
                <Text style={styles.activePlayerText}>
                    Active Player: {players[activePlayerIndex].name}
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.button, styles.scrollButtonRight]}
                onPress={() => handleMoveToIndex(middleIndex + 1)}
                disabled={middleIndex === images.length - 3}
            >
                <Text style={styles.buttonText}>Scroll Right</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.scrollButtonLeft]}
                onPress={() => handleMoveToIndex(middleIndex - 1)}
                disabled={middleIndex === 0}
            >
                <Text style={styles.buttonText}>Scroll Left</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.goToHomeButton]}
                onPress={handleButtonPress}
            >
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.diceButton]}
                onPress={rollDice}
            >
                <Image source={diceImage} style={styles.diceImage} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.caseActionButton]}
                onPress={() => {
                    const selectedCase = images[middleIndex + 1];
                    Alert.alert('Case Action', `You pressed the button on ${selectedCase.text}`);
                }}
            >
                <Text style={styles.buttonText}>Case Action</Text>
            </TouchableOpacity>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleCaseText: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    casesContainer: {
        flexDirection: 'row',
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        justifyContent: 'space-between',
    },
    caseContainer: {
        marginHorizontal: Dimensions.get('window').width * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    caseImage: {
        width: (Dimensions.get('window').width * 0.9 - Dimensions.get('window').width * 0.05 * 2 - Dimensions.get('window').width * 0.02 * 2) / 3,
        height: 200,
        borderRadius: 5,
    },
    playerImage: {
        position: 'absolute',
        width: 50,
        height: 50,
        bottom: 70, // Adjusted to place the player on top of the case
    },
    playerText: {
        position: 'absolute',
        bottom: 10,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    activePlayer: {
        color: 'green', // Couleur différente pour le joueur actif
    },
    activePlayerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    button: {
        position: 'absolute',
        padding: 10,
        borderRadius: 5,
    },
    caseActionButton: {
        bottom: 10,
        right: 10,
        backgroundColor: 'orange',
    },
    scrollButtonRight: {
        bottom: 80,
        right: 10,
        backgroundColor: 'blue',
    },
    scrollButtonLeft: {
        bottom: 80,
        left: 10,
        backgroundColor: 'green',
    },
    goToHomeButton: {
        top: 10,
        right: 10,
        backgroundColor: '#f00',
    },
    diceButton: {
        bottom: 10,
        left: Dimensions.get('window').width / 2 - 25, // Adjusted to center the image
        backgroundColor: 'green',
        paddingHorizontal: 20,
    },
    diceImage: {
        width: 50,
        height: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GamePage;