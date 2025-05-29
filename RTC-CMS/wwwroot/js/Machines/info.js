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
        const stableSpeeds = [68, 72, 71, 69, 70, 67, 73, 74, 66, 70];
        const option = {
            title: {
                text: `Tốc độ`,
                left: 'center',
                top: 'top',
                textStyle: {
                    fontSize: 20
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
                        fontSize: 14
                    }
                }
            },
            series: [{
                data: stableSpeeds,
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
    google.charts.load('current', { 'packages': ['timeline'] });
    google.charts.setOnLoadCallback(() => {
        $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            const target = $(e.target).attr('data-bs-target');
            $(target).find('.timeline-chart').each(function () {
                GenChartTimeLine(this.id);
            });
        });
    });
    drawTable1()
    drawTable2()
    drawTable3()
});
function GenChartTimeLine(id) {
    const container = document.getElementById(id);
    if (!container) return;

    const chart = new google.visualization.Timeline(container);

    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    const object = [
        ['Time', 'Machine', '#00B74A', new Date('2025-05-22T00:00:00'), new Date('2025-05-22T10:00:00')],
        ['Time', 'Machine', '#F93154', new Date('2025-05-22T10:00:00'), new Date('2025-05-22T12:00:00')],
        ['Time', 'Machine', '#FFA900', new Date('2025-05-22T12:00:00'), new Date('2025-05-22T14:00:00')],
        ['Time', 'Machine', '#00B74A', new Date('2025-05-22T14:00:00'), new Date('2025-05-22T23:59:59')],
    ];

    dataTable.addRows(object);

    const options = {
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
            textStyle: { fontSize: 10 }
        },
        avoidOverlappingGridLines: false
    };

    chart.draw(dataTable, options);
}
function drawTable1() {
    function formatDate(date) {
        const pad = n => String(n).padStart(2, '0');
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }
    const status = [
        "Hoạt động bình thường",
        "Hoạt động bình thường",
        "Hoạt động bình thường",
        "Hoạt động bình thường",
        "Hoạt động bình thường",
        "Lỗi",
        "Lỗi",
        "Hoạt động bình thường",
        "Hoạt động bình thường",
        "Hoạt động bình thường"
    ]
    const tasks = Array.from({ length: 10 }, (_, i) => {
        const date = new Date();

        date.setHours(Math.floor(Math.random() * 24));
        date.setMinutes(Math.floor(Math.random() * 60));
        date.setSeconds(Math.floor(Math.random() * 60));

        return {
            time: formatDate(date),
            value: status[i % status.length]
        };
    });

    $('#machine_history_table').tabulator({
        width: "auto",
        data: tasks,
        layout: "fitDataStretch",
        pagination: true,
        paginationSize: 8,
        rowHeight: 52.5,
        rowHeader: {
            headerSort: false,
            resizable: false,
            frozen: true,
            headerHozAlign: "center",
            hozAlign: "center",
            formatter: "rowSelection",
            titleFormatter: "rowSelection", cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            },
            width: '3px'
        },
        columns: [
            { title: "Thời gian", field: "time", width: 200 },
            { title: "Trạng thái", field: "value" },
        ],
    })
}
function drawTable2() {
    function formatDate(date) {
        const pad = n => String(n).padStart(2, '0');
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }
    const status = [
        "Không có lỗi",
        "Không có lỗi",
        "Không có lỗi",
        "Không có lỗi",
        "Không có lỗi",
        "Lỗi cảm biến",
        "Lỗi động cơ",
        "Không có lỗi",
        "Không có lỗi",
        "Không có lỗi"
    ];

    const tasks = Array.from({ length: 10 }, (_, i) => {
        const date = new Date();

        date.setHours(Math.floor(Math.random() * 24));
        date.setMinutes(Math.floor(Math.random() * 60));
        date.setSeconds(Math.floor(Math.random() * 60));

        return {
            time: formatDate(date),
            value: status[i % status.length]
        };
    });

    $('#error_history_table').tabulator({
        width: "auto",
        data: tasks,
        layout: "fitDataStretch",
        pagination: true,
        paginationSize: 8,
        rowHeight: 52.5,
        rowHeader: {
            headerSort: false,
            resizable: false,
            frozen: true,
            headerHozAlign: "center",
            hozAlign: "center",
            formatter: "rowSelection",
            titleFormatter: "rowSelection", cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            },
            width: '3px'
        },
        columns: [
            { title: "Thời gian", field: "time", width: 200 },
            { title: "Giá trị", field: "value" },
        ],
    })
}
function drawTable3() {
    function formatDate(date) {
        const pad = n => String(n).padStart(2, '0');
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }

    const stableSpeeds = [68, 72, 71, 69, 70, 67, 73, 74, 66, 70];

    const tasks = Array.from({ length: 10 }, (_, i) => {
        const date = new Date();

        date.setHours(Math.floor(Math.random() * 24));
        date.setMinutes(Math.floor(Math.random() * 60));
        date.setSeconds(Math.floor(Math.random() * 60));

        return {
            time: formatDate(date),
            value: stableSpeeds[i % stableSpeeds.length]
        };
    });

    $('#machine_status_table').tabulator({
        height: "auto",
        data: tasks,
        layout: "fitDataStretch",
        pagination: true,
        paginationSize: 10,
        rowHeight: 52,
        selectable: true,
        columns: [
            {
                formatter: "rowSelection",
                titleFormatter: "rowSelection",
                hozAlign: "center",
                headerSort: false,
                cellClick: function (e, cell) {
                    cell.getRow().toggleSelect();
                },
                width: 50
            },
            { title: "Thời gian", field: "time", width: 200 },
            { title: "Tốc độ", field: "value" },
        ],
    });
}
