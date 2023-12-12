const token = sessionStorage.getItem('token')
const userName = sessionStorage.getItem('name')
const isAdmin = sessionStorage.getItem('admin')

document.addEventListener('DOMContentLoaded', async function(){
    if(isAdmin == "false" || !isAdmin){
        window.open('../index.html', "_self")
    }
    if(!token){
        window.open('../index.html', "_self")
    }
    await tableRender()
})

async function tableRender(){
    const data = await getUsers()
    const idName = "#userTable"
    const columns = [
        {
            width: "50%",
            data: "name",
        },
        {
            width: "10%",
            data: "role",
            render: function(data){
                if(data){
                    return "Administrador"
                }
                return "Usuário"
            }
        },
        {
            width: "1%",
            data: "id",
            class: "hidden"
        },
        {
            render: function(data, type, row){
                console.log(row)
                return `<img class='icon' onclick='changeAdmin(${JSON.stringify(row)})' title='privilégios de adm' src='../assets/adm.PNG'></i><img class='icon' onclick='exclude(${JSON.stringify(row.id)})' title='deletar usuário' src='../assets/trash.PNG'></i>`
            }
        }
    ]
    tableBuild(idName, data, columns, "Usuários")
}

async function getUsers(){
    const response = await axios.get("https://padma-auth.onrender.com/allusers")
    return response.data  
}

function changeAdmin(user){
    const oldRole = user.role == "true" ? "Administrador" : "Usuário" 
    const newRole = user.role == "true" ? "Usuário" : "Administrador"
    const msg = "Você quer mesmo trocar os privilégios de admnistrado do usuário: " + user.name + " de " + oldRole + " para " + newRole  
    const confirmation = confirm(msg)
    if(confirmation){
        updateUser(user.id)
    }
}

function exclude(id){
    const confirmation = confirm("Gostaria de deletar o Usuário permanentemente?")
    if(confirmation){
        deleteUser(id)
    }
}

function updateUser(id){
    const url = "https://padma-auth.onrender.com/changeRole" + id
    console.log(id)
}

function deleteUser(id){
    const url = "https://padma-auth.onrender.com/" + id
    console.log(id)
}