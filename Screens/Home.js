import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Text
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendTextToChatGPT } from './../Utilities/Chatgpt';

const Home = () => {
    const [inputText, setInputText] = useState('');

    // Function to handle the send action
    const handleSend = () => {
        // Implement what happens when the user presses send
        console.log('Send:', inputText);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.inner}>
                <Text>This is Home screen</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ask me anything"
                    placeholderTextColor="#999"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={() => {
                    if (inputText.trim().length > 0) {
                        // Call your send function here
                        sendTextToChatGPT(inputText);
                        setInputText(''); // Clear text input after sending
                    }
                }}>
                    <MaterialCommunityIcons
                        name={inputText.trim().length > 0 ? 'send' : 'text-to-speech'}
                        size={30}
                        color="#000"
                        style={styles.iconStyle}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'space-between',
    },
    inputContainer: {
        flexDirection: 'row', // Align TextInput and Icon horizontally
        alignItems: 'center', // Center the items vertically
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    textInput: {
        flex: 1, // Take up as much space as possible
        height: 40,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 10, // Add space between the TextInput and the Icon
    },
    iconStyle: {
        padding: 10,
    },
    sendText: {
        color: '#333', // Example send button text color, adjust as needed
        fontSize: 16,
    },
});

export default Home;