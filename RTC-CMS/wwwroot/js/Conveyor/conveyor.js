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
    LoadConveyorData();
    GenChartTimeLine();

    setInterval(function () {
        LoadConveyorData();
        GenChartTimeLine();
    }, 2000)
});
function GenChartTimeLine() {
    var colorArr = ['#9e9e9e', '#00B74A', '#FFA900', '#F93154', '#9e9e9e'];
    google.charts.load('current', { 'packages': ['timeline'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {

        $(".time_line_chart").each(function (index, el) {
            var chart = new google.visualization.Timeline(el);

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
                    Style: '#00B74A',
                    Start: new Date(`2025-05-22T12:00:00`),
                    End: new Date(`2025-05-22T22:00:00`)
                })
            );


            object.push(Object.values(
                {
                    Role: 'Time',
                    Name: `Machine`,
                    Style: '#FFA900', 
                    Start: new Date(`2025-05-22T22:00:00`),
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
        })


        var container = document.getElementsByClassName('time_line_chart');
    }

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



function LoadConveyorData() {

    let html = '';

    for (var i = 0; i < 5; i++) {
        html += `<div class="col-12 p-0 m-0 card mb-2">
                    <a href="/conveyor_detail">
                        <div class="row m-0 p-0">
                            <div class="col-8 p-0 m-0 card">
                                <div class="m-0 p-0 h-100 row">
                                    <div class="col-12 p-1">
                                        <div class="row m-0 p-0">
                                            <div class="col-6 text-start m-0 p-0">
                                                <button class="btn btn-sm btn-outline-success  fw-bold ">&Sigma; RUN: 18 (H)</button>
                                                <button class="btn btn-sm btn-outline-warning  fw-bold ">&Sigma; STOP: 2 (H)</button>
                                                <button class="btn btn-sm btn-outline-danger   fw-bold ">&Sigma; ERROR: 2 (H)</button>
                                            </div>
                                            <h5 class="fw-bold col-6 text-start m-0 p-0">Băng tải ${i+1}</h5>
                                        </div>
                                    </div>

                                    <div id="time_line_chart_${i + 1}" class="p-0 h-100 col-12 time_line_chart">
                                    </div>

                                </div>
                            </div>

                            <div class="col-4 p-0 m-0">
                                <div class="row p-0 m-0">
                                    <div class="col-12 card p-1 m-0">
                                        <div class="col-12 p-0 d-flex justify-content-evenly">
                                            <div class="text-center ">
                                                <p class="p-0 m-0 fs-6">${generateRandomArray(1.3, 1.5)[0]}  <i class="fas fa-bolt"></i> - ${ generateRandomArray(48, 53)[0] }  <i class="fa-solid fa-temperature-low"></i> </p>
                                                <p class="fw-bold p-0 m-0 fs-6">Động cơ ${i*3 + 1}</p>
                                            </div>


                                            <div class="text-center ">
                                                <p class="p-0 m-0 fs-6">${generateRandomArray(1.3, 1.5)[0]}  <i class="fas fa-bolt"></i> - ${ generateRandomArray(48, 53)[0] }  <i class="fa-solid fa-temperature-low"></i> </p>
                                                <p class="fw-bold p-0 m-0 fs-6">Động cơ ${i * 3 + 2}</p>
                                            </div>

                                            <div class="text-center ">
                                                <p class="p-0 m-0 fs-6">${generateRandomArray(1.3, 1.5)[0]}  <i class="fas fa-bolt"></i> - ${ generateRandomArray(48, 53)[0] }  <i class="fa-solid fa-temperature-low"></i> </p>
                                                <p class="fw-bold p-0 m-0 fs-6">Động cơ ${i * 3 + 3}</p>
                                            </div>


                                        </div>
                                    </div>

                                    <div class="col-12 card p-1 m-0">
                                        <div class="col-12 p-0 d-flex justify-content-evenly">
                                            <div class="text-center ">
                                               
                                                <p class="p-0 m-0 fs-6">${generateRandomArray(1.8, 2.3)[0]} A - ${generateRandomArray(218, 225)[0]} V - ${generateRandomArray(53, 58)[0] } Hz </p>
                                                <p class="fw-bold p-0 m-0 fs-6">Biến tần ${i * 3 + 1}</p>
                                            </div>


                                            <div class="text-center ">
                                                <p class="p-0 m-0 fs-6">${generateRandomArray(1.8, 2.3)[0]} A - ${generateRandomArray(218, 225)[0]} V - ${generateRandomArray(53, 58)[0] } Hz </p>
                                                <p class="fw-bold p-0 m-0 fs-6">Biến tần ${i * 3 + 2}</p>
                                            </div>

                                            <div class="text-center ">
                                                <p class="p-0 m-0 fs-6">${generateRandomArray(1.8, 2.3)[0]} A - ${generateRandomArray(218, 225)[0]} V - ${generateRandomArray(53, 58)[0] } Hz </p>
                                                <p class="fw-bold p-0 m-0 fs-6">Biến tần ${i * 3 + 3}</p>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
    }

    $("#list_conveyor_place").html(html);
}

function generateRandomArray(min, max) {
    const result = [];

    for (let i = 0; i < 10; i++) {
        const num = Math.random() * (max - min) + min;
        result.push(parseFloat(num.toFixed(2)));
    }

    return result;
}