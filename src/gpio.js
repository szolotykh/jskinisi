// Function to populate the HTML for each GPIO pin
// GPIO pins are numbered 0-7
// GPIO modes 0 = INPUT_PULLDOWN, 1 = INPUT_PULLUP, 2 = INPUT_NOPULL, 3 = OUTPUT
function generateGPIOPins(controller) {
    const container = document.getElementById('tabGPIO');
    const toggle_status_led = `
        <h2>Status LED</h2>
        <div>
            <button id = "buttonToggleStatusLED">ToggleStatusLED</button>
        </div>
        <hr>
        `;
    container.innerHTML += toggle_status_led;

    for (let i = 0; i < 8; i++) {
        const gpioHTML = `
            <div id="GPIO${i}" class="gpio-div">
                <h3>GPIO ${i}</h3>
                <samp>Mode:</samp>
                <input type="radio" id="GPIO${i}ModeInputPulldown" name="GPIO${i}Mode" value="0">
                <label for="GPIO${i}ModeInputPulldown">Input Pulldown</label>

                <input type="radio" id="GPIO${i}ModeInputPullup" name="GPIO${i}Mode" value="1">
                <label for="GPIO${i}ModeInputPullup">Input Pullup</label>

                <input type="radio" id="GPIO${i}ModeInputNopull" name="GPIO${i}Mode" value="2">
                <label for="GPIO${i}ModeInputNopull">Input No Pull</label>

                <input type="radio" id="GPIO${i}ModeOutput" name="GPIO${i}Mode" value="3">
                <label for="GPIO${i}ModeOutput">Output</label>

                <div id="GPIO${i}OutputPanel" class="gpioPanel">
                    <label for="GPIO${i}State">State</label>
                    <input type="range" min="0" max="1" value="0" step="1" id="GPIO${i}State"><br>
                </div>

                <div id="GPIO${i}InputPanel" class="gpioPanel">
                    <button id="buttonGPIO${i}Read">Read</button>
                    <samp>Value: </samp><div id="GPIO${i}Value"></div>
                </div>
            </div>
        `;
        container.innerHTML += gpioHTML;
    }

    // Attach event listeners to the status LED button
    document.querySelector('#buttonToggleStatusLED').addEventListener('click', async () => {
        controller.toggle_status_led_state();
    });

    // Attach event listeners to all radio buttons
    for (let i = 0; i < 8; i++) {
        document.getElementById(`GPIO${i}ModeInputPulldown`).addEventListener('change', handleRadioChange);
        document.getElementById(`GPIO${i}ModeInputPullup`).addEventListener('change', handleRadioChange);
        document.getElementById(`GPIO${i}ModeInputNopull`).addEventListener('change', handleRadioChange);
        document.getElementById(`GPIO${i}ModeOutput`).addEventListener('change', handleRadioChange);
    }

    // Attach event listeners to all output sliders
    for (let i = 0; i < 8; i++) {
        document.getElementById(`GPIO${i}State`).addEventListener('change', handleOutputSliderChange);
    }

    // Attach event listeners to all read buttons
    for (let i = 0; i < 8; i++) {
        document.getElementById(`buttonGPIO${i}Read`).addEventListener('click', async () => {
            const value = await controller.get_gpio_pin_state(i);
            document.getElementById(`GPIO${i}Value`).innerHTML = value;
        });
    }

    // Function to handle radio button changes
    async function handleRadioChange(event) {
        const gpioNum = event.target.id.match(/\d+/)[0]; // Extract the number from the ID

        const inputPanel = document.getElementById(`GPIO${gpioNum}InputPanel`);
        const outputPanel = document.getElementById(`GPIO${gpioNum}OutputPanel`);

        switch (event.target.value) {
            case "0":  // Input Pulldown
            case "1":  // Input Pullup
            case "2":  // Input No Pull
                inputPanel.style.display = "block";
                outputPanel.style.display = "none";
                break;
            case "3":  // Output
                outputPanel.style.display = "block";
                inputPanel.style.display = "none";
                break;
            default:
                inputPanel.style.display = "none";
                outputPanel.style.display = "none";
                break;
        }
        console.log(event.target.value);
        await controller.initialize_gpio_pin(parseInt(gpioNum), parseInt(event.target.value));
    }

    async function handleOutputSliderChange(event) {
        const gpioNum = event.target.id.match(/\d+/)[0]; // Extract the number from the ID
        const state = event.target.value;

        await controller.set_gpio_pin_state(parseInt(gpioNum), parseInt(state));
    }
}

