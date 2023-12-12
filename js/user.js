const token = sessionStorage.getItem('token')
const userName = sessionStorage.getItem('name')
const isAdmin = sessionStorage.getItem('admin')

document.addEventListener('DOMContentLoaded', function(){
    if(isAdmin == "false" || !isAdmin){
        window.open('../index.html', "_self")
    }
    if(!token){
        window.open('../index.html', "_self")
    }
})

async function tableRender(){
    const data = await getUsers()
    const idName = "#userTable"
    const columns = [
        {
            data: "name",
        },
        {
            data: "role",
            render: function(data){
                if(data){
                    return "Administrador"
                }
                return "Usuário"
            }
        },
        {
            data: "id"
        },
        {
            render: function(){
                return "Ação"
            }
        }
    ]
    tableBuild(idName, data, columns, "Usuários")
    console.log(data)
}

async function getUsers(){
    const response = await axios.get("https://padma-auth.onrender.com/allusers")
    return response.data  
}

