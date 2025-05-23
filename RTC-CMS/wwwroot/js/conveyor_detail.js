$(document).ready(() => {
    GenChartTimeLine();
    GenChartLine();
})


function GenChartLine() {
    //var chartDom = document.getElementsByClassName('line_chart_engine');
    $(".line_chart_engine_vibration").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            title: {
                text: `Động cơ ${index + 1}`,
                left: 'center',       // căn giữa
                top: 'top',           // vị trí trên cùng
                textStyle: {
                    fontSize: 8      // chỉnh kích thước font của tiêu đề
                }
            },
            xAxis: {
                type: 'category',
                show: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8  // ← chỉnh kích cỡ chữ ở đây (px)
                    }
                }
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        };
        myChart.setOption(option);
    });




    $(".line_chart_engine_temperature").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            title: {
                text: `Nhiệt độ`,
                left: 'center',       // căn giữa
                top: 'top',           // vị trí trên cùng
                textStyle: {
                    fontSize: 8      // chỉnh kích thước font của tiêu đề
                }
            },
            xAxis: {
                type: 'category',
                show: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8  // ← chỉnh kích cỡ chữ ở đây (px)
                    }
                }
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                lineStyle: {
                    color: 'red' // đổi màu đường thành đỏ
                },
                itemStyle: {
                    color: 'red' // đổi màu các điểm thành đỏ
                }
            }]
        };
        myChart.setOption(option);
    });



    $(".line_chart_inverter_electric_current").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            title: {
                text: `Biến tần ${index + 1}`,
                left: 'center',       // căn giữa
                top: 'top',           // vị trí trên cùng
                textStyle: {
                    fontSize: 8      // chỉnh kích thước font của tiêu đề
                }
            },
            xAxis: {
                type: 'category',
                show: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8  // ← chỉnh kích cỡ chữ ở đây (px)
                    }
                }
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        };
        myChart.setOption(option);
    });


    $(".line_chart_inverter_voltage").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            title: {
                text: `Điện áp`,
                left: 'center',       // căn giữa
                top: 'top',           // vị trí trên cùng
                textStyle: {
                    fontSize: 8      // chỉnh kích thước font của tiêu đề
                }
            },
            xAxis: {
                type: 'category',
                show: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8  // ← chỉnh kích cỡ chữ ở đây (px)
                    }
                }
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                lineStyle: {
                    color: '#FFD700' // đổi màu đường thành đỏ
                },
                itemStyle: {
                    color: '#FFD700' // đổi màu các điểm thành đỏ
                }
            }]
        };
        myChart.setOption(option);
    });


    $(".line_chart_inverter_frequency").each(function (index, el) {
        var myChart = echarts.init(el);
        var option = {
            title: {
                text: `Tần số`,
                left: 'center',       // căn giữa
                top: 'top',           // vị trí trên cùng
                textStyle: {
                    fontSize: 8      // chỉnh kích thước font của tiêu đề
                }
            },
            xAxis: {
                type: 'category',
                show: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 8  // ← chỉnh kích cỡ chữ ở đây (px)
                    }
                }
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                lineStyle: {
                    color: '#555555' // đổi màu đường thành đỏ
                },
                itemStyle: {
                    color: '#555555' // đổi màu các điểm thành đỏ
                }
            }]
        };
        myChart.setOption(option);
    });
    //var myChart = echarts.init(chartDom);
    //var option = {
    //    xAxis: {
    //        type: 'category',
    //        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //    },
    //    yAxis: {
    //        type: 'value'
    //    },
    //    series: [
    //        {
    //            data: [150, 230, 224, 218, 135, 147, 260],
    //            type: 'line'
    //        }
    //    ]
    //};

    //option && myChart.setOption(option);
}


function GenChartTimeLine() {
    var colorArr = ['#9e9e9e', '#00B74A', '#FFA900', '#F93154', '#9e9e9e'];
    google.charts.load('current', { 'packages': ['timeline'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var container = document.getElementById('time_line_chart');
        var chart = new google.visualization.Timeline(container);

        let object = [];
        for (var i = 0; i < 9; i++) {
            object.push(Object.values(
                {
                    Role: 'Time',
                    Name: `Machine`,
                    Style: colorArr[i % 4],
                    Start: new Date(`2025-05-22T0${i}:00:00`),
                    End: new Date(`2025-05-22T0${i + 1}:00:00`)
                })
            );
        }

        var options = {
            timeline: {
                showBarLabels: false,
                barLabelStyle: {
                    fontSize: 10
                },
                showRowLabels: false
            },
            backgroundColor: '#5e5e5e',
            hAxis: {
                title: 'Hour',
                format: 'HH:mm',
                minValue: new Date('2025-05-22T00:00:00'),
                maxValue: new Date('2025-05-22T23:59:59'),
                textStyle: {
                    fontSize: 8
                },
                textStyle: {
                    fontSize: 8 // Thay đổi kích thước font của các nhãn trên trục hAxis
                },
            },
            avoidOverlappingGridLines: false,
        }

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'Role' });
        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows(object);

        chart.draw(dataTable, options);

        $('#timeline_chart text').css('height', '60px');
    }

}