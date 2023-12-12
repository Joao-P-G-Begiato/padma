function tableBuild(idName,data ,columns , printName){
    $(idName).dataTable().fnClearTable();
    $(idName).dataTable().fnDraw();
    $(idName).dataTable().fnDestroy();
    let table;
    const setColumns = columns.map((element) => {
        if(!element.width){
            const width = Math.floor(100/columns.length)
            element.width = width
        }
        if(!element.class){
            element.class = "dt-center"
        }
        return element
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
    })
}