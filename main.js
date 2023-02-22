async function main()
{
    var controller = new MotorController();
    document.querySelector('#buttonConnectController').addEventListener('click', async () => {
        var result = await controller.connect();
        document.querySelector("#buttonConnectController").disabled = result;
        document.querySelector("#buttonDisconectController").disabled = !result;
    });

    document.querySelector('#buttonDisconectController').addEventListener('click', async () => {
        await controller.disconnect();
        document.querySelector("#buttonConnectController").disabled = false;
        document.querySelector("#buttonDisconectController").disabled = true;
    });

    document.querySelector('#buttonSetMotorSpeed').addEventListener('click', async () => {
        const motorIndex = document.getElementById("motorIndex").value;
        const direction = document.getElementById("motorDirection").value;
        const speed = document.getElementById("motorSpeed").value;
        controller.setMotorSpeed(parseInt(motorIndex), parseInt(direction), parseInt(speed));
        //console.log(motorIndex + ", " + direction + ", " + speed);
    });

    document.querySelector('#buttonToggleStatusLED').addEventListener('click', async () => {
        controller.toggleStatusLED();
    });
}