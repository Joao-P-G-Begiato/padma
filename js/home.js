const token = sessionStorage.getItem('token')
const userName = sessionStorage.getItem('name')
const isAdmin = sessionStorage.getItem('admin')


document.addEventListener('DOMContentLoaded', function(){
    if(!token){
        window.open('../index.html', "_self")
    }
    const nameSpace = document.getElementById('name')
    console.log(nameSpace)
    nameSpace.innerText = userName + " ! "
})