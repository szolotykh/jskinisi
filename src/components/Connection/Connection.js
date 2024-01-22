import React, { useState, useContext } from 'react';
import { ControllerContext } from '../../contexts/ControllerContext';

function Connection() {
    const { controller, isConnected, setIsConnected } = useContext(ControllerContext);

    const onConnect = async () => {
        setIsConnected(await controller.connect());
    };

    const onDisconnect = async () => {
        await controller.disconnect();
        setIsConnected(false);
    };

    return (
        <div className='connection-panel'>
            <button className='w3-button w3-green' id="buttonConnectController" disabled={isConnected} onClick={onConnect}>Connect</button>
            <button className='w3-button w3-blue' id="buttonDisconectController" disabled={!isConnected} onClick={onDisconnect}>Diconnect</button>
        </div>
    );
}

export default Connection;