$(async function () {
    
})
function drawTable() {
    $('#task_table').tabulator({
        width: "auto",
        data: tasks,
        layout: "fitColumns",
        columns: [
            { title: "Tên máy", field: "MachineItemName", width: 200, responsive: 0 },
            { title: "TG Dự kiến", field: "DateStartPlan" },
            { title: "TG Dự kiến", field: "DateStartPlan" },
            { title: "TG Dự kiến", field: "DateStartPlan" },
            { title: "TG Dự kiến", field: "DateStartPlan" },
            { title: "Area name", field: "AreaName", widthGrow: 3 },
            {
                title: "Actions",
                formatter: function (cell, formatterParams, onRendered) {
                    const id = cell.getRow().getData().Id;
                    return `
                <button class="btn btn-success btn-edit" data-id="${id}"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-danger btn-delete" data-id="${id}"><i class="fa-solid fa-trash"></i></button>
                `;
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
        Status: 'Chưa tiến hành'
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
        Status: 'Hoàn thành'
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
        Status: 'Đang thực hiện'
    },
    {
        Id: 4,
        CreatedName: 'Khoa Bui',
        AssignedName: 'Minh Hoang',
        ApprovedName: null,
        MachineItemName: 'Robot hàn R102',
        Content: 'Cập nhật firmware điều khiển',
        DateStartPlan: '2025-06-01',
        DateEndPlan: '2025-06-03',
        DateStartActual: null,
        DateEndActual: null,
        Status: 'Chưa tiến hành'
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
        Status: 'Hoàn thành'
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
        Status: 'Chưa tiến hành'
    }
];