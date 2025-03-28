// Import librairies
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Modal from 'react-native-modal';

// Import models
import ModalMainProps from '../../models/ModalMainProps';

/**
 * ModalMain component
 * Modal to start a game or edit a plateau
 * 
 * @param {isModalVisible} boolean - The state of the modal
 * @param {closePopup} void - The function to close the modal
 * @param {selectedPlateauIndex} number - The index of the selected plateau
 * @param {listPlateaux} Record<string, number> - The list of plateaux
 */
export default function ModalMain({ isModalVisible, closePopup, selectedPlateauIndex, listPlateaux }: ModalMainProps) {
    return (
        <Modal isVisible={isModalVisible} onBackdropPress={closePopup}>
            <View style={styles.modalContainer}>
      
                <Text style={styles.modalTitle}>Options</Text>

                <TouchableOpacity style={styles.modalButton} disabled={!selectedPlateauIndex || listPlateaux[selectedPlateauIndex] === 0}>
                    <Link href={`/pages/GamePage?plateauId=${selectedPlateauIndex}`}>
                        <Text style={styles.modalButtonText}>Start Game</Text>
                    </Link>
                </TouchableOpacity>
                
                
                <TouchableOpacity style={styles.modalButton}>
                    <Link href={`/pages/EditPage?plateauId=${selectedPlateauIndex}`}>
                        <Text style={styles.modalButtonText}>Edit Plateau</Text>
                    </Link>
                </TouchableOpacity>
                

                <TouchableOpacity style={styles.modalButton} onPress={closePopup}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
                
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  modalButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

