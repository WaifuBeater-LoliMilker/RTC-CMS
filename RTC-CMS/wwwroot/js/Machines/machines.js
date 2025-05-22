let table;
let machines;
$(async function () {

    const areas = await GetAllArea();
    machines = await GetAllMachine();
    table = new Tabulator("#machine_table", {
        data: machines,
        layout: "fitColumns",
        columns: [
            { title: "ID", field: "Id", visible: false },
            { title: "MachineCode", field: "MachineCode" },
            { title: "MachineName", field: "MachineName" },
            { title: "AreaId", field: "AreaId" },
            { title: "Operate Threshold", field: "OperateThreshold" },
            {
                title: "Actions",
                formatter: function (cell, formatterParams, onRendered) {
                    const id = cell.getRow().getData().Id;
                    return `
                <button class="btn btn-success btn-edit"  data-id="${id}"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-danger btn-delete" data-id="${id}"><i class="fa-solid fa-trash"></i></button>
                `;
                },
                width: 150,
                hozAlign: "left",
                cellClick: CellClick
            }
        ]
    });

    $('#machine_area').select2({
        placeholder: "Chọn khu vực",
        data: areas.map(a => ({
            id: a.Id,
            text: a.AreaName
        }))
    });

    $('.modal').on('click', '#btn_savechange', function () {
        var mode = $('#btn_savechange').data('mode');
        if (mode == "insert") {

            CreateMachine();
        }
        else {
            UpdateMachine();
            location.reload();
        }
        $('#staticBackdrop input').val('');
        $('#staticBackdrop select').val('');
    });
    $('#machine_add').on('click', function () {
        // XÓA trắng các input/select trong modal
        $('#staticBackdrop input').val('');
        $('#staticBackdrop select').val('');

        $('#btn_savechange').data('mode', 'insert'); // Thiết lập chế độ là update

        // Cập nhật tiêu đề modal nếu cần
        $('#staticBackdropLabel').text('Thêm mới băng tải');

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

function CreateMachine() {

    var machineData = {
        MachineCode: $('#machine_machinecode').val(),
        MachineName: $('#machine_machinename').val(),
        AreaId: $('#machine_area').val(),
        OperateThreshold: $('#machine_operatorthreshold').val()
    }
    $.ajax({
        url: 'machines/create', // Đường dẫn API của bạn
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(machineData), // Chuyển đổi dữ liệu thành JSON
        success: function (response) {
            alert('Tạo băng tải thành công!');
            table.addData([response]);
            $('.modal').modal('hide');
            GetAllMachine();
        },
        error: function (xhr, status, error) {
            alert('Có lỗi xảy ra: ' + error);
        }
    });

}

function UpdateMachine() {
    var id = $('#btn_savechange').data('id');
    console.log(id);
    var machineData = {
        Id: id,
        MachineCode: $('#machine_machinecode').val(),
        MachineName: $('#machine_machinename').val(),
        AreaId: $('#machine_area').val(),
        OperateThreshold: $('#machine_operatorthreshold').val()
    }
    $.ajax({
        url: 'machines/update', // Đường dẫn API của bạn
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(machineData), // Chuyển đổi dữ liệu thành JSON
        success: function (response) {
            alert('Cập nhật băng tải thành công!');
            $('.modal').modal('hide');
            location.reload();
        },
        error: function (xhr, status, error) {
            alert('Có lỗi xảy ra: ' + error);
        }
    });
    
}