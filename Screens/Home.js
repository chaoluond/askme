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

const Home = () => {
    const [inputText, setInputText] = useState('');
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.inner}>
                <Text>This is Home screen</Text>
            </View>
            <TouchableOpacity activeOpacity={1} style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ask me anything"
                    placeholderTextColor="#999"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <MaterialCommunityIcons
                    name="text-to-speech"
                    size={30} // You can adjust the size as needed
                    color="#333" // This is the icon color; change as needed
                    style={styles.iconStyle}
                />
            </TouchableOpacity>
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
});

export default Home;