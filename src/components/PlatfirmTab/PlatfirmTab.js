import React, { useState, useContext } from 'react';
import { ControllerContext } from '../../contexts/ControllerContext';
import './PlatformTab.css';

function PlatformTab() {
    const { controller, isConnected} = useContext(ControllerContext);

    // States for platform type and settings
    const [platformType, setPlatformType] = useState('omni');
    const [isReversed, setIsReversed] = useState({
        mecanum: [false, false, false, false],
        omni: [false, false, false]
    });

    // Mecanum platform properties
    const [mecanumWheelDiameter, setMecanumWheelDiameter] = useState(0.1);
    const [mecanumLength, setMecanumLength] = useState(0.5);
    const [mecanumWidth, setMecanumWidth] = useState(0.5);

    // Omni platform properties
    const [omniWheelDiameter, setOmniWheelDiameter] = useState(0.1);
    const [omniRadius, setOmniRadius] = useState(0.15);


    const [velocity, setVelocity] = useState({ x: 0, y: 0, t: 0 });

    // States for PID settings
    const [encoderResolution, setEncoderResolution] = useState('537.7');
    const [kp, setKp] = useState('0.1');
    const [ki, setKi] = useState('0');
    const [kd, setKd] = useState('0');
    const [integralLimit, setIntegralLimit] = useState('30');

    const [velocityTarget, setVelocityTarget] = useState({ x: 0, y: 0, t: 0 });

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

    const handleMecanumWheelDiameterChange = (event) => {
        setMecanumWheelDiameter(event.target.value);
    };

    const handleMecanumLengthChange = (event) => {
        setMecanumLength(event.target.value);
    };

    const handleMecanumWidthChange = (event) => {
        setMecanumWidth(event.target.value);
    };

    const handleOmniWheelDiameterChange = (event) => {
        setOmniWheelDiameter(event.target.value);
    };

    const handleOmniRadiusChange = (event) => {
        setOmniRadius(event.target.value);
    };

    const handleVelocityChange = (axis) => (event) => {
        setVelocity(prevState => ({ ...prevState, [axis]: event.target.value }));
    };

    const handleEncoderResolutionChange = (event) => {
        setEncoderResolution(event.target.value);
    };

    const handleKpChange = (event) => {
        setKp(event.target.value);
    };

    const handleKiChange = (event) => {
        setKi(event.target.value);
    };

    const handleKdChange = (event) => {
        setKd(event.target.value);
    };

    const handleVelocityTargetChange = (axis) => (event) => {
        setVelocityTarget({ ...velocityTarget, [axis]: event.target.value });
    };

    const handleIntegralLimitChange = (event) => {
        setIntegralLimit(event.target.value);
    };

    const initializePlatformController = async () => {
        controller.set_platform_controller(kp, ki, kd, encoderResolution, integralLimit);
    };


    // Handler for initializing the platform
    const initializePlatform = async (platform) => {
        console.log(`Initializing ${platform} platform with reversed motors: ${isReversed[platform]}`);
        if (platformType === 'mecanum'){
            await controller.initialize_mecanum_platform(
                isReversed.mecanum[0],
                isReversed.mecanum[1],
                isReversed.mecanum[2],
                isReversed.mecanum[3],
                mecanumLength,
                mecanumWidth,
                mecanumWheelDiameter);
        } else if (platformType === 'omni'){
            await controller.initialize_omni_platform(
                isReversed.omni[0],
                isReversed.omni[1],
                isReversed.omni[2],
                omniWheelDiameter,
                omniRadius);
        }else{
            console.log("Invalid platform type");
        }
    };

    // Handler for setting the platform velocity
    const setPlatformVelocity = async () => {
        console.log(`Setting platform velocity to X:${velocity.x}, Y:${velocity.y}, T:${velocity.t}`);
        await controller.set_platform_velocity(velocity.x, velocity.y, velocity.t);
    };

    const setVelocityTargetHandler = async () => {
        console.log(`Setting platform velocity target to X:${velocityTarget.x}, Y:${velocityTarget.y}, T:${velocityTarget.t}`);
        await controller.set_platform_target_velocity(velocityTarget.x, velocityTarget.y, velocityTarget.t);
    }

    return (
        <div id="tabPlatform" className="platform-tab controllerTab w3-row container">
            <div className='w3-col m4 l2'>
                <h2>Platform Settings</h2>
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
                                        <label className="checkbox-label" htmlFor={`mecanumPlatformIsReverse${index}`}>{index} </label>
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
                        <label htmlFor='mecanum_wheel_diameter'>Wheels Diameter (meters)</label>
                        <input type='number' id='mecanum_wheel_diameter' value={mecanumWheelDiameter} onChange={handleMecanumWheelDiameterChange}/>
                        <label htmlFor='mecanum_length'>Platform length (meters)</label>
                        <input type='number' id='mecanum_length' value={mecanumLength} onChange={handleMecanumLengthChange}/>
                        <label htmlFor='mecanum_width'>Platform width (meters)</label>
                        <input type='number' id='mecanum_width' value={mecanumWidth} onChange={handleMecanumWidthChange}/>
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
                                        <label className="checkbox-label" htmlFor={`omniPlatformIsReverse${index}`}>{index} </label>
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
                        <label htmlFor='omni_wheel_diameter'>Wheels Diameter (meters)</label>
                        <input type='number' id='omni_wheel_diameter' value={omniWheelDiameter} onChange={handleOmniWheelDiameterChange}/>
                        <label htmlFor='omni_radius'>Platform radius (meters)</label>
                        <input type='number' id='omni_radius' value={omniRadius} onChange={handleOmniRadiusChange}/>
                        <button className='w3-button w3-blue' onClick={() => initializePlatform('omni')}>Initialize</button><br/>
                    </div>
                )}

                <div>
                    <label htmlFor="platformVelocityX">X [-100.0 to 100.0]</label>
                    <input 
                        type="range" 
                        min="-100" 
                        max="100" 
                        value={velocity.x} 
                        step="10" 
                        id="platformVelocityX" 
                        onChange={handleVelocityChange('x')}
                    />
                    <label htmlFor="platformVelocityY">Y [-100.0 to 100.0]</label>
                    <input 
                        type="range" 
                        min="-100" 
                        max="100" 
                        value={velocity.y} 
                        step="10" 
                        id="platformVelocityY" 
                        onChange={handleVelocityChange('y')}
                    />
                    <label htmlFor="platformVelocityT">T [-100.0 to 100.0]</label>
                    <input 
                        type="range" 
                        min="-100" 
                        max="100" 
                        value={velocity.t} 
                        step="10" 
                        id="platformVelocityT" 
                        onChange={handleVelocityChange('t')}
                    />
                    <button className='w3-button w3-blue' onClick={setPlatformVelocity}>Set Platform Velocity</button>
                </div>
            </div>
            <div className='w3-col m4 l2'>
                <h2>Controller Settings</h2>
                <label htmlFor='encoderResolution'>Encoder Resolution (tickes/second):</label>
                <input type='text' id='encoderResolution' value={encoderResolution} onChange={handleEncoderResolutionChange}/>
                <label htmlFor='kp'>Kp:</label>
                <input type='text' id='kp' value={kp} onChange={handleKpChange}/>
                <label htmlFor='ki'>Ki:</label>
                <input type='text' id='ki' value={ki} onChange={handleKiChange}/>
                <label htmlFor='kd'>Kd:</label>
                <input type='text' id='kd' value={kd} onChange={handleKdChange}/>
                <label htmlFor='integralLimit'>Integral Limit:</label>
                <input type='text' id='integralLimit' value={integralLimit} onChange={handleIntegralLimitChange}/>
                <button className='w3-button w3-blue' onClick={initializePlatformController}>Initialize Platform Controller</button>

                <label htmlFor="platformVelocityTargetX">X (m/s)</label>
                <input type="number" id="platformVelocityTargetX" step={0.1} value={velocityTarget.x} onChange={handleVelocityTargetChange('x')}/>
                <label htmlFor="platformVelocityTargetY">Y (m/s)</label>
                <input type="number" id="platformVelocityTargetY" step={0.1} value={velocityTarget.y} onChange={handleVelocityTargetChange('y')}/>
                <label htmlFor="platformVelocityTargetT">T (radian/s)</label>
                <input type="number" id="platformVelocityTargetT" step={0.1} value={velocityTarget.t} onChange={handleVelocityTargetChange('t')}/>

                <button className='w3-button w3-blue' onClick={setVelocityTargetHandler}>Set Platform Velocity Target</button>
            </div>
        </div>
    );
}

export default PlatformTab;
