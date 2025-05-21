const lineCharts = {};
const gaugeCharts = {};
const chartData = {};

$(async function () {
    const conveyorData = await GetAll();
    for (let i = 1; i <= 4; i++) {
        const key = "Conveyor " + i;
        chartData[key] = conveyorData[key];

        // Init line chart
        lineCharts[i] = echarts.init(document.getElementById('lineChart' + i));
        lineCharts[i].setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'time', name: 'Thời gian' },
            yAxis: {
                type: 'value',
                name: 'Tốc độ (m/s)',
                min: 0, max: 1.5
            },
            series: [{
                name: key,
                type: 'line',
                smooth: true,
                data: chartData[key]
            }]
        });

        // Init gauge chart
        gaugeCharts[i] = echarts.init(document.getElementById('gaugeChart' + i));
        const lastVal = chartData[key].at(-1)[1];
        gaugeCharts[i].setOption({
            series: [{
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 1.5,
                detail: { formatter: '{value} m/s', fontSize: 16 },
                data: [{ value: lastVal, name: 'Tốc độ' }]
            }]
        });
    }

    // Cập nhật mỗi 5 giây
    setInterval(() => {
        const now = new Date();
        for (let i = 1; i <= 4; i++) {
            const key = "Conveyor " + i;
            const speed = 0.7;
            const timeStr = now.toISOString().slice(0, 19).replace("T", " ");

            // Cập nhật line
            chartData[key].push([timeStr, speed]);
            lineCharts[i].setOption({
                series: [{ data: chartData[key] }]
            });

            // Cập nhật gauge
            gaugeCharts[i].setOption({
                series: [{ data: [{ value: speed, name: 'Tốc độ' }] }]
            });
        }
    }, 5000);

    window.addEventListener('resize', () => {
        echarts.getInstanceByDom(document.getElementById('lineChart1'))?.resize();
        echarts.getInstanceByDom(document.getElementById('gaugeChart1'))?.resize();
        echarts.getInstanceByDom(document.getElementById('lineChart2'))?.resize();
        echarts.getInstanceByDom(document.getElementById('gaugeChart2'))?.resize();
        echarts.getInstanceByDom(document.getElementById('lineChart3'))?.resize();
        echarts.getInstanceByDom(document.getElementById('gaugeChart3'))?.resize();
        echarts.getInstanceByDom(document.getElementById('lineChart4'))?.resize();
        echarts.getInstanceByDom(document.getElementById('gaugeChart4'))?.resize();
    });

});

function GetAll() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/speed/speed-chart",
            type: "GET",
            dataType: "json",
            success: function (response) {
                resolve(response);
            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });
    });
}

$(async function () {
    const container = document.getElementById('lineChart1');
    const chart = echarts.init(container);
    const rawData = await getData();
    const data = rawData["Conveyor 1"] || [];
    const option =
    {
        title:
            { text: 'Tốc độ Conveyor 1 theo thời gian' },
        tooltip: {
            trigger: 'axis', formatter: function (params) {
                const point = params[0];
                return `${point.axisValueLabel}<br/>Tốc độ: ${point.data[1]} m/s`;
            }
        },
        xAxis: { type: 'time', name: 'Thời gian' },
        yAxis: { type: 'value', name: 'Tốc độ (m/s)', min: 0, max: 0.8 },
        series: [{
            name: 'Conveyor 1',
            type: 'line', smooth: true,
            data: data // Array of [time, speed] 
        }]
    }; 
    chart.setOption(option); // Auto resize 
    window.addEventListener('resize', () => chart.resize());
    // Optional: dynamic update every 5s
    setInterval(async () => { const updatedData = await getData(); const newData = updatedData["Conveyor 1"]; chart.setOption({ series: [{ data: newData }] }); }, 5000);
});
async function getData() { const res = await fetch('/speed/speed-chart'); return await res.json(); } 

