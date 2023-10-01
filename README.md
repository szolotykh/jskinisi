JavaScript For Kinisi Contoller - In Development
============
This is a JavaScript library for the Kinisi Controller with web client for testing controller functionality from a web browser.
The library is located in the `./src/commands` directory and the web client is located in the `./src` directory.
In order to run the web client simply open the `index.html` file from `.\src` in a web browser.\
Discription of the commands can be found in [Kinisi Motion Controller framework documentation](https://raw.githubusercontent.com/szolotykh/kinisi-motor-controller-firmware/command-script/commands.md)

## Updating command file
To update the command file, run the following command:
```
cd ./scripts
python3 generate_commands.py
```
The script will generate a new file called `kinisi_commands.js` in the `./src/commands` directory.

## Links
- [Kinisi Motion Controller firmware](https://github.com/szolotykh/kinisi-motor-controller-firmware)
- [Kinisi Motion Controller hardware](https://github.com/szolotykh/kinisi-motor-controller-board)
- [JavaScipt package for kinisi motor controller](https://github.com/szolotykh/jskinisi)
- [Python package for kinisi motor controller](https://github.com/szolotykh/pykinisi)