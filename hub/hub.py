import asyncio
import serial
import serial.tools.list_ports
import websockets

async def websocket_handler(websocket, path, ser):
    # Listen for incoming messages from the WebSocket and forward them to the serial port
    async for message in websocket:
        print(f"Received message from WebSocket: {message}")
        ser.write(message.encode())
        print("Message forwarded to Kinisi device.")

def find_kinisi_device():
    ports = serial.tools.list_ports.comports()
    for port in ports:
        print(port.apply_usb_info)
        if 'Kinisi' in port.description:
            return port.device
    return None

async def main():
    kinisi_port = find_kinisi_device()
    if kinisi_port:
        print(f"Found Kinisi device at {kinisi_port}")
        try:
            ser = serial.Serial(kinisi_port, 9600, timeout=1)  # Adjust the baud rate as needed
            print("Connection opened to Kinisi device.")

            # Start WebSocket server
            server = await websockets.serve(lambda ws, path: websocket_handler(ws, path, ser), "localhost", 8765)
            print("WebSocket server started. Listening on ws://localhost:8765")
            await server.wait_closed()

            ser.close()
            print("Connection closed.")
        except serial.SerialException as e:
            print(f"Error opening serial connection: {e}")
    else:
        print("No Kinisi device found.")

if __name__ == '__main__':
    asyncio.run(main())
