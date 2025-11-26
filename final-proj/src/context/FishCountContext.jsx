import React, { createContext, useState } from 'react';

const FishCountContext = createContext();

const FishCountProvider = ({ children }) => {
    const [fishCount, setFishCount] = useState(0);
    return (
    <FishCountContext.Provider value={{ fishCount, setFishCount }}>
        {children}
    </FishCountContext.Provider>
    );
};


export { FishCountContext, FishCountProvider };