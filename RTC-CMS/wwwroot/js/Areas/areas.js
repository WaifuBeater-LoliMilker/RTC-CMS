$(async function () {
    const areas = await GetAll();
    const treeData = buildTree(areas);
    //console.log(areas);
    var table = new Tabulator("#areas_table", {
        //height: "311px",
        width: "auto",
        data: treeData,
        dataTree: true,
        layout: "fitColumns",
        dataTreeStartExpanded: true,
        dataTreeChildField: "children",
        columns: [
            { title: "Area code", field: "AreaCode", width: 200, responsive: 0 },
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
                cellClick: CellClick
            }
        ],
    });

    //console.log(table);

    $('#area_parent').select2({
        data: areas
    })

    //const comboTree2 = $("#area_parent").comboTree({
    //    source: areas,
    //    isMultiple: false,
    //});

    $('#area_add').on('click', () => {

    });
});


function CellClick(e, cell) {
    const target = e.target;
    const id = $(target).data("id");

    if ($(target).hasClass("btn-edit")) {
        // Xử lý nút sửa
        console.log(id);
    }

    if ($(target).hasClass("btn-delete")) {
        if (confirm("Bạn có chắc muốn xoá không?")) {
            // Gọi API xoá ở đây
            $.ajax({
                url: `/areas/delete/${id}`,
                type: "DELETE",
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



//function buildTree(items) {
//    const grouped = _.groupBy(items, 'ParentId');

//    const build = (parentId) => {
//        return (grouped[parentId] || []).map(item => ({
//            ...item,
//            children: build(item.Id)
//        }));
//    };

//    return build(0); // Start from root nodes (parentId === 0)
//}
function buildTree(data) {
    const map = {};
    const roots = [];

    data.forEach(item => {
        map[item.Id] = { ...item, children: [] };
    });

    data.forEach(item => {
        if (item.ParentId && map[item.ParentId]) {
            map[item.ParentId].children.push(map[item.Id]);
        } else {
            roots.push(map[item.Id]);
        }
    });

    return roots;
}


function GetAll() {
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



