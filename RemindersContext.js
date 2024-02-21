// RemindersContext.js
import React, { createContext, useState, useContext } from 'react';

const RemindersContext = createContext();

export const useReminders = () => useContext(RemindersContext);

export const RemindersProvider = ({ children }) => {
    const [reminders, setReminders] = useState([]);

    return (
        <RemindersContext.Provider value={{ reminders, setReminders }}>
            {children}
        </RemindersContext.Provider>
    );
};
