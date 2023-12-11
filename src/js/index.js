console.log("teste")

const loginForm = document.getElementById('login-form')


loginForm.addEventListener('submit', async function(e){
    e.preventDefault()
    const login = document.getElementById("login-input").value
    const password = document.getElementById("password-input").value
    const url = "https://padma-auth.onrender.com/auth/" + login +"?password=" + password
    try{
        const getToken = await getAuth(url)
        console.log(getToken)
        sessionStorage.setItem('token', getToken.token)
        window.open("../../src/pages/home.html", "_self")
    }catch(e){
        const main = document.getElementsByTagName("main")
        const section = document.getElementsByTagName("section")[0]
        if(section){
            section.remove()
        }
        const newSection = document.createElement("section")
        const newSpan = document.createElement("span")
        main[0].appendChild(newSection)
        newSection.appendChild(newSpan)
        let content = ''
        if(e.response.data.message == "user not found"){
            content = document.createTextNode("Usuário não encontrado")
        }
        if(e.response.data.message.includes("Login and Password doesn't match")){
            content = document.createTextNode("Senha e/ou Usuário incorretos ")
        }
        newSpan.appendChild(content)
    }
})

async function getAuth (url){
    const response = await axios.get(url)
    return response.data
}