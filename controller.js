// Motor
INITIALIZE_MOTOR = 0x01
SET_MOTOR_SPEED = 0x02
MOTOR_SET_CONTROLLER =  0x03
MOTOR_SET_TARGET_VELOCITY = 0x04
MOTOR_DEL_CONTROLLER = 0x05

// Encoders
INITIALIZE_ENCODER = 0x11
GET_ENCODER_VALUE = 0x12

// GPIO
PIN_LOW = 0x20
PIN_HIGH = 0x21
PIN_TOGGLE = 0x22

// Status LED
STATUS_LED_OFF = 0x23
STATUS_LED_ON  = 0x24
STATUS_LED_TOGGLE = 0x25

// Platform
PLATFORM_INITIALIZE = 0x30
PLATFORM_SET_VELOCITY_INPUT = 0x31

// https://developer.chrome.com/articles/serial/

class MotorController {
    constructor() {
      this.port = null;
      this.reader = null;
      this.writer = null;
      this.baudRate = 115200;
      this.motors = [false, false, false, false];
    }
  
    async connect() {
        try {
            if (!("serial" in navigator)) {
              throw new Error("Web Serial API is not supported in this browser.");
            }
            this.port = await navigator.serial.requestPort();
            await this.port.open({ baudRate: this.baudRate });
            console.log("Connected.");
            return true;
          }
          catch (error) {
            console.log(`Error connecting to serial port: ${error}`);
            return false;
          }
    }
  
    async setMotorSpeed(motorIndex, direction, speed) {
        /*if(!this.motors[motorIndex]){
            this.write(new Uint8Array([INITIALIZE_MOTOR, motorIndex]));
            this.motors[motorIndex] = true;
        }*/
        await this.write(new Uint8Array([INITIALIZE_MOTOR, motorIndex]));
        await this.write(new Uint8Array([SET_MOTOR_SPEED, motorIndex, direction, speed, speed >> 8]));
        console.log("setMotorSpeed");
    }
  
    async toggleStatusLED() {
        this.write(new Uint8Array([STATUS_LED_TOGGLE]));
        console.log("toggleStatusLED");
    }

    async write(msg){
        var data = new Uint8Array(msg.length + 1);
        data[0] = msg.length;
        data.set(msg, 1);

        console.log(data);

        var writer = this.port.writable.getWriter();
        await writer.write(data);
        await writer.releaseLock();
    }
  
    async disconnect() {
      if (this.port) {
        //await this.reader.cancel();
        //await this.writer.close();
        await this.port.close();
        this.port = null;
        //this.reader = null;
        //this.writer = null;
      }
      console.log("Disconnected.");
    }
  }
  