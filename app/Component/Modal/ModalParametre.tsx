import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Link } from 'expo-router'; 

interface ModalParametreProps {
    isModalVisible: boolean;
    closePopupParametre: () => void;
}

function ModalParametre({ isModalVisible, closePopupParametre} : ModalParametreProps) {

    return (
      <Modal isVisible={isModalVisible} onBackdropPress={closePopupParametre}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Parametre</Text>
          <Text style={styles.modalDescription}>Attention la partie ne sera pas sauvegardé</Text>
  
          <TouchableOpacity style={styles.modalButton} onPress={closePopupParametre}>
            <Link href={`/`}>
              <Text style={styles.modalButtonText}>Quitter la partie</Text>
            </Link>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.modalButton} onPress={closePopupParametre}>
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


export default ModalParametre;