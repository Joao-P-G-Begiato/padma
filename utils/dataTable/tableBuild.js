function tableBuild(idName,data ,columns , printName){
    document.getElementById(idName).dataTable().fnClearTable();
    document.getElementById(idName).dataTable().fnDraw();
    document.getElementById(idName).dataTable().fnDestroy();
    let table;
    const setColumns = columns.map((element) => {
        if(!element.width){
            const width = Math.floor(100/columns.length)
            element.width = width
        }
        if(!element.class){
            element.class = "dt-center"
        }
    })
    table = new DataTable(idName, {
        data,
        language: "../utils/dataTable/pt-BR.json",
        dom: "Blfrtip",
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10,25,50,100, 'Todos'],
        ],
        columns: setColumns,
        buttons: [
            {
                extend: "excel",
                title: printName + " " + moment(new Date()).format("DD/MM/YYYY"),
                text: "Excel",
                autoFilter: true,
                sheetName: printName,
            },
            {
                extend: "pdf",
                title: printName + " " + moment(new Date()).format("DD/MM/YYYY"),
                autoFilter: true,
                sheetName: printName,
            },
            {
                extend: "print",
                title: printName + " " + moment(new Date()).format("DD/MM/YYYY")
            }, 
        ]
    })
}