let table;
let users;
$(async function () {

    const roles = await GetAllRole();
    users = await GetAllUser();
    table = new Tabulator("#users_table", {
        data: users,
        layout: "fitColumns",
        columns: [
            { title: "ID", field: "Id", visible: false },
            { title: "UserName", field: "UserName" },
            { title: "Mật khẩu", field: "Password" },
            { title: "Họ và tên", field: "FullName" },
            { title: "Vai trò", field: "RoleId" },
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

    $('#user_role').select2({
        data: roles.map(a => ({
            id: a.Id,
            text: a.RoleName
        }))
    });

    $('.modal').on('click', '#btn_savechange', function () {
        var mode = $('#btn_savechange').data('mode');
        if (mode == "insert") {

            CreateUser();
        }
        else {
            UpdateUser();
        }
        $('#staticBackdrop input').val('');
        $('#staticBackdrop select').val('');
    });
    $('#user_add').on('click', function () {
        // XÓA trắng các input/select trong modal
        $('#staticBackdrop input').val('');
        $('#staticBackdrop select').val('');

        $('#btn_savechange').data('mode', 'insert'); // Thiết lập chế độ là update

        // Cập nhật tiêu đề modal nếu cần
        $('#staticBackdropLabel').text('Thêm mới tài khoản');

    });

});

function GetAllUser() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/users/get-all",
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
        const userData = users.find(user => user.Id === id);

        $('#user_username').val(userData.UserName);
        $('#user_password').val(userData.Password);
        $('#user_role').val(userData.RoleId);
        $('#user_fullname').val(userData.FullName);
        $('#btn_savechange').data('mode', 'update').data('id', id);
        $('#staticBackdropLabel').text('Cập nhật tài khoản');
        $('.modal').modal('show');
    }

    if ($(target).hasClass("btn-delete")) {
        if (confirm("Bạn có chắc muốn xoá tài khoản không?")) {
            // Gọi API xoá ở đây
            $.ajax({
                url: `/users/delete`,
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

function CreateUser() {

    var userData = {
        UserName: $('#user_username').val(),
        Password: $('#user_password').val(),
        RoleId: $('#user_role').val(),
        FullName: $('#user_fullname').val()
    }
    $.ajax({
        url: 'users/create', // Đường dẫn API của bạn
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData), // Chuyển đổi dữ liệu thành JSON
        success: function (response) {
            alert('Tạo tài khoản thành công!');
            table.addData([response]);
            $('.modal').modal('hide');
            GetAllUser();
        },
        error: function (xhr, status, error) {
            alert('Có lỗi xảy ra: ' + error);
        }
    });

}

function UpdateUser() {
    var id = $('#btn_savechange').data('id');
    console.log(id);
    var userData = {
        Id: id,
        UserName: $('#user_username').val(),
        Password: $('#user_password').val(),
        RoleId: $('#user_role').val(),
        FullName: $('#user_fullname').val()
    }
    $.ajax({
        url: 'users/update', // Đường dẫn API của bạn
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData), // Chuyển đổi dữ liệu thành JSON
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