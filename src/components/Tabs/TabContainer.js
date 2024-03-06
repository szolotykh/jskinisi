import React, { useState, Children, useContext } from 'react';
import { ControllerContext } from '../../contexts/ControllerContext';
import './Tabs.css';
import '../Common.css';

function TabContainer({ children }) {
    const [activeTab, setActiveTab] = useState(0);
    const { isConnected } = useContext(ControllerContext);

    return (
        <div className={`${!isConnected ? 'disabled-div' : ''}`}>
            <div className='w3-bar w3-black'>
                {Children.map(children, (child, index) => (
                    <div
                        className={`w3-bar-item w3-hover-green w3-button ${index === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {child.props.title}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {Children.toArray(children)[activeTab]}
            </div>
        </div>
    ); 
}

export default TabContainer;