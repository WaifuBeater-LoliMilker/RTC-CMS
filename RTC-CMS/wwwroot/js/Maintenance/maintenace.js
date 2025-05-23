$(async function () {
    drawTable()
    $('#duration_plan,#duration_search').daterangepicker({
        locale: { format: 'YYYY/MM/DD' }
    });
})
var fullName = fullName || 'Admin';
function drawTable() {
    $('#task_table').tabulator({
        width: "auto",
        data: tasks,
        layout: "fitColumns",
        pagination: true,
        paginationSize: 7,
        columns: [
            { title: "Tên máy", field: "MachineItemName", width: 200, responsive: 0 },
            { title: "TG Dự kiến", field: "PlanDuration", formatter: 'html', minWidth: '210px' },
            { title: "TG Thực tế", field: "ActualDuration", formatter: 'html', minWidth: '210px' },
            { title: "Nội dung", field: "Content", minWidth: '260px' },
            { title: "Trạng thái", field: "Status", formatter: 'html', minWidth: '210px' },
            {
                title: "Actions",
                formatter: function (cell, formatterParams, onRendered) {
                    const id = cell.getRow().getData().Id;
                    return `<button class="btn btn-success btn-edit" data-id="${id}">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>`;
                },
                width: 150,
                hozAlign: "center",
                cellClick: cellClick
            }
        ],
    })
}
function cellClick(e, cell) {

}
var tasks = [
    {
        Id: 1,
        CreatedName: 'Giga Chad',
        AssignedName: 'Sigma male',
        ApprovedName: null,
        MachineItemName: 'Băng tải A102',
        Content: 'Thay băng tải định kì',
        DateStartPlan: '2025-05-22',
        DateEndPlan: '2025-06-04',
        DateStartActual: null,
        DateEndActual: null,
        Status: '<div class="status-cell status-1">Chưa tiến hành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-05-22</div><div>-</div><div>2025-06-04</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>...</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 2,
        CreatedName: 'Maria Nguyen',
        AssignedName: 'Anh Le',
        ApprovedName: 'Kien Tran',
        MachineItemName: 'Máy ép khuôn B204',
        Content: 'Bảo dưỡng bộ truyền động',
        DateStartPlan: '2025-05-20',
        DateEndPlan: '2025-05-22',
        DateStartActual: '2025-05-21',
        DateEndActual: '2025-05-22',
        Status: '<div class="status-cell status-3">Hoàn thành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-05-20</div><div>-</div><div>2025-05-22</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>2025-05-21</div><div>-</div><div>2025-05-22</div></div>'
    },
    {
        Id: 3,
        CreatedName: 'Duc Tran',
        AssignedName: 'Linh Pham',
        ApprovedName: null,
        MachineItemName: 'Máy cắt CNC C310',
        Content: 'Kiểm tra cảm biến vị trí',
        DateStartPlan: '2025-05-23',
        DateEndPlan: '2025-05-24',
        DateStartActual: '2025-05-23',
        DateEndActual: null,
        Status: '<div class="status-cell status-2">Đang thực hiện</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-05-23</div><div>-</div><div>2025-05-24</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>2025-05-23</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 4,
        CreatedName: 'Khoa Bui',
        AssignedName: 'Minh Hoang',
        ApprovedName: null,
        MachineItemName: 'Robot hàn R102',
        Content: 'Cập nhật firmware điều khiển, test chức năng mới được thêm vào và lưu lại trạng thái',
        DateStartPlan: '2025-06-01',
        DateEndPlan: '2025-06-03',
        DateStartActual: null,
        DateEndActual: null,
        Status: '<div class="status-cell status-1">Chưa tiến hành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-06-01</div><div>-</div><div>2025-06-03</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>...</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 5,
        CreatedName: 'Trang Vu',
        AssignedName: 'Bao Lam',
        ApprovedName: 'Huy Nguyen',
        MachineItemName: 'Máy khoan D450',
        Content: 'Thay dầu thuỷ lực',
        DateStartPlan: '2025-05-19',
        DateEndPlan: '2025-05-19',
        DateStartActual: '2025-05-19',
        DateEndActual: '2025-05-19',
        Status: '<div class="status-cell status-4">Đã hủy bỏ</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-05-19</div><div>-</div><div>2025-05-19</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>2025-05-19</div><div>-</div><div>2025-05-19</div></div>'
    },
    {
        Id: 6,
        CreatedName: 'Luan Pham',
        AssignedName: 'Tam Doan',
        ApprovedName: null,
        MachineItemName: 'Băng tải A103',
        Content: 'Kiểm tra độ mòn dây đai',
        DateStartPlan: '2025-05-25',
        DateEndPlan: '2025-05-26',
        DateStartActual: null,
        DateEndActual: null,
        Status: '<div class="status-cell status-1">Chưa tiến hành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-05-25</div><div>-</div><div>2025-05-26</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>...</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 7,
        CreatedName: 'Thanh Le',
        AssignedName: 'Hung Tran',
        ApprovedName: 'Lan Ngo',
        MachineItemName: 'Máy tiện T305',
        Content: 'Kiểm tra độ chính xác spindle',
        DateStartPlan: '2025-05-27',
        DateEndPlan: '2025-05-28',
        DateStartActual: null,
        DateEndActual: null,
        Status: '<div class="status-cell status-1">Chưa tiến hành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-05-27</div><div>-</div><div>2025-05-28</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>...</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 8,
        CreatedName: 'Giang Bui',
        AssignedName: 'Quang Pham',
        ApprovedName: 'Ha Le',
        MachineItemName: 'Máy cắt laser L500',
        Content: 'Cân chỉnh tia laser',
        DateStartPlan: '2025-05-29',
        DateEndPlan: '2025-05-30',
        DateStartActual: '2025-05-29',
        DateEndActual: null,
        Status: '<div class="status-cell status-2">Đang thực hiện</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-05-29</div><div>-</div><div>2025-05-30</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>2025-05-29</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 9,
        CreatedName: 'Tien Phan',
        AssignedName: 'Ngoc Tran',
        ApprovedName: null,
        MachineItemName: 'Máy đóng gói P210',
        Content: 'Bảo trì băng tải vào',
        DateStartPlan: '2025-06-01',
        DateEndPlan: '2025-06-01',
        DateStartActual: '2025-06-01',
        DateEndActual: '2025-06-01',
        Status: '<div class="status-cell status-3">Hoàn thành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-06-01</div><div>-</div><div>2025-06-01</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>2025-06-01</div><div>-</div><div>2025-06-01</div></div>'
    },
    {
        Id: 10,
        CreatedName: 'Linh Nguyen',
        AssignedName: 'Tien Do',
        ApprovedName: 'Nhat Vu',
        MachineItemName: 'Máy nén khí K600',
        Content: 'Thay lọc khí',
        DateStartPlan: '2025-06-03',
        DateEndPlan: '2025-06-03',
        DateStartActual: null,
        DateEndActual: null,
        Status: '<div class="status-cell status-1">Chưa tiến hành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-06-03</div><div>-</div><div>2025-06-03</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>...</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 11,
        CreatedName: 'Phuc Vo',
        AssignedName: 'Viet Phan',
        ApprovedName: null,
        MachineItemName: 'Băng tải B203',
        Content: 'Điều chỉnh tốc độ truyền động',
        DateStartPlan: '2025-06-05',
        DateEndPlan: '2025-06-06',
        DateStartActual: '2025-06-05',
        DateEndActual: null,
        Status: '<div class="status-cell status-2">Đang thực hiện</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-06-05</div><div>-</div><div>2025-06-06</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>2025-06-05</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 12,
        CreatedName: 'Minh Dao',
        AssignedName: 'Nam Le',
        ApprovedName: 'Trang Nguyen',
        MachineItemName: 'Máy in tem I700',
        Content: 'Làm sạch đầu in',
        DateStartPlan: '2025-05-28',
        DateEndPlan: '2025-05-28',
        DateStartActual: '2025-05-28',
        DateEndActual: '2025-05-28',
        Status: '<div class="status-cell status-3">Hoàn thành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-05-28</div><div>-</div><div>2025-05-28</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>2025-05-28</div><div>-</div><div>2025-05-28</div></div>'
    },
    {
        Id: 13,
        CreatedName: 'Tam Dang',
        AssignedName: 'Chi Mai',
        ApprovedName: null,
        MachineItemName: 'Robot lắp ráp R310',
        Content: 'Cập nhật phần mềm điều khiển',
        DateStartPlan: '2025-06-07',
        DateEndPlan: '2025-06-08',
        DateStartActual: null,
        DateEndActual: null,
        Status: '<div class="status-cell status-1">Chưa tiến hành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-06-07</div><div>-</div><div>2025-06-08</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>...</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 14,
        CreatedName: 'Son Vu',
        AssignedName: 'Hai Pham',
        ApprovedName: 'Duc Le',
        MachineItemName: 'Máy dán nhãn L250',
        Content: 'Thay thế motor servo',
        DateStartPlan: '2025-06-09',
        DateEndPlan: '2025-06-10',
        DateStartActual: null,
        DateEndActual: null,
        Status: '<div class="status-cell status-1">Chưa tiến hành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-06-09</div><div>-</div><div>2025-06-10</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>...</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 15,
        CreatedName: 'Bao Tran',
        AssignedName: 'Thao Nguyen',
        ApprovedName: null,
        MachineItemName: 'Máy ép B305',
        Content: 'Bảo trì hệ thống khí nén',
        DateStartPlan: '2025-06-11',
        DateEndPlan: '2025-06-12',
        DateStartActual: '2025-06-11',
        DateEndActual: null,
        Status: '<div class="status-cell status-1">Đang thực hiện</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-06-11</div><div>-</div><div>2025-06-12</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>2025-06-11</div><div>-</div><div>...</div></div>'
    },
    {
        Id: 16,
        CreatedName: 'Hien Le',
        AssignedName: 'Manh Hoang',
        ApprovedName: 'Tuan Anh',
        MachineItemName: 'Máy khắc laser L800',
        Content: 'Kiểm tra an toàn tia laser',
        DateStartPlan: '2025-06-13',
        DateEndPlan: '2025-06-14',
        DateStartActual: '2025-06-13',
        DateEndActual: '2025-06-14',
        Status: '<div class="status-cell status-3">Hoàn thành</div>',
        PlanDuration: '<div class="d-flex flex-row"><div>2025-06-13</div><div>-</div><div>2025-06-14</div></div>',
        ActualDuration: '<div class="d-flex flex-row"><div>2025-06-13</div><div>-</div><div>2025-06-14</div></div>'
    }
];
