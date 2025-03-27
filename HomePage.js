import React, { useState } from 'react';
import { StatusBar, ImageBackground, Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import plateauData from './assets/plateau.json';
import Modal from 'react-native-modal';

const HomeScreen = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPlateauIndex, setSelectedPlateauIndex] = useState(null);

    const handleButtonPress = (index) => {
        setSelectedPlateauIndex(index);
        setModalVisible(true);
    };

    const startGame = () => {
        setModalVisible(false);
        navigation.navigate('GamePage', { plateauIndex: selectedPlateauIndex });
    };

    const closePopup = () => {
        setModalVisible(false);
    };

    return (
        <ImageBackground
            source={require('./assets/bg/bg_1.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Image
                    source={require('./assets/logo.png')}
                    style={styles.logo}
                />
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Plateau {index + 1}</Text>
                </TouchableOpacity>
                <View style={styles.buttonGroupContainer}>
                    <View style={styles.buttonContainer}>
                        {plateauData.plateaus.slice(0, 4).map((plateau, index) => (
                            <TouchableOpacity
                                style={styles.button}
                                key={index}
                                onPress={() => handleButtonPress(index)}
                            >
                                <Text style={styles.buttonText}>Plateau {index + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.buttonContainer}>
                        {plateauData.plateaus.slice(4, 8).map((plateau, index) => (
                            <TouchableOpacity
                                style={styles.button}
                                key={index + 4}
                                onPress={() => handleButtonPress(index + 4)}
                            >
                                <Text style={styles.buttonText}>Plateau {index + 5}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <Modal isVisible={isModalVisible} onBackdropPress={closePopup}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Options</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={startGame}>
                            <Text style={styles.modalButtonText}>Start Game</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Option 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={closePopup}>
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <StatusBar style="auto" />
            </View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 50,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginTop: 50,
    },
    buttonGroupContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;