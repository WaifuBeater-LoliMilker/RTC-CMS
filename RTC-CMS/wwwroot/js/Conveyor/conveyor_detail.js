$(document).ready(() => {
    GenChartTimeLine();
    GenChartLine();
    GenChartSpeed();
    setInterval(function () {
        GenChartTimeLine();
        GenChartLine();
        GenChartSpeed();
    },2000)
})


function GenChartLine() {
    $(".line_chart_engine_vibration").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 15,
                bottom: 25,
                left: 30,
                right: 20
            },
            title: {
                text: 'Độ rung',
                left: 'center',
                top: -5,
                textStyle: {
                    fontSize: 12,
                    color: '#212529',
                    fontFamily: 'sans-serif' // text-dark
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#212529',
                borderColor: '#ccc',
                textStyle: {
                    color: '#fff',
                    fontSize: 10,
                    fontFamily: 'sans-serif'
                },
                formatter: function (params) {
                    const point = params[0];
                    return `⏰ ${point.axisValue} <br/>📈 Giá trị: ${point.data}`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 9,
                    color: '#212529'
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c757d',
                        fontFamily: 'sans-serif'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 9,
                    color: '#212529'
                },
                min: 0.5,
                max: 2,
                axisLine: {
                    lineStyle: {
                        color: '#6c757d',
                        fontFamily: 'sans-serif'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                data: generateRandomArray(1.3, 1.5),
                type: 'line',
                lineStyle: {
                    color: '#ffc107' // hồng đậm - nổi bật trên nền vàng
                },
                itemStyle: {
                    color: '#ffc107'
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 9,
                    color: '#212529',
                    shadowColor: 'transparent',
                    shadowBlur: 0,
                    fontFamily: 'sans-serif'
                    },
                markLine: {
                    silent: true,
                    lineStyle: {
                        color: '#B22222', // Màu đỏ đậm
                        type: 'dashed'     // Kiểu đường: solid, dashed, dotted
                    },
                    label: {
                        fontSize: 8,
                    },
                    symbol: 'none',
                    data: [
                        { yAxis: 1.8 },    // Giới hạn trên
                        { yAxis: 1.1 }      // Giới hạn dưới
                    ]
                }
                }
            ]
        };
        myChart.setOption(option);
    });




    $(".line_chart_engine_temperature").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 15,
                bottom: 25,
                left: 30,
                right: 20
            },
            title: {
                text: 'Nhiệt độ',
                left: 'center',
                top: -5,
                textStyle: {
                    fontSize: 12,
                    color: '#212529',
                    fontFamily: 'sans-serif' // text-dark
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#212529',
                borderColor: '#ccc',
                textStyle: {
                    color: '#fff',
                    fontSize: 10,
                    fontFamily: 'sans-serif'
                },
                formatter: function (params) {
                    const point = params[0];
                    return `⏰ ${point.axisValue} <br/>📈 Giá trị: ${point.data}`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 9,
                    color: '#212529',
                    fontFamily: 'sans-serif'
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c757d'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 9,
                    color: '#212529',
                    fontFamily: 'sans-serif'
                },
                min: 30,
                max: 60,
                axisLine: {
                    lineStyle: {
                        color: '#6c757d'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                data: generateRandomArray(48, 53),
                type: 'line',
                lineStyle: {
                    color: '#d63384' // hồng đậm - nổi bật trên nền vàng
                },
                itemStyle: {
                    color: '#d63384'
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 9,
                    color: '#212529',
                    shadowColor: 'transparent',
                    shadowBlur: 0,
                    fontFamily: 'sans-serif'
                },
                markLine: {
                    silent: true,
                    lineStyle: {
                        color: '#B22222',
                        type: 'dashed'   
                    },
                    label: {
                        fontSize: 8,
                    },
                    symbol: 'none',
                    data: [
                        { yAxis: 45 },    
                        { yAxis: 55 }     
                    ]
                }
            }]
        };
        myChart.setOption(option);
    });



    $(".line_chart_inverter_electric_current").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 15,
                bottom: 25,
                left: 30,
                right: 20
            },
            title: {
                text: 'Dòng điện',
                left: 'center',
                top: -5,
                textStyle: {
                    fontSize: 12,
                    color: '#212529',
                    fontFamily: 'sans-serif' // text-dark
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#212529',
                borderColor: '#ccc',
                textStyle: {
                    color: '#fff',
                    fontSize: 10,
                    fontFamily: 'sans-serif'
                },
                formatter: function (params) {
                    const point = params[0];
                    return `⏰ ${point.axisValue} <br/>📈 Giá trị: ${point.data}`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 9,
                    color: '#212529',
                    fontFamily: 'sans-serif'
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c757d'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 9,
                    color: '#212529',
                    fontFamily: 'sans-serif'
                },
                min: 0,
                max: 5,
                axisLine: {
                    lineStyle: {
                        color: '#6c757d'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                data: generateRandomArray(1.8, 2.3),
                type: 'line',
                lineStyle: {
                    color: '#FFCC00' // hồng đậm - nổi bật trên nền vàng
                },
                itemStyle: {
                    color: '#FFCC00'
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 9,
                    color: '#212529',
                    shadowColor: 'transparent',
                    shadowBlur: 0,
                    fontFamily: 'sans-serif'
                },
                markLine: {
                    silent: true,
                    lineStyle: {
                        color: '#B22222',
                        type: 'dashed'
                    },
                    label: {
                        fontSize: 8,
                    },
                    symbol: 'none',
                    data: [
                        { yAxis: 3.7 },
                        { yAxis: 1 }
                    ]
                }

            }]
        };
        myChart.setOption(option);
    });


    $(".line_chart_inverter_voltage").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 15,
                bottom: 25,
                left: 30,
                right: 20
            },
            title: {
                text: 'Điện áp',
                left: 'center',
                top: -5,
                textStyle: {
                    fontSize: 12,
                    color: '#212529',
                    fontFamily: 'sans-serif'// text-dark
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#212529',
                borderColor: '#ccc',
                textStyle: {
                    color: '#fff',
                    fontSize: 10,
                    fontFamily: 'sans-serif'
                },
                formatter: function (params) {
                    const point = params[0];
                    return `⏰ ${point.axisValue} <br/>📈 Giá trị: ${point.data}`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 9,
                    color: '#212529',
                    fontFamily: 'sans-serif'
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c757d'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 9,
                    color: '#212529',
                    fontFamily: 'sans-serif'
                },
                min: 50,
                max: 400,
                axisLine: {
                    lineStyle: {
                        color: '#6c757d'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                data: generateRandomArray(218, 225),
                type: 'line',
                lineStyle: {
                    color: '#ff4d4d' 
                },
                itemStyle: {
                    color: '#ff4d4d'
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 9,
                    color: '#212529',
                    shadowColor: 'transparent',
                    shadowBlur: 0,
                    fontFamily: 'sans-serif'
                },
                markLine: {
                    silent: true,
                    lineStyle: {
                        color: '#B22222',
                        type: 'dashed'
                    },
                    label: {
                        fontSize: 8,
                    },
                    symbol: 'none',
                    data: [
                        { yAxis: 380 },
                        { yAxis: 100 }
                    ]
                }
            }]
        };
        myChart.setOption(option);
    });


    $(".line_chart_inverter_frequency").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            grid: {
                top: 30,
                bottom: 15,
                left: 30,
                right: 20
            },
            title: {
                text: 'Tần số',
                left: 'center',
                top: -5,
                textStyle: {
                    fontSize: 12,
                    color: '#212529',
                    fontFamily: 'sans-serif'
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#212529',
                borderColor: '#ccc',
                textStyle: {
                    color: '#fff',
                    fontSize: 10,
                    fontFamily: 'sans-serif'
                },
                formatter: function (params) {
                    const point = params[0];
                    return `⏰ ${point.axisValue} <br/>📈 Giá trị: ${point.data}`;
                }
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                axisLabel: {
                    fontSize: 9,
                    color: '#212529',
                    fontFamily: 'sans-serif'
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c757d'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 9,
                    color: '#212529',
                    fontFamily: 'sans-serif'
                },
                axisLine: {
                    lineStyle: {
                        color: '#6c757d'
                    }
                },
                min: 30,
                max: 70,
                splitLine: {
                    show: false
                }
            },
            series: [{
                data: generateRandomArray(53, 58),
                type: 'line',
                lineStyle: {
                    color: '#28a745' 
                },
                itemStyle: {
                    color: '#28a745'
                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 9,
                    color: '#212529',
                    shadowColor: 'transparent',
                    shadowBlur: 0,
                    fontFamily: 'sans-serif'
                },
                markLine: {
                    silent: true,
                    lineStyle: {
                        color: '#B22222',
                        type: 'dashed'
                    },
                    label: {
                        fontSize: 8,
                    },
                    symbol: 'none',
                    data: [
                        { yAxis: 60 },
                        { yAxis: 40 }
                    ]
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
            height: 100,
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

    var myChart = echarts.init(document.getElementById('time_line_speed'));
    var dataSpeed = generateRandomArray(0.6, 0.7);
    var option = {
        grid: {
            top: 20,
            bottom: 25,
            left: 30,
            right: 10
        },
        title: {
            text: 'Tốc độ',
            left: 'center',
            top: 0,
            textStyle: {
                fontSize: 12,
                color: '#212529',
                fontFamily: 'sans-serif' // text-dark
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#212529',
            borderColor: '#ccc',
            textStyle: {
                color: '#fff',
                fontSize: 10
            },
            formatter: function () {
                return `⏰ 13:30 <br/>📈 Giá trị: 12`;
            }
        },
        xAxis: {
            type: 'category',
            data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
            axisLabel: {
                fontSize: 9,
                color: '#212529',
                fontFamily: 'sans-serif'
            },
            axisLine: {
                lineStyle: {
                    color: '#6c757d'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 9,
                color: '#212529',
                fontFamily: 'sans-serif'
            },
            min: 0,
            max: 1.2,
            axisLine: {
                lineStyle: {
                    color: '#6c757d'
                }
            },
            splitLine: {
                show: false
            }
        },
        series: [{
            data: dataSpeed,
            type: 'line',
            lineStyle: {
                color: '#007bff' // xanh dương
            },
            itemStyle: {
                color: '#007bff' // xanh dương
            },
            label: {
                show: true,
                position: 'top',
                fontSize: 9,
                color: '#212529',
                shadowColor: 'transparent',
                shadowBlur: 0,
                fontFamily: 'sans-serif'
            },
            markLine: {
                silent: true,
                lineStyle: {
                    color: '#B22222',
                    type: 'dashed'
                },
                label: {
                    fontSize: 8,
                },
                symbol: 'none',
                data: [
                    { yAxis: 0.5 },
                    { yAxis: 1 }
                ]
            }
        }]
    };
    myChart.setOption(option);

}





function generateRandomArray(min, max) {
    const result = [];

    for (let i = 0; i < 10; i++) {
        const num = Math.random() * (max - min) + min;
        result.push(parseFloat(num.toFixed(2)));
    }

    return result;
}