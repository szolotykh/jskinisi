function doubleToBytes(double) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, double, true);
    const bytes = new Uint8Array(buffer);
    return bytes;
}

function mergeUint8Arrays(...arrays) {
    const totalLength = arrays.reduce((acc, array) => acc + array.length, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;
    for (const array of arrays) {
      merged.set(array, offset);
      offset += array.length;
    }
    return merged;
}

function uint8ArrayToString(uint8Array, encoding = 'utf-8') {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(uint8Array);
  }

class MessageBuffer {
    constructor() {
      this.buffer = '';
      this.messages = [];
    }
  
    push(data) {
      this.buffer += data;
      const parts = this.buffer.split('\n');
      const last = parts.pop();
  
      for (const part of parts) {
        this.messages.push(part);
      }
  
      this.buffer = last;
    }
  
    pop() {
      const messages = [...this.messages];
      this.messages = [];
      return messages;
    }
}
  