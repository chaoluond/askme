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
    Keyboard,
    Image
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendTextToChatGPT } from './../Utilities/Chatgpt';
import { addReminder } from './../Utilities/ReminderUtilities';
import { useReminders } from '../RemindersContext'; // Import the hook

const Header = ({ onExit }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Hello</Text>
        <TouchableOpacity onPress={onExit} style={styles.exitButton}>
            <Text style={styles.exitButtonText}>X</Text>
        </TouchableOpacity>
    </View>
);

const textBoxData = [
    { id: 'reminder', text: 'Create a reminder for me' },
    { id: 'event', text: 'Help me to create an event' },
    { id: 'weather', text: 'Tell me about the weather' },
];

const Home = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [isInChat, setIsInChat] = useState(false);
    const { reminders, setReminders } = useReminders();

    const sendMessage = async (text) => {
        console.log(text);
        if (text && text.trim().length > 0) {
            // Add new message to the messages array
            const newMessage = {
                id: Date.now().toString(), // Unique ID for the key prop
                text: text,
                sender: 'user', // or 'bot' for bot responses
            };
            setMessages([...messages, newMessage]);
            setInputText(''); // Clear text input after sending
            setIsInChat(true);

            // Wait for the bot's response
            let ResponseTextDisplay = '';
            try {
                const botResponseText = await sendTextToChatGPT(text);

                // process reponse
                if (botResponseText.startsWith("who:")) {
                    // Regular expressions to match each line
                    const whoRegex = /who:\s*(.*)/;
                    const whatRegex = /what:\s*(.*)/;
                    const whereRegex = /where:\s*(.*)/;
                    const whenRegex = /when:\s*(.*)/;
                    const taskRegex = /Task 1:\s*(.*)/;

                    // Use match method to extract information
                    let who = botResponseText.match(whoRegex)?.[1];
                    let what = botResponseText.match(whatRegex)?.[1];
                    let where = botResponseText.match(whereRegex)?.[1];
                    let when = botResponseText.match(whenRegex)?.[1];
                    let task = botResponseText.match(taskRegex)?.[1];
                    if (who == 'Tom') {
                        who = 'User';
                        task = task.replace('Tom', 'User');
                    }

                    ResponseTextDisplay = `Reminder: ${task} \nwho: ${who} \nwhat: ${what} \nwhere: ${where} \nwhen: ${when}`;
                    reminderData = [task, who, what, where, when];
                    addReminder(reminders, setReminders, reminderData);
                }
                else {
                    ResponseTextDisplay = botResponseText;
                }

                // Add bot response to the messages array
                const botMessage = {
                    id: Date.now().toString(),
                    text: ResponseTextDisplay,
                    sender: 'chatgpt',
                };

                setMessages(messages => [...messages, botMessage]);
            } catch (error) {
                console.error("Failed to get bot response:", error);
                // Optionally handle errors, e.g., show an error message
            }
        }
    };

    const sendMessageWithText = async (text) => {
        setInputText(text); // Set the text to the inputText state
        await sendMessage(text); // Call the existing sendMessage function
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
                    <Image
                        source={require('./../assets/ai_persona.jpeg')} // Update the path to where your image file is located
                        style={styles.profileImage}
                    />
                    <Text style={styles.textBelowImage}>What can I do for you?</Text>
                </View>
            )}
            <FlatList
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={item => item.id}
                style={styles.messagesList}
            />
            {!isInChat && (
                <View style={styles.textBoxContainer}>
                    {textBoxData.map((box) => (
                        <TouchableOpacity key={box.id} style={styles.textBox} onPress={() => sendMessageWithText(box.text)}>
                            <Text style={styles.textBoxText}>{box.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ask me anything"
                    placeholderTextColor="#999"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={() => sendMessage(inputText)}>
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
        paddingTop: 100,
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
    profileImage: {
        width: 200, // set the width of the image
        height: 200, // set the height of the image
        borderRadius: 100, // make it round
        marginBottom: 20, // space below the image
    },
    textBelowImage: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10, // space below the text
        fontWeight: 'bold',
    },
    textBoxContainer: {
        alignSelf: 'flex-start', // Align container to the left side
        marginLeft: 20, // Spacing from the left side of the screen
    },
    textBox: {
        backgroundColor: '#F0F0F0', // Light grey background
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20, // Rounded corners
        marginVertical: 10, // Space between the boxes
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        // Elevation for Android (drop shadow effect)
        elevation: 3,
    },
    textBoxText: {
        fontSize: 16,
        color: '#000', // Black text color
        fontStyle: 'italic', // Make text italic
        textAlign: 'left', // Align text to the left
    },
});

export default Home;