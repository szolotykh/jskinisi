import React, { createContext, useState, useEffect } from 'react';
import { KinisiClient } from '../commands/kinisi_client'; // Adjust the import path as needed

export const ControllerContext = createContext();

export const ControllerProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [controller] = useState(new KinisiClient(() => { setIsConnected(false);}));

    useEffect(() => {
        // Any initial setup if needed
        return () => {
            // Cleanup if needed
        };
    }, []);

    const value = {
        controller,
        isConnected,
        setIsConnected
    };

    return (
        <ControllerContext.Provider value={value}>
            {children}
        </ControllerContext.Provider>
    );
};

export default ControllerProvider;