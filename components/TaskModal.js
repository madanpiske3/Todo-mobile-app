import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const TaskModal = ({ isVisible, onClose, onAddTask }) => {
    const [taskText, setTaskText] = useState('');

    const handleAdd = () => {
        if (taskText.trim() !== '') {
            onAddTask(taskText.trim());
            setTaskText(''); // Clear input after adding
            onClose();       // Close the modal
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Task</Text>
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Enter your task..."
                        value={taskText}
                        onChangeText={setTaskText}
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={onClose} // Use the onClose prop
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleAdd} // Use the handleAdd function
                        >
                            <Text style={styles.modalButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    modalInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
        color: '#333'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#007BFF',
        flex: 1,
        marginHorizontal: 5,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
});

export default TaskModal;