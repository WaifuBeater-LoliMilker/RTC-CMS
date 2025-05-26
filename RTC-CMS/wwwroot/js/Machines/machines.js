let table;
let machines;
//var chartTemp;
$(async function () {

    const areas = await GetAllArea();
    machines = await GetAllMachine();

    const machineItems = await GetAllMachineItem();

    // Tạo dữ liệu lồng nhau
    const result = machines.map(machine => {
        const area = areas.find(a => a.Id === machine.AreaId); // Gộp thông tin area
        const items = machineItems.filter(item => item.MachineId === machine.Id); // Danh sách item theo MachineId

        return {
            ...machine,
            AreaName: area.AreaName,
            items: items     // danh sách machine item
        };
    });

    //define table
    table = new Tabulator("#machine_table", {
        height: "70vh",
        layout: "fitColumns",
        columnDefaults: {
            resizable: true,
        },
        data: result,
        //selectableRows: 1,
        columns: [
            { title: "Mã máy", field: "MachineCode", headerHozAlign: "center" },
            {
                title: "Tên máy", field: "MachineName", headerHozAlign: "center",
                formatter: function (cell, formatterParams) {
                    var value = cell.getValue();
                    return `<a href="#" class="open-modal-link" data-code="${value}" style="text-decoration: none; color: #007bff;">${value}</a>`;
                }
            },
            { title: "Khu vực", field: "AreaName", headerHozAlign: "center" },
            {
                title: "Trạng thái",
                field: "Status",
                headerHozAlign: "center",
                hozAlign: "center",
                formatter: function (cell) {
                    const value = cell.getValue();
                    const map = {
                        1: { label: "Đang chạy", color: "#28a745" },    // xanh lá
                        2: { label: "Dừng", color: "#6c757d" },    // xám
                        3: { label: "Lỗi", color: "#dc3545" },     // đỏ
                        4: { label: "Bảo trì", color: "#ffc107" }, // vàng
                    };

                    const item = map[value] || { label: "Không rõ", color: "#dee2e6" };

                    return `<span style="
            display: inline-block;
            width: 100px;
            text-align: center;
            padding: 4px 8px;
            border-radius: 4px;
            background-color: ${item.color};
            color: white;
            font-weight: bold;
        ">${item.label}</span>`;
                }
            },
            { title: "Ngưỡng vận hành (h)", field: "OperateThreshold", headerHozAlign: "center", hozAlign: "right" },
            { title: "IP", field: "IpPlc", headerHozAlign: "center" },
            { title: "Port", field: "PortPlc", headerHozAlign: "center" },
        ],
        rowFormatter: function (row) {
            //create and style holder elements
            var holderEl = document.createElement("div");
            var tableEl = document.createElement("div");

            holderEl.style.boxSizing = "border-box";
            holderEl.style.padding = "10px 30px 10px 10px";
            holderEl.style.borderTop = "1px solid #333";
            holderEl.style.borderBotom = "1px solid #333";
            holderEl.style.display = "none"; // ẩn mặc định


            tableEl.style.border = "1px solid #333";

            holderEl.appendChild(tableEl);

            row.getElement().appendChild(holderEl);
            row._subTableHolder = holderEl; // gán để tiện truy cập

            row._subTable = new Tabulator(tableEl, {
                layout: "fitColumns",
                data: row.getData().items,
                selectableRows: 1,
                columns: [
                    { title: "Mã thiết bị", field: "MachineItemCode" },
                    {
                        title: "Tên thiết bị", field: "MachineItemName",
                        formatter: function (cell, formatterParams) {
                            var value = cell.getValue();
                            return `<a href="#" 
                                        class="open-modal-link" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#modal_machine_items"
                                        data-code="${value}" 
                                        style="text-decoration: none; color: #007bff;">
                                        ${value}
                                    </a>`;
                        }
                    },
                    { title: "Ngưỡng vận hành (h)", field: "OperateThreshold" },
                    //{ title: "MachineItemType", field: "MachineItemType" },
                ]
            })
        },
    });

    table.on("rowClick", function (e, row) {
        if (row._subTableHolder) {
            row._subTableHolder.style.display = row._subTableHolder.style.display === "none" ? "block" : "none";
        } else {
            row.normalizeHeight(); // gọi rowFormatter nếu chưa được render
            setTimeout(() => {
                if (row._subTableHolder) {
                    row._subTableHolder.style.display = "block";
                }
            }, 10);
        }
    });



    var tableMachineItemVariant = new Tabulator("#machineitem_variant", {
        height: "300px",
        layout: "fitColumns",
        columns: [
            {
                formatter: "buttonCross",
                width: 40,
                hozAlign: "center",
                cellClick: function (e, cell) {
                    cell.getRow().delete();
                }
            },
            {
                title: "Thông số",
                field: "type",
                editor: "list",
                editorParams: {
                    values: {
                        1: "Nhiệt độ",
                        2: "Độ rung",
                        3: "Dòng điện",
                        4: "Điện áp",
                        5: "Tần số"
                    }
                },
                formatter: function (cell) {
                    var map = {
                        1: "Nhiệt độ",
                        2: "Độ rung",
                        3: "Dòng điện",
                        4: "Điện áp",
                        5: "Tần số"
                    };
                    return map[cell.getValue()] || "";
                }
            },
            {
                title: "Giá trị Min",
                field: "min",
                editor: "number",
                validator: ["required", "numeric"],
            },
            {
                title: "Giá trị Max",
                field: "max",
                editor: "number",
                validator: ["required", "numeric"],
            },

        ],
    });

    $("#btnAddVariant").on("click", function () {
        tableMachineItemVariant.addRow({});
    });

    const today = new Date().toISOString().slice(0, 10);

    const dataTemp = generateTemperatureData(today);

    var chartTemp = echarts.init(document.getElementById("chart_temperature"));

    var option = {
        title: {
            text: "Nhiệt độ",
            left: "center",
            top: "top",
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Arial',
                color: '#333'
            },
           
        },
        xAxis: {
            type: "category",
            data: dataTemp.map(d => d.time),
            axisLabel: {
                fontSize: 14
            }
        },
        yAxis: {
            type: "value",
            axisLabel: {
                fontSize: 14
            }
        },
        series: [{
            data: dataTemp.map(d => d.temperature),
            type: "line",
            lineStyle: {
                color: "red"
            },
            itemStyle: {
                color: "red"
            },
            markLine: {
                symbol: "none",
                label: {
                    formatter: '{b}: {c}°C',
                    fontSize: 10
                },
                lineStyle: {
                    type: "dashed",
                    color: "blue"
                },
                data: [
                    { yAxis: 40, name: "Min Spec" },
                    { yAxis: 90, name: "Max Spec" }
                ]
            }
        }]
    };

    chartTemp.setOption(option);
    // Khởi tạo bảng Tabulator
    var tabledatatemp = new Tabulator("#table_data_temp", {
        layout: "fitColumns",
        height: "70vh",
        data: dataTemp,

        columns: [
            { title: "Thời gian", field: "time", hozAlign: "center" },
            { title: "Nhiệt độ (°C)", field: "temperature", hozAlign: "center" }
        ],
    });

    const dataRung = generateRungData(today);

    var chartRung = echarts.init(document.getElementById("chart_rung"));

    var optionRung = {
        title: {
            text: "Độ rung",
            left: "center",
            top: "top",
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Arial',
                color: '#333'
            },

        },
        xAxis: {
            type: "category",
            data: dataRung.map(d => d.time),
            axisLabel: {
                fontSize: 14
            }
        },
        yAxis: {
            type: "value",
            axisLabel: {
                fontSize: 14
            }
        },
        series: [{
            data: dataRung.map(d => d.rung),
            type: "line",
            lineStyle: {
                color: "blue"
            },
            itemStyle: {
                color: "blue"
            }
        }]
    };

    chartRung.setOption(optionRung);
    // Khởi tạo bảng Tabulator
    var tabledatarung = new Tabulator("#table_data_rung", {
        layout: "fitColumns",
        height: "70vh",
        data: dataRung,

        columns: [
            { title: "Thời gian", field: "time", hozAlign: "center" },
            { title: "Độ rung", field: "rung", hozAlign: "center" }
        ],
    });



    //Dòng

    const dataDong = generateDongData(today);

    var chartDong = echarts.init(document.getElementById("chart_dong"));

    var optionDong = {
        title: {
            text: "Dòng điện",
            left: "center",
            top: "top",
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Arial',
                color: '#333'
            },

        },
        xAxis: {
            type: "category",
            data: dataRung.map(d => d.time),
            axisLabel: {
                fontSize: 14
            }
        },
        yAxis: {
            type: "value",
            axisLabel: {
                fontSize: 14
            }
        },
        series: [{
            data: dataRung.map(d => d.rung),
            type: "line",
            lineStyle: {
                color: "blue"
            },
            itemStyle: {
                color: "blue"
            }
        }]
    };

    chartDong.setOption(optionDong);
    // Khởi tạo bảng Tabulator
    var tabledatadong = new Tabulator("#table_data_dong", {
        layout: "fitColumns",
        height: "70vh",
        data: dataDong,

        columns: [
            { title: "Thời gian", field: "time", hozAlign: "center" },
            { title: "Dòng điện", field: "rung", hozAlign: "center" }
        ],
    });



    const dataDien = generateDienData(today);

    var chartDien = echarts.init(document.getElementById("chart_dien"));

    var optionDien = {
        title: {
            text: "Điện áp",
            left: "center",
            top: "top",
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Arial',
                color: '#333'
            },

        },
        xAxis: {
            type: "category",
            data: dataRung.map(d => d.time),
            axisLabel: {
                fontSize: 14
            }
        },
        yAxis: {
            type: "value",
            axisLabel: {
                fontSize: 14
            }
        },
        series: [{
            data: dataRung.map(d => d.rung),
            type: "line",
            lineStyle: {
                color: "blue"
            },
            itemStyle: {
                color: "blue"
            }
        }]
    };

    chartDien.setOption(optionDien);
    // Khởi tạo bảng Tabulator
    var tabledatadien = new Tabulator("#table_data_dien", {
        layout: "fitColumns",
        height: "70vh",
        data: dataDien,

        columns: [
            { title: "Thời gian", field: "time", hozAlign: "center" },
            { title: "Dòng điện", field: "rung", hozAlign: "center" }
        ],
    });


    const dataTanSo = generateTanSoData(today);

    var chartTanSo = echarts.init(document.getElementById("chart_tanso"));

    var optionTanSo = {
        title: {
            text: "Tần số",
            left: "center",
            top: "top",
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Arial',
                color: '#333'
            },

        },
        xAxis: {
            type: "category",
            data: dataRung.map(d => d.time),
            axisLabel: {
                fontSize: 14
            }
        },
        yAxis: {
            type: "value",
            axisLabel: {
                fontSize: 14
            }
        },
        series: [{
            data: dataRung.map(d => d.rung),
            type: "line",
            lineStyle: {
                color: "blue"
            },
            itemStyle: {
                color: "blue"
            }
        }]
    };

    chartTanSo.setOption(optionTanSo);
    // Khởi tạo bảng Tabulator
    var tabledatatanso = new Tabulator("#table_data_tanso", {
        layout: "fitColumns",
        height: "70vh",
        data: dataDien,

        columns: [
            { title: "Thời gian", field: "time", hozAlign: "center" },
            { title: "Tần số", field: "rung", hozAlign: "center" }
        ],
    });
    //chartTemp = echarts.init(document.getElementById('chart_temperature'));
    // Flatpickr (datetime picker)
    flatpickr("#datePicker", {
        dateFormat: "Y-m-d",
        defaultDate: new Date(),
        onChange: function (selectedDates, dateStr) {
            //loadTemperatureData(dateStr);
        }
    });
    window.addEventListener('load', function () {
        chartTemp.resize(); // đảm bảo biểu đồ chiếm đúng kích thước sau khi DOM load
    });

 
});

function GetAllMachine() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/machines/get-all",
            type: "GET",
            dataType: "json", // nếu server trả về JSON
            success: function (response) {
                // Xử lý dữ liệu khi gọi API thành công
                resolve(response);
                // Ví dụ: hiển thị dữ liệu ra HTML
                // $('#output').html(JSON.stringify(response));
            },
            error: function (xhr, status, error) {
                // Xử lý khi có lỗi
                console.error("Lỗi khi gọi API:", error);
                reject(error);
            }
        });
    });
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
                // $('#output').html(JSON.stringify(response));
            },
            error: function (xhr, status, error) {
                // Xử lý khi có lỗi
                console.error("Lỗi khi gọi API:", error);
                reject(error);
            }
        });
    });
}

function CellClick(e, cell) {
    const target = e.target;
    const id = $(target).data("id");

    if ($(target).hasClass("btn-edit")) {
        var mode = $('#btn_savechange').data('mode');
        const machineData = machines.find(machine => machine.Id === id);

        $('#machine_machinecode').val(machineData.MachineCode);
        $('#machine_machinename').val(machineData.MachineName);
        $('#machine_area').val(machineData.AreaId); // Giả sử AreaId là value cho select
        $('#machine_operatorthreshold').val(machineData.OperateThreshold);
        $('#btn_savechange').data('mode', 'update').data('id', id); // Thiết lập chế độ là update
        $('#staticBackdropLabel').text('Cập nhật băng tải');
        $('.modal').modal('show');
    }

    if ($(target).hasClass("btn-delete")) {
        if (confirm("Bạn có chắc muốn xoá không?")) {
            // Gọi API xoá ở đây
            $.ajax({
                url: `/machines/delete`,
                type: "DELETE",
                data: { ID: id },
                success: function () {
                    alert("Đã xoá thành công");
                    cell.getRow().delete(); // Xoá dòng khỏi bảng
                },
                error: function () {
                    alert("Lỗi khi xoá");
                }
            });
        }
    }
}

function GetAllMachineItem() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/machines/get-all-machine-items",
            type: "GET",
            dataType: "json", // nếu server trả về JSON
            success: function (response) {
                resolve(response);
            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });
    });
}

function generateTemperatureData(dateStr) {
    let data = [];
    let baseTime = new Date(dateStr + " 00:00:00");
    for (let i = 0; i <  60 * 60 / 5; i++) { // 24h * 60ph * 60s / 5s
        let time = new Date(baseTime.getTime() + i * 5 * 1000); // mỗi 5 giây
        let temperature = (Math.random() * 5 + 50).toFixed(2); // 50–55 độ
        data.push({
            time: time.toTimeString().slice(0, 8), // định dạng HH:mm:ss
            temperature: parseFloat(temperature)
        });
    }

    return data;
}

function generateRungData(dateStr) {
    let data = [];
    let baseTime = new Date(dateStr + " 00:00:00");
    for (let i = 0; i < 60 * 60 / 5; i++) { // 24h * 60ph * 60s / 5s
        let time = new Date(baseTime.getTime() + i * 5 * 1000); // mỗi 5 giây
        let rung = (Math.random() * 0.1 + 1.18).toFixed(2); // 50–55 độ
        data.push({
            time: time.toTimeString().slice(0, 8), // định dạng HH:mm:ss
            rung: parseFloat(rung)
        });
    }

    return data;
}

function generateDongData(dateStr) {
    let data = [];
    let baseTime = new Date(dateStr + " 00:00:00");
    for (let i = 0; i < 60 * 60 / 5; i++) { // 24h * 60ph * 60s / 5s
        let time = new Date(baseTime.getTime() + i * 5 * 1000); // mỗi 5 giây
        let rung = (Math.random() * 0.2 + 2).toFixed(2); 
        data.push({
            time: time.toTimeString().slice(0, 8), // định dạng HH:mm:ss
            rung: parseFloat(rung)
        });
    }

    return data;
}

function generateDienData(dateStr) {
    let data = [];
    let baseTime = new Date(dateStr + " 00:00:00");
    for (let i = 0; i < 60 * 60 / 5; i++) { // 24h * 60ph * 60s / 5s
        let time = new Date(baseTime.getTime() + i * 5 * 1000); // mỗi 5 giây
        let rung = (Math.random() * 0.5 + 220).toFixed(2);
        data.push({
            time: time.toTimeString().slice(0, 8), // định dạng HH:mm:ss
            rung: parseFloat(rung)
        });
    }

    return data;
}

function generateTanSoData(dateStr) {
    let data = [];
    let baseTime = new Date(dateStr + " 00:00:00");
    for (let i = 0; i < 60 * 60 / 5; i++) { // 24h * 60ph * 60s / 5s
        let time = new Date(baseTime.getTime() + i * 5 * 1000); // mỗi 5 giây
        let rung = (Math.random() * 0.5 + 54).toFixed(2);
        data.push({
            time: time.toTimeString().slice(0, 8), // định dạng HH:mm:ss
            rung: parseFloat(rung)
        });
    }

    return data;
}



//function CreateMachine() {
//    var machineData = {
//        MachineCode: $('#machine_machinecode').val(),
//        MachineName: $('#machine_machinename').val(),
//        AreaId: $('#machine_area').val(),
//        OperateThreshold: $('#machine_operatorthreshold').val()
//    }
//    $.ajax({
//        url: 'machines/create', // Đường dẫn API của bạn
//        type: 'POST',
//        contentType: 'application/json',
//        data: JSON.stringify(machineData), // Chuyển đổi dữ liệu thành JSON
//        success: function (response) {
//            alert('Tạo băng tải thành công!');
//            table.addData([response]);
//            $('.modal').modal('hide');
//            GetAllMachine();
//        },
//        error: function (xhr, status, error) {
//            alert('Có lỗi xảy ra: ' + error);
//        }
//    });
//}

//function UpdateMachine() {
//    var id = $('#btn_savechange').data('id');
//    console.log(id);
//    var machineData = {
//        Id: id,
//        MachineCode: $('#machine_machinecode').val(),
//        MachineName: $('#machine_machinename').val(),
//        AreaId: $('#machine_area').val(),
//        OperateThreshold: $('#machine_operatorthreshold').val()
//    }
//    $.ajax({
//        url: 'machines/update', // Đường dẫn API của bạn
//        type: 'POST',
//        contentType: 'application/json',
//        data: JSON.stringify(machineData), // Chuyển đổi dữ liệu thành JSON
//        success: function (response) {
//            alert('Cập nhật băng tải thành công!');
//            $('.modal').modal('hide');
//            location.reload();
//        },
//        error: function (xhr, status, error) {
//            alert('Có lỗi xảy ra: ' + error);
//        }
//    });

//}