const addReminder = (reminders, setReminders, reminderData) => {
    const [reminder, who, what, where, when] = reminderData;
    const newReminder = {
        id: Date.now().toString(),
        title: 'Title: ' + reminder,
        location: 'Location: ' + where,
        time: 'Time: ' + when
    };

    setReminders([...reminders, newReminder]);
}
export { addReminder };