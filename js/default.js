const logout = document.getElementById('logout')

logout.addEventListener('click', ()=>{
    if(confirm("Você deseja deslogar ?") == true){
        sessionStorage.removeItem('token')
        window.open("../index.html", "_self")
    }
})

