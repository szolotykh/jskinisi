class KinisiClient extends Commands {
    // Constructor
    constructor() {
      super();
      this.port = null;
      this.reader = null;
      this.writer = null;
      this.baudRate = 115200;
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
  
    // Write data to the serial port
    async write(buffer) {
        var writer = this.port.writable.getWriter();
        await writer.write(buffer);
        await writer.releaseLock();
    }

    // Read data from the serial port
    async read(numBytes) {
        let reader = this.port.readable.getReader({ mode: "byob" });
        let buffer = new ArrayBuffer(numBytes);
        let offset = 0;
        while (offset < buffer.byteLength) {
            const { value, done } = await reader.read(new Uint8Array(buffer, offset));
            if (done) {
                break;
            }
            buffer = value.buffer;
            offset += value.byteLength;
        }
        await reader.releaseLock();
        var dataView = new DataView(buffer, 0);
        return dataView.getInt16(0, true);
    }

    async disconnect() {
        if (this.port) {
          await this.port.close();
          this.port = null;
          this.reader = null;
        }
        console.log("Disconnected.");
      }
  }