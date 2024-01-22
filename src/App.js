import './App.css';
import React, { useState } from 'react';
import Connection from './components/Connection/Connection'
import TabContainer from './components/Tabs/TabContainer'
import MotorTab from './components/MotorTab/MotorTab'
import PlatformTab from './components/PlatfirmTab/PlatfirmTab'
import GPIOTab from './components/GPIOTab/GPIOTab';
import ControllerProvider from './contexts/ControllerContext';

function App() {

  return (
    <ControllerProvider>
    <div className="App">
      <header>
        Kinisi motor controller
      </header>
      <Connection/>
      <TabContainer>
        <MotorTab title="Motor"></MotorTab>
        <PlatformTab title="Platform"></PlatformTab>
        <GPIOTab title="GPIO"></GPIOTab>
      </TabContainer>
    </div>
    <footer>
      VsReality
    </footer>
    </ControllerProvider>
  );
}

export default App;
