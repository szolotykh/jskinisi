async function main()
{
    var controller = new KinisiClient();
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
        const motorIndex = parseInt(document.getElementById("motorIndex").value);
        const direction = parseInt(document.getElementById("motorDirection").value);
        const speed = parseInt(document.getElementById("motorSpeed").value);
        await controller.initialize_motor(motorIndex);
        await controller.set_motor_speed(motorIndex, direction, speed);
    });

    document.querySelector('#buttonSetMotorController').addEventListener('click', async () => {
    	const motorIndex = document.getElementById("motorControllerIndex").value;
      const kp = document.getElementById("motorControllerKP").value;
      const ki = document.getElementById("motorControllerKI").value;
      const kd = document.getElementById("motorControllerKD").value;
      controller.set_motor_controller(parseInt(motorIndex), kp, ki, kd);
    });

    document.querySelector('#buttonSetMotorTargetVelocity').addEventListener('click', async () => {
      const motorIndex = document.getElementById("motorControllerIndex").value;
      const direction = document.getElementById("motorTargetDirection").value;
      const speed = document.getElementById("motorTargetSpeed").value;
      controller.set_motor_target_velocity(parseInt(motorIndex), parseInt(direction), parseInt(speed));
      //console.log(motorIndex + ", " + direction + ", " + speed);
    });

	document.querySelector('#buttonDelMotorController').addEventListener('click', async () => {
		const motorIndex = document.getElementById("motorControllerIndex").value;
        controller.delete_motor_controller(motorIndex);
    });

    document.querySelector('#buttonGetEncoderValue').addEventListener('click', async () => {
      const encoderIndex = parseInt(document.getElementById("encoderIndex").value);
      await controller.initialize_encoder(encoderIndex);
      var value = await controller.get_encoder_value(encoderIndex);
      document.getElementById("encoderValue").innerHTML = value;
    });

	var speedChart = new SpeedControllerChart("chartSpeedController");
	controller.onInfoReceived = function(msg){
		speedChart.UpdateData(msg.seq, msg.velocity, msg.targetVelocity);
	}

	document.querySelector('#buttonSetPlatformVelocity').addEventListener('click', async () => {
		const x = document.getElementById("platformVelocityX").value;
		const y = document.getElementById("platformVelocityY").value;
		const t = document.getElementById("platformVelocityT").value;
		controller.set_platform_velocity_input(parseInt(x), parseInt(y), parseInt(t));
    });

  generateGPIOPins(controller);
}

function openTab(tabName) {
	var tabs = document.getElementsByClassName("controllerTab");
	for (var i = 0; i < tabs.length; i++){
		tabs[i].style.display = "none";
	  }
	document.getElementById(tabName).style.display = "block";
}