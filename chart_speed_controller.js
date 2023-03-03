class SpeedControllerChart{
    constructor(canvasId) {
        this.chart = new Chart(canvasId, {
            type: "line",
            data: {
            labels: [],
            datasets: [{
                backgroundColor: "rgba(0,0,0,0.0)",
                borderColor: "rgba(0,0,0,0.9)",
                data: []
            },
            {
                backgroundColor: "rgba(0,0,0,0.0)",
                borderColor: "rgba(200,0,0,0.9)",
                data: []
            }
            ] 
            },
            options: {
                legend: {display: false},
                scales: {
                yAxes: [{ticks: {min: -300, max:300}}],
                }
            }
        });
    }
    

    // https://www.chartjs.org/docs/latest/developers/updates.html
    UpdateData(label, currentVelocity, targetVelocity) {
        this.chart.data.labels.push(label);
        this.chart.data.datasets[0].data.push(currentVelocity);
        this.chart.data.datasets[1].data.push(targetVelocity);

        if(this.chart.data.labels.length > 100){
            this.chart.data.labels.shift();
            this.chart.data.datasets.forEach((dataset) => {
                dataset.data.shift();
            });
        }
        this.chart.update();
    }
}