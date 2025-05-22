let table;
let roles;
$(async function () {

    roles = await GetAllRole();
    table = new Tabulator("#role_table", {
        data: roles,
        layout: "fitColumns",
        columns: [
            { title: "ID", field: "Id", visible: false },
            { title: "Mã vai trò", field: "RoleCode" },
            { title: "Tên vai trò", field: "RoleName" },
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

  
    $('.modal').on('click', '#btn_savechange', function () {
        var mode = $('#btn_savechange').data('mode');
        if (mode == "insert") {

            CreateRole();
        }
        else {
            UpdateRole();
        }
        $('#staticBackdrop input').val('');
        $('#staticBackdrop select').val('');
    });
    $('#role_add').on('click', function () {
        // XÓA trắng các input/select trong modal
        $('#staticBackdrop input').val('');
        $('#staticBackdrop select').val('');

        $('#btn_savechange').data('mode', 'insert'); // Thiết lập chế độ là update

        // Cập nhật tiêu đề modal nếu cần
        $('#staticBackdropLabel').text('Thêm mới vai trò');

    });

});

function GetAllRole() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/roles/get-all",
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
        const roleData = roles.find(role => role.Id === id);

        $('#role_rolecode').val(roleData.RoleCode);
        $('#role_rolename').val(roleData.RoleName);
        $('#btn_savechange').data('mode', 'update').data('id', id);
        $('#staticBackdropLabel').text('Cập nhật vai trò');
        $('.modal').modal('show');
    }

    if ($(target).hasClass("btn-delete")) {
        if (confirm("Bạn có chắc muốn xoá vai trò không?")) {
            // Gọi API xoá ở đây
            $.ajax({
                url: `/roles/delete`,
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

function CreateRole() {

    var roleData = {
        RoleCode: $('#role_rolecode').val(),
        RoleName: $('#role_rolename').val()
    }
    $.ajax({
        url: 'roles/create', // Đường dẫn API của bạn
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(roleData), // Chuyển đổi dữ liệu thành JSON
        success: function (response) {
            alert('Tạo tài khoản thành công!');
            table.addData([response]);
            $('.modal').modal('hide');
            GetAllRole();
        },
        error: function (xhr, status, error) {
            alert('Có lỗi xảy ra: ' + error);
        }
    });

}

function UpdateRole() {
    var id = $('#btn_savechange').data('id');
    console.log(id);
    var roleData = {
        Id: id,
        RoleCode: $('#role_rolecode').val(),
        RoleName: $('#role_rolename').val()
    }
    $.ajax({
        url: 'roles/update', // Đường dẫn API của bạn
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(roleData), // Chuyển đổi dữ liệu thành JSON
        success: function (response) {
            alert('Cập nhật tài khoản thành công!');
            $('.modal').modal('hide');
            location.reload();
        },
        error: function (xhr, status, error) {
            alert('Có lỗi xảy ra: ' + error);
        }
    }); 
}