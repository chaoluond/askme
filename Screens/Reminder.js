import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useReminders } from '../RemindersContext';

const Reminder = () => {
    const { reminders } = useReminders(); // Use the hook to access the reminders

    const renderReminderItem = ({ item }) => (
        <View style={styles.reminderItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.location}</Text>
            <Text>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={reminders}
                renderItem={renderReminderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    reminderItem: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: '#82D8CF',
        width: '100%',
        borderRadius: 20,
        alignItems: 'flex-start',
    },
    title: {
        fontWeight: 'bold',
    },
    // ... You can add more styles for your reminders here
});

export default Reminder;