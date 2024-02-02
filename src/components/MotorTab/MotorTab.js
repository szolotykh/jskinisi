import React, { useState, useContext } from 'react';
import { ControllerContext } from '../../contexts/ControllerContext';
import './MotorTab.css';

function MotorTab(){
    const { controller } = useContext(ControllerContext);
    
    const [motorIndex, setMotorIndex] = useState('0');
    const [isMotorReversed, setIsMotorReversed] = useState(false);
    const [motorSpeed, setMotorSpeed] = useState(0);
    const [encoderIndex, setEncoderIndex] = useState('0');
    const [encoderValue, setEncoderValue] = useState('');

    const handleMotorIndexChange = (event) => {
        setMotorIndex(event.target.value);
    };

    const handleMotorReversedChange = (event) => {
        setIsMotorReversed(event.target.checked);
    };

    const handleMotorSpeedChange = (event) => {
        setMotorSpeed(event.target.value);
    };

    const handleEncoderIndexChange = (event) => {
        setEncoderIndex(event.target.value);
    };

    // Simulated function for setting motor speed
    const setMotorSpeedFunction = async () => {
        console.log(`Setting motor ${motorIndex} speed to ${motorSpeed}, reverse: ${isMotorReversed}`);

        await controller.initialize_motor(motorIndex, isMotorReversed);
        await controller.set_motor_speed(motorIndex, motorSpeed);
    };

    // Simulated function to stop the motor
    const stopMotorFunction = async () => {
        console.log(`Stopping motor ${motorIndex}`);
        setMotorSpeed(0);
        await controller.stop_motor(motorIndex);
    };

    // Simulated function to brake the motor
    const brakeMotorFunction = async () => {
        console.log(`Braking motor ${motorIndex}`);
        setMotorSpeed(0);
        await controller.brake_motor(motorIndex);
    };

    // Simulated function to get encoder value
    const getEncoderValueFunction = async () => {
        await controller.initialize_encoder(encoderIndex);
        var value = await controller.get_encoder_value(encoderIndex);
        setEncoderValue(value);
        console.log(`Encoder ${encoderIndex} value: ${value}`);
    };

    return (
        <div className='motor-tab controllerTag w3-container'>
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
            <p>
                <label htmlFor='motorSpeed'>Speed (PWM):</label>
                <input className='' type='range' min='-100' max='100' value={motorSpeed} id='motorSpeed' onChange={handleMotorSpeedChange}/>
                <button className='w3-button w3-blue' onClick={setMotorSpeedFunction}>Set motor Speed</button>
                <button className='w3-button w3-blue' onClick={stopMotorFunction}>Stop motor</button>
                <button className='w3-button w3-blue' onClick={brakeMotorFunction}>Brake motor</button>
            </p>
            <hr/>

            {/* Encoder Controls */}
            <h2>Encoder</h2>
            <div>
                <label htmlFor='encoderIndex'>Encoder Index:</label>
                <select id='encoderIndex' value={encoderIndex} onChange={handleEncoderIndexChange}>
                    <option value='0'>Encoder 0</option>
                    <option value='1'>Encoder 1</option>
                    <option value='2'>Encoder 2</option>
                    <option value='3'>Encoder 3</option>
                </select><br/>
                <button className='w3-button w3-blue' onClick={getEncoderValueFunction}>Get Encoder Value</button>
                <div id='encoderValue'>{encoderValue}</div>
            </div>
        </div>
    );
}

export default MotorTab;