let data1 = [];
let data2 = [];
let data3 = [];
let data4 = [];
let now = new Date(); // thời gian bắt đầu
let oneSecond = 1000; // 1 giây
let value = 0.7; // giá trị cố định

var myChart1 = {};
var myChart2 = {};
var myChart3 = {};
var myChart4 = {};

$(async function () {
    const areas = await GetAllArea();
    const treeData = buildTree(areas);


    //console.log(areas);
    var table = new Tabulator("#area_table", {
        //height: "311px",
        width: "auto",
        data: treeData,
        dataTree: true,
        layout: "fitColumns",
        dataTreeStartExpanded: true,
        dataTreeChildField: "children",
        selectableRows: 1,
        columns: [
            { title: "Area code", field: "AreaCode", width: 200, responsive: 0 },
            { title: "Area name", field: "AreaName", widthGrow: 3 },

        ],
    });

    myChart1 = echarts.init(document.getElementById('lineChart1'));
    myChart2 = echarts.init(document.getElementById('lineChart2'));
    myChart3 = echarts.init(document.getElementById('lineChart3'));
    myChart4 = echarts.init(document.getElementById('lineChart4'));
    let option1 = {
        title: {
            text: 'Dữ liệu tốc độ gian thực Băng tải 1',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Arial',
                color: '#333'
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
            splitLine: { show: false }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 1,
            boundaryGap: [0, '100%'],
            splitLine: { show: false }
        },
        dataZoom: [
            //{
            //    type: 'slider', // thanh trượt zoom bên dưới
            //    start: 0,
            //    end: 100
            //},
            {
                type: 'inside' // zoom bằng cuộn chuột hoặc chạm
            }
        ],
        series: [{
            name: 'Tốc độ',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data1
        }]
    };
    let option2 = {
        title: {
            text: 'Dữ liệu tốc độ gian thực Băng tải 2',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Arial',
                color: '#333'
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
            splitLine: { show: false }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 1,
            boundaryGap: [0, '100%'],
            splitLine: { show: false }
        },
        dataZoom: [
            //{
            //    type: 'slider', // thanh trượt zoom bên dưới
            //    start: 0,
            //    end: 100
            //},
            {
                type: 'inside' // zoom bằng cuộn chuột hoặc chạm
            }
        ],
        series: [{
            name: 'Tốc độ',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data2
        }]
    };
    let option3 = {
        title: {
            text: 'Dữ liệu tốc độ gian thực Băng tải 3',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Arial',
                color: '#333'
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
            splitLine: { show: false }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 2,
            boundaryGap: [0, '100%'],
            splitLine: { show: false }
        },
        dataZoom: [
            //{
            //    type: 'slider', // thanh trượt zoom bên dưới
            //    start: 0,
            //    end: 100
            //},
            {
                type: 'inside' // zoom bằng cuộn chuột hoặc chạm
            }
        ],
        series: [{
            name: 'Tốc độ',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data3
        }]
    };
    let option4 = {
        title: {
            text: 'Dữ liệu tốc độ gian thực Băng tải 4',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Arial',
                color: '#333'
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
            splitLine: { show: false }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 2,
            boundaryGap: [0, '100%'],
            splitLine: { show: false }
        },
        dataZoom: [
            //{
            //    type: 'slider', // thanh trượt zoom bên dưới
            //    start: 0,
            //    end: 100
            //},
            {
                type: 'inside' // zoom bằng cuộn chuột hoặc chạm
            }
        ],
        series: [{
            name: 'Tốc độ',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data4
        }]
    };



    myChart1.setOption(option1);
    myChart2.setOption(option2);
    myChart3.setOption(option3);
    myChart4.setOption(option4);


    var option5 = {
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    width: 18
                },
                axisLine: {
                    lineStyle: {
                        width: 18
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: 25,
                    color: '#999',
                    fontSize: 20
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 25,
                    itemStyle: {
                        borderWidth: 10
                    }
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    fontSize: 80,
                    offsetCenter: [0, '70%']
                },
                data: [
                    {
                        value: 1
                    }
                ]
            }
        ]
    };



    // Khởi tạo dữ liệu ban đầu (ví dụ: 1000 điểm)
    for (let i = 0; i < 1000; i++) {
        data1.push(randomData(0.7));
        data2.push(randomData(1));
        data3.push(randomData(1.5));
        data4.push(randomData(2));
    }
    // Cập nhật mỗi giây
    setInterval(function () {
        for (let i = 0; i < 1; i++) {
            data1.shift();
            data1.push(randomData(0.7));

            data2.shift();
            data2.push(randomData(1));

            data3.shift();
            data3.push(randomData(1.2));

            data4.shift();
            data4.push(randomData(1.5));
        }
        myChart1.setOption({
            series: [{ data: data1 }]
        });
        myChart2.setOption({
            series: [{ data: data2 }]
        });
        myChart3.setOption({
            series: [{ data: data3 }]
        });
        myChart4.setOption({
            series: [{ data: data4 }]
        });
    }, 1000);
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


function randomData(val) {
    const now = new Date(); // Thời gian hiện tại
    value = val + (Math.random() * 0.02 - 0.01);

    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/') + ' ' +
            [now.getHours(), now.getMinutes(), now.getSeconds()].map(x => String(x).padStart(2, '0')).join(':'),
            value.toFixed(3) // làm tròn 3 chữ số sau dấu phẩy
        ]
    };
}

function buildTree(dataTree) {
    const map = {};
    const roots = [];

    dataTree.forEach(item => {
        map[item.Id] = { ...item, children: [] };
    });

    dataTree.forEach(item => {
        if (item.ParentId && map[item.ParentId]) {
            map[item.ParentId].children.push(map[item.Id]);
        } else {
            roots.push(map[item.Id]);
        }
    });

    return roots;
}


function GetAllArea() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/areas/get-all",
            type: "GET",
            dataType: "json", // nếu server trả về JSON
            success: function (response) {
                // Xử lý dữ liệu khi gọi API thành công
                resolve(response);
                // Ví dụ: hiển thị dữ liệu ra HTML
            },
            error: function (xhr, status, error) {
                // Xử lý khi có lỗi
                console.error("Lỗi khi gọi API:", error);
                reject(error);
            }
        });
    });
}
