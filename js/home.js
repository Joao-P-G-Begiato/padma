const token = sessionStorage.getItem('token')
const userName = sessionStorage.getItem('name')
const isAdmin = sessionStorage.getItem('admin')

document.addEventListener('DOMContentLoaded', function(){
    if(isAdmin == "false" || !isAdmin){
        console.log('oi')
        document.getElementById('userManagment').remove()
    }
    if(!token){
        window.open('../index.html', "_self")
    }
    const nameSpace = document.getElementById('name')
    nameSpace.innerText = userName + " ! "
})