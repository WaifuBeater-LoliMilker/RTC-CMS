$(() => {
    $('.chart').each(function (index, el) {
        const chart = echarts.init(el);

        const color = el.classList.contains('c-green') ? 'green'
            : el.classList.contains('c-red') ? 'red'
                : 'blue';

        const generateData = () => {
            const base = {
                'green': 200,
                'red': 400,
                'blue': 300
            }[color];

            return Array.from({ length: 7 }, () =>
                Math.floor(base + Math.random() * 50 - 25)
            );
        };

        const option = {
            title: {
                text: `Động cơ ${index + 1}`,
                left: 'center',
                top: 'top',
                textStyle: {
                    fontSize: 16
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
                        fontSize: 8
                    }
                }
            },
            series: [{
                data: generateData(),
                type: 'line',
                lineStyle: {
                    color: color
                },
                itemStyle: {
                    color: color
                }
            }]
        };

        chart.setOption(option);
    });

    var colorArr = ['#9e9e9e', '#00B74A', '#FFA900', '#F93154', '#9e9e9e'];
    google.charts.load('current', { 'packages': ['timeline'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var containers = document.getElementsByClassName('time_line_chart');
        [...containers].forEach(container => {

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

            $(container).css('height', '60px');
        })
    }

});
