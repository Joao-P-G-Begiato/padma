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