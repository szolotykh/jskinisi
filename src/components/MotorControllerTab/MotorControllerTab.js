import React, { useState, useContext, useEffect} from 'react';
import { ControllerContext } from '../../contexts/ControllerContext';
import './MotorControllerTab.css';
import MotorControllerChart from './MotorControllerChart';

function MotorControllerTab(){
    const { controller, isConnected} = useContext(ControllerContext);
    
    const [motorIndex, setMotorIndex] = useState('0');
    const [isMotorReversed, setIsMotorReversed] = useState(false);
    const [motorSpeed, setMotorSpeed] = useState(0);
    const [encoderIndex, setEncoderIndex] = useState('0');
    const [encoderResolution, setEncoderResolution] = useState(537.7);
    const [kp, setKp] = useState('0.1');
    const [ki, setKi] = useState('0');
    const [kd, setKd] = useState('0');
    const [integralLimit, setIntegralLimit] = useState('30');
    const [updateStateInterval, setUpdateStateInterval] = useState(null);

    const [motorControllerState, motorControllerStateUpdate] = useState({
        motor_index: 0,
        kp: 0,
        ki: 0,
        kd: 0,
        target_speed: 0,
        current_speed: 0,
        error: 0,
        output: 0,
    });

    const handleMotorIndexChange = (event) => {
        setMotorIndex(event.target.value);
    };

    const handleMotorReversedChange = (event) => {
        setIsMotorReversed(event.target.checked);
    };

    const handleEncoderResolutionChange = (event) => {
        setEncoderResolution(event.target.value);
    };

    const handleMotorSpeedChange = (event) => {
        setMotorSpeed(event.target.value);
    };

    const handleEncoderIndexChange = (event) => {
        setEncoderIndex(event.target.value);
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

    // Initialize motor controller
    const initializeMotorControllerFunction = async () => {
        console.log(`Initializing motor controller`);
        await controller.initialize_motor_controller(motorIndex, isMotorReversed, encoderIndex, encoderResolution, kp, ki, kd, integralLimit);
        // start periodicly requesting motor controller state
        setUpdateStateInterval(
            setInterval(getControllerStateFunction, 500)
        );
    };

    // Simulated function for setting motor speed
    const setMotorSpeedFunction = async () => {
        console.log(`Setting motor ${motorIndex} speed to ${motorSpeed}, reverse: ${isMotorReversed}`);
        await controller.set_motor_target_speed(motorIndex, motorSpeed);
    };

    const getControllerStateFunction = async () => {
        console.log(`Getting controller state`);
        /*
        motor_index,
        kp,
        ki,
        kd,
        target_speed,
        current_speed,
        error,
        output,
        */
        var state = await controller.get_motor_controller_state(motorIndex);

        // TODO: Remove this hack
        state.output = state.output / 10;

        motorControllerStateUpdate(state);
        console.log(state);
    };

    // Stop motor controller
    const stopMotorControllerFunction = async () => {
        // Stop periodicly requesting motor controller state
        clearInterval(updateStateInterval);

        // Set motor speed to 0
        setMotorSpeed(0);

        // Stop motor controller
        console.log(`Stopping motor controller`);
        await controller.delete_motor_controller(motorIndex);
    };

    useEffect(() => {
        if (!isConnected) {
            setMotorSpeed(0);
            clearInterval(updateStateInterval);
        }
    }, [isConnected]);

    return (
        <div className='controllerTag w3-container container motor-controller-options'>
            <div className='column'>
                {/* Motor Controls */}
                <p>
                    <label>Motor Index </label>
                    <select value={motorIndex} onChange={handleMotorIndexChange}>
                        <option value='0'>Motor 0</option>
                        <option value='1'>Motor 1</option>
                        <option value='2'>Motor 2</option>
                        <option value='3'>Motor 3</option>
                    </select>
                </p>
                <p>
                    <label className='label-for-check'>Is Reverse </label>
                    <input type='checkbox' className='w3-check' checked={isMotorReversed} onChange={handleMotorReversedChange}/>
                </p>
                <div>
                    <label htmlFor='encoderIndex'>Encoder Index:</label>
                    <select id='encoderIndex' value={encoderIndex} onChange={handleEncoderIndexChange}>
                        <option value='0'>Encoder 0</option>
                        <option value='1'>Encoder 1</option>
                        <option value='2'>Encoder 2</option>
                        <option value='3'>Encoder 3</option>
                    </select><br/>
                    <label htmlFor='encoderResolution'>Encoder Resolution (tickes/second):</label><br/>
                    <input type='text' id='encoderResolution' value={encoderResolution} onChange={handleEncoderResolutionChange}/><br/>
                </div>
                {/* PID Parameters*/}
                <div>
                    <label htmlFor='kp'>Kp:</label><br/>
                    <input type='text' id='kp' value={kp} onChange={handleKpChange}/><br/>
                    <label htmlFor='ki'>Ki:</label><br/>
                    <input type='text' id='ki' value={ki} onChange={handleKiChange}/><br/>
                    <label htmlFor='kd'>Kd:</label><br/>
                    <input type='text' id='kd' value={kd} onChange={handleKdChange}/><br/>
                    <label htmlFor='integralLimit'>Integral Limit:</label><br/>
                    <input type='text' id='integralLimit' value={integralLimit} onChange={handleKdChange}/><br/>
                </div>
                <p>
                    <button className='w3-button w3-blue' onClick={initializeMotorControllerFunction}>Initialize Motor Controller</button>
                    <label htmlFor='motorSpeed'>Speed (radian/sec):</label>
                    <input className='' type='range' min='-8' max='8' step='0.5' value={motorSpeed} id='motorSpeed' onChange={handleMotorSpeedChange}/>
                    <button className='w3-button w3-blue' onClick={setMotorSpeedFunction}>Set motor Speed</button>
                    <button className='w3-button w3-blue' onClick={getControllerStateFunction}>GetControllerState</button>
                    <button className='w3-button w3-blue' onClick={stopMotorControllerFunction}>Stop Controller</button>
                </p>
            </div>
            <div className='column'>
            <MotorControllerChart motorControllerState = {motorControllerState}/>
            </div>
        </div>
    );
}

export default MotorControllerTab;