/**
 * This context surrounds the app and allows children to access the Fish Count at all times. This is important to ensure that 
 * the game can constantly check whether the user has won the game yet. 
 */
import React, { createContext, useState } from 'react';

const FishCountContext = createContext();

// Creates the fish count useState hook (number) and returns the context provider that is used in app.jsx
const FishCountProvider = ({ children }) => {
    const [fishCount, setFishCount] = useState(0);
    return (
    <FishCountContext.Provider value={{ fishCount, setFishCount }}>
        {children}
    </FishCountContext.Provider>
    );
};


export { FishCountContext, FishCountProvider };