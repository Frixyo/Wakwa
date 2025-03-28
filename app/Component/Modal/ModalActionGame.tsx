import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface ModalActionGameProps {
    isModalVisible: boolean;
    closePopupActionGame: () => void;
    currentCase: Record<string, number>;
}

function ModalActionGame({ isModalVisible, closePopupActionGame, currentCase }: ModalActionGameProps) {
    const description = currentCase?.description ?? "test";

    return (
      <Modal isVisible={isModalVisible} onBackdropPress={closePopupActionGame}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Description</Text>
          <Text style={styles.modalDescription}>{description}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={closePopupActionGame}>
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
    }
});

export default ModalActionGame;