import React, { useState, useContext } from 'react';
import { ControllerContext } from '../../contexts/ControllerContext';
import './PlatformTab.css';

function PlatformTab() {
    const { controller } = useContext(ControllerContext);

    // States for platform type and settings
    const [platformType, setPlatformType] = useState('omni');
    const [isReversed, setIsReversed] = useState({
        mecanum: [false, false, false, false],
        omni: [false, false, false]
    });
    const [velocity, setVelocity] = useState({ x: 0, y: 0, t: 0 });

    // Handlers for changes in form elements
    const handlePlatformTypeChange = (event) => {
        setPlatformType(event.target.value);
    };

    const handleReverseChange = (platform, index) => (event) => {
        setIsReversed(prevState => ({
            ...prevState,
            [platform]: prevState[platform].map((item, i) => i === index ? event.target.checked : item)
        }));
    };

    const handleVelocityChange = (axis) => (event) => {
        setVelocity(prevState => ({ ...prevState, [axis]: event.target.value }));
    };

    // Handler for initializing the platform
    const initializePlatform = async (platform) => {
        console.log(`Initializing ${platform} platform with reversed motors: ${isReversed[platform]}`);
        if (platformType === 'mecanum'){
            await controller.initialize_mecanum_platform(isReversed.mecanum[0], isReversed.mecanum[1], isReversed.mecanum[2], isReversed.mecanum[3]);
        } else if (platformType === 'omni'){
            await controller.initialize_omni_platform(isReversed.omni[0], isReversed.omni[1], isReversed.omni[2], 1, 1);
        }else{
            console.log("Invalid platform type");
        }
    };

    // Handler for setting the platform velocity
    const setPlatformVelocity = async () => {
        console.log(`Setting platform velocity to X:${velocity.x}, Y:${velocity.y}, T:${velocity.t}`);
        await controller.set_platform_velocity_input(velocity.x, velocity.y, velocity.t);
    };

    return (
        <div id="tabPlatform" className="platform-tab controllerTab w3-panel">
            <label htmlFor="platformSelector">Platform:</label>
            <select id="platformSelector" value={platformType} onChange={handlePlatformTypeChange}>
                <option value="mecanum">Mecanum Platform</option>
                <option value="omni">Omni Platform</option>
            </select>

            {platformType === 'mecanum' && (
                <div id="mecanumPlatform">
                    <h2>Mecanum Platform</h2>
                    <div>
                        Motor setup (is reversed):<br/>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <React.Fragment key={index}>
                                <span className='span-check'>
                                    <label htmlFor={`mecanumPlatformIsReverse${index}`}>{index} </label>
                                    <input
                                        type="checkbox"
                                        className='w3-check'
                                        id={`mecanumPlatformIsReverse${index}`} 
                                        checked={isReversed.mecanum[index]} 
                                        onChange={handleReverseChange('mecanum', index)}
                                    />
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                    <button className='w3-button w3-blue' onClick={() => initializePlatform('mecanum')}>Initialize</button><br/>
                </div>
            )}

            {platformType === 'omni' && (
                <div id="omniPlatform">
                    <h2>Omni Platform</h2>
                    <div>
                        Motor setup (is reversed):<br/>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <React.Fragment key={index}>
                                <span className='span-check'>
                                    <label htmlFor={`omniPlatformIsReverse${index}`}>{index} </label>
                                    <input 
                                        type="checkbox"
                                        className='w3-check'
                                        id={`omniPlatformIsReverse${index}`} 
                                        checked={isReversed.omni[index]} 
                                        onChange={handleReverseChange('omni', index)}
                                    />
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                    <button className='w3-button w3-blue' onClick={() => initializePlatform('omni')}>Initialize</button><br/>
                </div>
            )}

            <div>
                <label htmlFor="platformVelocityX">X</label>
                <input 
                    type="range" 
                    min="-100" 
                    max="100" 
                    value={velocity.x} 
                    step="10" 
                    id="platformVelocityX" 
                    onChange={handleVelocityChange('x')}
                />
                <label htmlFor="platformVelocityY">Y</label>
                <input 
                    type="range" 
                    min="-100" 
                    max="100" 
                    value={velocity.y} 
                    step="10" 
                    id="platformVelocityY" 
                    onChange={handleVelocityChange('y')}
                />
                <label htmlFor="platformVelocityT">T</label>
                <input 
                    type="range" 
                    min="-100" 
                    max="100" 
                    value={velocity.t} 
                    step="10" 
                    id="platformVelocityT" 
                    onChange={handleVelocityChange('t')}
                />
                <button className='w3-button w3-blue' onClick={setPlatformVelocity}>Set Platform Velocity</button><br/>
            </div>
        </div>
    );
}

export default PlatformTab;
