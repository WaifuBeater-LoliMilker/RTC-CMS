$(async function () {
    drawTable()
    $('#error_add').on('click', () => {
        $("#errors_table").tabulator("addRow", {
            id: 0,
            code: '<div class="code-cell new" contenteditable></div>',
            name: '<div class="name-cell new" contenteditable></div>',
            isNew: true,
        }, { position: "top" });
    })
    $('#errors_table').on('click', '.btn-cancel', () => {
        const rows = $("#errors_table").tabulator("getRows")
        if (rows.length) {
            rows[0].delete();
        }
    })
})
var fullName = fullName || 'Admin';
function drawTable() {
    $('#errors_table').tabulator({
        width: "auto",
        data: errors,
        layout: "fitColumns",
        pagination: true,
        paginationSize: 10,
        rowHeight: 53.85,
        columns: [
            { title: "Mã lỗi", field: "code", formatter: 'html', width: '20%' },
            { title: "Tên lỗi", field: "name", formatter: 'html', minWidth: '70%' },
            //{
            //    title: "Actions",
            //    formatter: function (cell, formatterParams, onRendered) {
            //        const rowData = cell.getRow().getData();
            //        const id = rowData.id;

            //        if (rowData.isNew) {
            //            return `<button class="btn btn-primary btn-save" data-id="${id}">
            //                        <i class="fa-solid fa-floppy-disk"></i>
            //                    </button>
            //                    <button class="btn btn-secondary btn-cancel" data-id="${id}">
            //                        <i class="fa-solid fa-xmark"></i>
            //                    </button>`;
            //        } else {
            //            return `<button class="btn btn-success btn-edit" data-id="${id}">
            //                        <i class="fa-solid fa-pen-to-square"></i>
            //                    </button>
            //                    <button class="btn btn-danger btn-delete" data-id="${id}">
            //                        <i class="fa-solid fa-trash"></i>
            //                    </button>`;
            //        }
            //    },
            //    width: 150,
            //    hozAlign: "center",
            //    cellClick: cellClick
            //}
        ],
    })
}
function cellClick(e, cell) {

}

var errors = [
    { id: 1, code: '<div class="code-cell">E001</div>', name: '<div class="name-cell">Lỗi kết nối máy chủ</div>' },
    { id: 2, code: '<div class="code-cell">E002</div>', name: '<div class="name-cell">Dữ liệu không hợp lệ</div>' },
    { id: 3, code: '<div class="code-cell">E003</div>', name: '<div class="name-cell">Thiết bị không phản hồi</div>' },
    { id: 4, code: '<div class="code-cell">E004</div>', name: '<div class="name-cell">Không đủ quyền truy cập</div>' },
    { id: 5, code: '<div class="code-cell">E005</div>', name: '<div class="name-cell">Hết thời gian chờ</div>' },
    { id: 6, code: '<div class="code-cell">E006</div>', name: '<div class="name-cell">Không tìm thấy tài nguyên</div>' },
    { id: 7, code: '<div class="code-cell">E007</div>', name: '<div class="name-cell">Lỗi đọc dữ liệu cảm biến</div>' },
    { id: 8, code: '<div class="code-cell">E008</div>', name: '<div class="name-cell">Lỗi ghi dữ liệu vào cơ sở dữ liệu</div>' },
    { id: 9, code: '<div class="code-cell">E009</div>', name: '<div class="name-cell">Tệp cấu hình bị thiếu hoặc hỏng</div>' },
    { id: 10, code: '<div class="code-cell">E010</div>', name: '<div class="name-cell">Lỗi xác thực người dùng</div>' },
    { id: 11, code: '<div class="code-cell">E011</div>', name: '<div class="name-cell">Lỗi kết nối Internet</div>' },
    { id: 12, code: '<div class="code-cell">E012</div>', name: '<div class="name-cell">Thiết bị ngoại vi bị ngắt kết nối</div>' },
    { id: 13, code: '<div class="code-cell">E013</div>', name: '<div class="name-cell">Dung lượng bộ nhớ không đủ</div>' },
    { id: 14, code: '<div class="code-cell">E014</div>', name: '<div class="name-cell">Lỗi phân tích cú pháp JSON</div>' },
    { id: 15, code: '<div class="code-cell">E015</div>', name: '<div class="name-cell">Phần mềm không tương thích</div>' },
    { id: 16, code: '<div class="code-cell">E016</div>', name: '<div class="name-cell">Lỗi truyền thông với PLC</div>' },
    { id: 17, code: '<div class="code-cell">E017</div>', name: '<div class="name-cell">Tài khoản đã bị khóa</div>' },
    { id: 18, code: '<div class="code-cell">E018</div>', name: '<div class="name-cell">Cảnh báo nhiệt độ quá cao</div>' },
    { id: 19, code: '<div class="code-cell">E019</div>', name: '<div class="name-cell">Địa chỉ IP không hợp lệ</div>' },
    { id: 20, code: '<div class="code-cell">E020</div>', name: '<div class="name-cell">Lỗi khởi tạo hệ thống</div>' }
];
