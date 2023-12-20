const token = sessionStorage.getItem('token')

async function requestTokenValidation(){
    const payload = {
        token,
    }
    const response = axios.get("https://padma-auth.onrender.com/verify", payload)
    return response
}
// const userName = sessionStorage.getItem('name')
// const isAdmin = sessionStorage.getItem('admin')

document.addEventListener('DOMContentLoaded', async function(){
    const verifiedToken = await requestTokenValidation()
    console.log(verifiedToken)
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

async function changeAdmin(user){
    const oldRole = user.role == "true" ? "Administrador" : "Usuário" 
    const newRole = user.role == "true" ? "Usuário" : "Administrador"
    const msg = "Você quer mesmo trocar os privilégios de admnistrado do usuário: " + user.name + " de " + oldRole + " para " + newRole  
    const confirmation = confirm(msg)
    if(confirmation){
        try{
            await updateUser(user.id)
            alert("troca de privilégio efetuada com sucesso")
            window.location.reload()
        }catch(e){
            console.error(e)
            if(e.response.data.message== "User not found!"){
                alert("usuário não encontrado, gentileza recarregar a página e verificar se o usuário ainda existe")
            }else{
                alert("Alguma coisa deu errado, gentileza entrar em contato com o Admnistrador do sistema")
            }
        }
    }
}

async function exclude(id){
    const confirmation = confirm("Gostaria de deletar o Usuário permanentemente?")
    if(confirmation){
        try{
            await deleteUser(id)
            alert("Usuário cancelado com sucesso")
            window.location.reload()
        }catch(e){

            console.log(e.response.data.message)
            if(e.response.data.message == "User not found!"){
                alert("usuário não encontrado, gentileza recarregar a página e verificar se o usuário ainda existe")
            }else{
                alert("Alguma coisa deu errado, gentileza entrar em contato com o Admnistrador do sistema")
            }
        }
    }
}

async function updateUser(id){
    const url = "https://padma-auth.onrender.com/changeRole/" + id
    const response = await axios.put(url)
    return response.data
}

async function deleteUser(id){
    const url = "https://padma-auth.onrender.com/deleteUser/" + id
    const response = await axios.delete(url)
    return response.data
}