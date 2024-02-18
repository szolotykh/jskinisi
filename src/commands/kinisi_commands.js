// ----------------------------------------------------------------------------
// Kinisi motr controller commands.
// This file is auto generated by the commands generator from JSON file.
// Do not edit this file manually.
// Timestamp: 2024-02-17 14:45:00
// Version: 1.0.4
// ----------------------------------------------------------------------------

const INITIALIZE_MOTOR = 0x01
const SET_MOTOR_SPEED = 0x02
const STOP_MOTOR = 0x03
const BRAKE_MOTOR = 0x04
const INITIALIZE_MOTOR_CONTROLLER = 0x05
const SET_MOTOR_TARGET_SPEED = 0x06
const RESET_MOTOR_CONTROLLER = 0x07
const GET_MOTOR_CONTROLLER_STATE = 0x08
const DELETE_MOTOR_CONTROLLER = 0x09
const INITIALIZE_ENCODER = 0x11
const GET_ENCODER_VALUE = 0x12
const START_ENCODER_ODOMETRY = 0x13
const RESET_ENCODER_ODOMETRY = 0x14
const STOP_ENCODER_ODOMETRY = 0x15
const GET_ENCODER_ODOMETRY = 0x16
const INITIALIZE_GPIO_PIN = 0x20
const SET_GPIO_PIN_STATE = 0x21
const GET_GPIO_PIN_STATE = 0x22
const TOGGLE_GPIO_PIN_STATE = 0x23
const SET_STATUS_LED_STATE = 0x25
const TOGGLE_STATUS_LED_STATE = 0x26
const INITIALIZE_MECANUM_PLATFORM = 0x30
const INITIALIZE_OMNI_PLATFORM = 0x31
const SET_PLATFORM_VELOCITY = 0x40
const SET_PLATFORM_CONTROLLER = 0x41
const SET_PLATFORM_TARGET_VELOCITY = 0x42
const GET_PLATFORM_CURRENT_VELOCITY = 0x43
const START_PLATFORM_ODOMETRY = 0x44
const RESET_PLATFORM_ODOMETRY = 0x45
const STOP_PLATFORM_ODOMETRY = 0x46
const GET_PLATFORM_ODOMETRY = 0x47

class MotorControllerState {
    constructor(
        motor_index,
        kp,
        ki,
        kd,
        target_speed,
        current_speed,
        error,
        output,
    )
    {
        this.motor_index = motor_index;
        this.kp = kp;
        this.ki = ki;
        this.kd = kd;
        this.target_speed = target_speed;
        this.current_speed = current_speed;
        this.error = error;
        this.output = output;
    }

    static getSize() {
        return 57;
    }

    encode() {
        const buffer = new ArrayBuffer(this.getSize());
        const view = new DataView(buffer);
        view.setInt8(0, this.motor_index);  // motor_index
        view.setFloat64(1, this.kp, true);  // kp
        view.setFloat64(9, this.ki, true);  // ki
        view.setFloat64(17, this.kd, true);  // kd
        view.setFloat64(25, this.target_speed, true);  // target_speed
        view.setFloat64(33, this.current_speed, true);  // current_speed
        view.setFloat64(41, this.error, true);  // error
        view.setFloat64(49, this.output, true);  // output
        return buffer;
    }

    static decode(buffer) {
        const view = new DataView(buffer);
        const obj = new MotorControllerState(
            view.getInt8(0),  // motor_index
            view.getFloat64(1, true),  // kp
            view.getFloat64(9, true),  // ki
            view.getFloat64(17, true),  // kd
            view.getFloat64(25, true),  // target_speed
            view.getFloat64(33, true),  // current_speed
            view.getFloat64(41, true),  // error
            view.getFloat64(49, true),  // output
        );
        return obj;
    }
}

class PlatformVelocity {
    constructor(
        x,
        y,
        t,
    )
    {
        this.x = x;
        this.y = y;
        this.t = t;
    }

    static getSize() {
        return 24;
    }

    encode() {
        const buffer = new ArrayBuffer(this.getSize());
        const view = new DataView(buffer);
        view.setFloat64(0, this.x, true);  // x
        view.setFloat64(8, this.y, true);  // y
        view.setFloat64(16, this.t, true);  // t
        return buffer;
    }

    static decode(buffer) {
        const view = new DataView(buffer);
        const obj = new PlatformVelocity(
            view.getFloat64(0, true),  // x
            view.getFloat64(8, true),  // y
            view.getFloat64(16, true),  // t
        );
        return obj;
    }
}

class PlatformOdometry {
    constructor(
        x,
        y,
        t,
    )
    {
        this.x = x;
        this.y = y;
        this.t = t;
    }

    static getSize() {
        return 24;
    }

    encode() {
        const buffer = new ArrayBuffer(this.getSize());
        const view = new DataView(buffer);
        view.setFloat64(0, this.x, true);  // x
        view.setFloat64(8, this.y, true);  // y
        view.setFloat64(16, this.t, true);  // t
        return buffer;
    }

    static decode(buffer) {
        const view = new DataView(buffer);
        const obj = new PlatformOdometry(
            view.getFloat64(0, true),  // x
            view.getFloat64(8, true),  // y
            view.getFloat64(16, true),  // t
        );
        return obj;
    }
}

class Commands {
    async write(buffer) {
        throw new Error("write method must be implemented");
    }

    async read(numBytes) {
        throw new Error("read method must be implemented");
    }

    async initialize_motor(motor_index, is_reversed){
        const messageLength = 3;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x01);  // Command byte
        view.setUint8(2, motor_index);  // motor_index
        view.setUint8(3, is_reversed);  // is_reversed
        await this.write(buffer);
    }

    async set_motor_speed(motor_index, pwm){
        const messageLength = 10;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x02);  // Command byte
        view.setUint8(2, motor_index);  // motor_index
        view.setFloat64(3, pwm, true);  // pwm
        await this.write(buffer);
    }

    async stop_motor(motor_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x03);  // Command byte
        view.setUint8(2, motor_index);  // motor_index
        await this.write(buffer);
    }

    async brake_motor(motor_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x04);  // Command byte
        view.setUint8(2, motor_index);  // motor_index
        await this.write(buffer);
    }

    async initialize_motor_controller(motor_index, is_reversed, encoder_index, encoder_resolution, kp, ki, kd, integral_limit){
        const messageLength = 44;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x05);  // Command byte
        view.setUint8(2, motor_index);  // motor_index
        view.setUint8(3, is_reversed);  // is_reversed
        view.setUint8(4, encoder_index);  // encoder_index
        view.setFloat64(5, encoder_resolution, true);  // encoder_resolution
        view.setFloat64(13, kp, true);  // kp
        view.setFloat64(21, ki, true);  // ki
        view.setFloat64(29, kd, true);  // kd
        view.setFloat64(37, integral_limit, true);  // integral_limit
        await this.write(buffer);
    }

    async set_motor_target_speed(motor_index, speed){
        const messageLength = 10;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x06);  // Command byte
        view.setUint8(2, motor_index);  // motor_index
        view.setFloat64(3, speed, true);  // speed
        await this.write(buffer);
    }

    async reset_motor_controller(motor_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x07);  // Command byte
        view.setUint8(2, motor_index);  // motor_index
        await this.write(buffer);
    }

    async get_motor_controller_state(motor_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x08);  // Command byte
        view.setUint8(2, motor_index);  // motor_index
        await this.write(buffer);
        const response_size = MotorControllerState.getSize();
        const result = await this.read(response_size);
        return MotorControllerState.decode(result);
    }

    async delete_motor_controller(motor_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x09);  // Command byte
        view.setUint8(2, motor_index);  // motor_index
        await this.write(buffer);
    }

    async initialize_encoder(encoder_index, encoder_resolution, is_reversed){
        const messageLength = 11;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x11);  // Command byte
        view.setUint8(2, encoder_index);  // encoder_index
        view.setFloat64(3, encoder_resolution, true);  // encoder_resolution
        view.setUint8(11, is_reversed);  // is_reversed
        await this.write(buffer);
    }

    async get_encoder_value(encoder_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x12);  // Command byte
        view.setUint8(2, encoder_index);  // encoder_index
        await this.write(buffer);
        const response_size = 2;
        const result = await this.read(response_size);
        const dataView = new DataView(result, 0);
        return dataView.getUint16(0, true);
    }

    async start_encoder_odometry(encoder_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x13);  // Command byte
        view.setUint8(2, encoder_index);  // encoder_index
        await this.write(buffer);
    }

    async reset_encoder_odometry(encoder_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x14);  // Command byte
        view.setUint8(2, encoder_index);  // encoder_index
        await this.write(buffer);
    }

    async stop_encoder_odometry(encoder_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x15);  // Command byte
        view.setUint8(2, encoder_index);  // encoder_index
        await this.write(buffer);
    }

    async get_encoder_odometry(encoder_index){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x16);  // Command byte
        view.setUint8(2, encoder_index);  // encoder_index
        await this.write(buffer);
        const response_size = 8;
        const result = await this.read(response_size);
        const dataView = new DataView(result, 0);
        return dataView.getFloat64(0, true);
    }

    async initialize_gpio_pin(pin_number, mode){
        const messageLength = 3;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x20);  // Command byte
        view.setUint8(2, pin_number);  // pin_number
        view.setUint8(3, mode);  // mode
        await this.write(buffer);
    }

    async set_gpio_pin_state(pin_number, state){
        const messageLength = 3;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x21);  // Command byte
        view.setUint8(2, pin_number);  // pin_number
        view.setUint8(3, state);  // state
        await this.write(buffer);
    }

    async get_gpio_pin_state(pin_number){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x22);  // Command byte
        view.setUint8(2, pin_number);  // pin_number
        await this.write(buffer);
        const response_size = 1;
        const result = await this.read(response_size);
        const dataView = new DataView(result, 0);
        return dataView.getUint8(0);
    }

    async toggle_gpio_pin_state(pin_number){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x23);  // Command byte
        view.setUint8(2, pin_number);  // pin_number
        await this.write(buffer);
    }

    async set_status_led_state(state){
        const messageLength = 2;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x25);  // Command byte
        view.setUint8(2, state);  // state
        await this.write(buffer);
    }

    async toggle_status_led_state(){
        const messageLength = 1;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x26);  // Command byte
        await this.write(buffer);
    }

    async initialize_mecanum_platform(is_reversed_0, is_reversed_1, is_reversed_2, is_reversed_3, length, width, wheels_diameter){
        const messageLength = 29;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x30);  // Command byte
        view.setUint8(2, is_reversed_0);  // is_reversed_0
        view.setUint8(3, is_reversed_1);  // is_reversed_1
        view.setUint8(4, is_reversed_2);  // is_reversed_2
        view.setUint8(5, is_reversed_3);  // is_reversed_3
        view.setFloat64(6, length, true);  // length
        view.setFloat64(14, width, true);  // width
        view.setFloat64(22, wheels_diameter, true);  // wheels_diameter
        await this.write(buffer);
    }

    async initialize_omni_platform(is_reversed_0, is_reversed_1, is_reversed_2, wheels_diameter, robot_radius){
        const messageLength = 20;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x31);  // Command byte
        view.setUint8(2, is_reversed_0);  // is_reversed_0
        view.setUint8(3, is_reversed_1);  // is_reversed_1
        view.setUint8(4, is_reversed_2);  // is_reversed_2
        view.setFloat64(5, wheels_diameter, true);  // wheels_diameter
        view.setFloat64(13, robot_radius, true);  // robot_radius
        await this.write(buffer);
    }

    async set_platform_velocity(x, y, t){
        const messageLength = 25;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x40);  // Command byte
        view.setFloat64(2, x, true);  // x
        view.setFloat64(10, y, true);  // y
        view.setFloat64(18, t, true);  // t
        await this.write(buffer);
    }

    async set_platform_controller(kp, ki, kd, encoder_resolution, integral_limit){
        const messageLength = 41;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x41);  // Command byte
        view.setFloat64(2, kp, true);  // kp
        view.setFloat64(10, ki, true);  // ki
        view.setFloat64(18, kd, true);  // kd
        view.setFloat64(26, encoder_resolution, true);  // encoder_resolution
        view.setFloat64(34, integral_limit, true);  // integral_limit
        await this.write(buffer);
    }

    async set_platform_target_velocity(x, y, t){
        const messageLength = 25;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x42);  // Command byte
        view.setFloat64(2, x, true);  // x
        view.setFloat64(10, y, true);  // y
        view.setFloat64(18, t, true);  // t
        await this.write(buffer);
    }

    async get_platform_current_velocity(){
        const messageLength = 1;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x43);  // Command byte
        await this.write(buffer);
        const response_size = PlatformVelocity.getSize();
        const result = await this.read(response_size);
        return PlatformVelocity.decode(result);
    }

    async start_platform_odometry(){
        const messageLength = 1;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x44);  // Command byte
        await this.write(buffer);
    }

    async reset_platform_odometry(){
        const messageLength = 1;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x45);  // Command byte
        await this.write(buffer);
    }

    async stop_platform_odometry(){
        const messageLength = 1;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x46);  // Command byte
        await this.write(buffer);
    }

    async get_platform_odometry(){
        const messageLength = 1;
        const buffer = new ArrayBuffer(messageLength + 1);
        const view = new DataView(buffer);
        view.setUint8(0, messageLength);  // Message length
        view.setUint8(1, 0x47);  // Command byte
        await this.write(buffer);
        const response_size = PlatformOdometry.getSize();
        const result = await this.read(response_size);
        return PlatformOdometry.decode(result);
    }

}

export {Commands, MotorControllerState, PlatformVelocity, PlatformOdometry}