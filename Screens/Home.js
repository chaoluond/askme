import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Text,
    FlatList,
    Keyboard
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendTextToChatGPT } from './../Utilities/Chatgpt';

const Header = ({ onExit }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Hello</Text>
        <TouchableOpacity onPress={onExit} style={styles.exitButton}>
            <Text style={styles.exitButtonText}>X</Text>
        </TouchableOpacity>
    </View>
);

const Home = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [isInChat, setIsInChat] = useState(false);

    const sendMessage = () => {
        if (inputText.trim().length > 0) {
            // Add new message to the messages array
            const newMessage = {
                id: Date.now().toString(), // Unique ID for the key prop
                text: inputText,
                sender: 'user', // or 'bot' for bot responses
            };
            setMessages([...messages, newMessage]);
            setInputText(''); // Clear text input after sending
            setIsInChat(true);
            // You would also want to handle the bot response here
        }
    };

    const renderMessageItem = ({ item }) => {
        return (
            <View style={styles.messageBubble(item.sender)}>
                <Text style={styles.senderText}>{item.sender.toUpperCase()}</Text>
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        );
    };

    // Reset the chat window after exit
    const resetMessages = () => {
        setMessages([]);
        setIsInChat(false);
        Keyboard.dismiss();
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {isInChat && <Header onExit={resetMessages} />}
            {!isInChat && (
                <View style={styles.inner}>
                    <Text>This is Home screen</Text>
                </View>
            )}
            <FlatList
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={item => item.id}
                style={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ask me anything"
                    placeholderTextColor="#999"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={sendMessage}>
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
        justifyContent: 'center',
        alignItems: 'center', // Add this line
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
    messagesList: {
        flex: 1,
        width: '100%',
        marginTop: 0, // Adjust this value as needed
    },
    messageText: {
        fontSize: 18, // Choose the font size that suits your design
        color: '#000', // Any color you want for the text
    },
    senderText: {
        fontWeight: 'bold',
        color: '#333', // Any color you want for the sender label
        marginBottom: 4, // Space between sender label and message text
    },
    messageBubble: sender => ({
        padding: 10,
        marginVertical: 0,
        marginHorizontal: 0,
        borderRadius: 10,
        backgroundColor: sender === 'user' ? '#add8e6' : '#d3d3d3', // Light blue for user, grey for chatgpt
        alignSelf: 'flex-start',
        width: '100%',
        borderWidth: 1,
        borderColor: '#E8E8E8', // Optional for border color
    }),
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align children to the right
        alignItems: 'center', // Center children vertically
        paddingTop: 55,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8', // Optional for border color
    },
    headerTitle: {
        position: 'absolute', // Position absolutely to ensure it's centered
        left: 0,
        right: 0,
        textAlign: 'center', // Center text horizontally
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 50,
    },
    exitButton: {
        paddingHorizontal: 20,
    },
    exitButtonText: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default Home;