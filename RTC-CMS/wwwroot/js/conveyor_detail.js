$(document).ready(() => {
    GenChartTimeLine();
    GenChartLine();
    GenChartSpeed();
})


function GenChartLine() {
    $(".line_chart_engine_vibration").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 5,
                bottom: 15,
                left: 25,
                right: 5
            },
            title: {
                text: `Độ rung`,
                left: 'center',
                top: 'top',
                textStyle: {
                    fontSize: 11
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function () {
                    return `⏰ 13:30 <br/>📈 Giá trị: 12`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 8
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8
                    }
                }
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 8
                }
            }]
        };
        myChart.setOption(option);
    });




    $(".line_chart_engine_temperature").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 5,
                bottom: 15,
                left: 25,
                right: 5
            },
            title: {
                text: `Nhiệt độ`,
                left: 'center',
                top: 'top',
                textStyle: {
                    fontSize: 11
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function () {
                    return `⏰ 13:30 <br/>📈 Giá trị: 12`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 8
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8
                    }
                }
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                lineStyle: {
                    color: 'red'
                },
                itemStyle: {
                    color: 'red'
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 8
                }
            }]
        };
        myChart.setOption(option);
    });



    $(".line_chart_inverter_electric_current").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 5,
                bottom: 15,
                left: 25,
                right: 5
            },
            title: {
                text: `Dòng`,
                left: 'center',
                top: 'top',
                textStyle: {
                    fontSize: 11
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function () {
                    return `⏰ 13:30 <br/>📈 Giá trị: 12`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 8
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8
                    }
                }
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 8
                }
            }]
        };
        myChart.setOption(option);
    });


    $(".line_chart_inverter_voltage").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 5,
                bottom: 15,
                left: 25,
                right: 5
            },
            title: {
                text: `Điện áp`,
                left: 'center',
                top: 'top',
                textStyle: {
                    fontSize: 11
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function () {
                    return `⏰ 13:30 <br/>📈 Giá trị: 12`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 8
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8
                    }
                }
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                lineStyle: {
                    color: '#FFD700'
                },
                itemStyle: {
                    color: '#FFD700'
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 8
                }
            }]
        };
        myChart.setOption(option);
    });


    $(".line_chart_inverter_frequency").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 5,
                bottom: 15,
                left: 25,
                right: 5
            },
            title: {
                text: `Tần số`,
                left: 'center',
                top: 'top',
                textStyle: {
                    fontSize: 11
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function () {
                    return `⏰ 13:30 <br/>📈 Giá trị: 12`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 8
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8
                    }
                }
            },

            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                lineStyle: {
                    color: '#555555'
                },
                itemStyle: {
                    color: '#555555'
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 8
                }
            }]
        };
        myChart.setOption(option);
    });


}


function GenChartTimeLine() {
    var colorArr = ['#9e9e9e', '#00B74A', '#FFA900', '#F93154', '#9e9e9e'];
    google.charts.load('current', { 'packages': ['timeline'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var container = document.getElementById('time_line_chart');
        var chart = new google.visualization.Timeline(container);

        let object = [];
        object.push(Object.values(
            {
                Role: 'Time',
                Name: `Machine`,
                Style: '#00B74A',
                Start: new Date(`2025-05-22T00:00:00`),
                End: new Date(`2025-05-22T10:00:00`)
            })
        );

        object.push(Object.values(
            {
                Role: 'Time',
                Name: `Machine`,
                Style: '#F93154',
                Start: new Date(`2025-05-22T10:00:00`),
                End: new Date(`2025-05-22T12:00:00`)
            })
        );


        object.push(Object.values(
            {
                Role: 'Time',
                Name: `Machine`,
                Style: '#FFA900',
                Start: new Date(`2025-05-22T12:00:00`),
                End: new Date(`2025-05-22T14:00:00`)
            })
        );


        object.push(Object.values(
            {
                Role: 'Time',
                Name: `Machine`,
                Style: '#00B74A',
                Start: new Date(`2025-05-22T14:00:00`),
                End: new Date(`2025-05-22T23:59:59`)
            })
        );

        var options = {
            timeline: {
                showBarLabels: false,
                showRowLabels: false,
            },
            backgroundColor: '#cbcbcf',
            hAxis: {
                title: 'Hour',
                format: 'HH:mm',
                minValue: new Date('2025-05-22T00:00:00'),
                maxValue: new Date('2025-05-22T23:59:59'),
                textStyle: {
                    fontSize: 10
                }
            },
            avoidOverlappingGridLines: false
        }

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'Role' });
        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows(object);




        chart.draw(dataTable, options);


       
    }

}


var dataSpeed = [];
function GenChartSpeed() {

    let dataSpeed = [];
    let now = new Date();
    let startTime = new Date(now.getTime() - 100 * 30 * 1000);

    for (let i = 0; i < 100; i++) {
        let time = new Date(startTime.getTime() + i * 30 * 1000);
        let speed = Math.random(); 
        dataSpeed.push([time, speed]);
    }

    var chart = echarts.init(document.getElementById('time_line_speed'));
    let option1 = {
        grid: {
            top: 15,
            bottom: 25,
            left: 30,
            right: 15
        },
        title: {
            text: `Tốc độ`,
            left: 'center',
            top: 'top',
            textStyle: {
                fontSize: 11
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let param = params[0];
                return `${param.value[0]} : ${param.value[1]} m/s`;
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 1,
        },
        series: [{
            name: 'Tốc độ',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: dataSpeed
        }]
    };

    chart.setOption(option1);
}

function randomData(val) {
    const now = new Date();
    value = val + (Math.random() * 0.02 - 0.01);

    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/') + ' ' +
            [now.getHours(), now.getMinutes(), now.getSeconds()].map(x => String(x).padStart(2, '0')).join(':'),
            value.toFixed(3)
        ]
    };
}