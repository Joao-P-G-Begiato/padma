const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('registerUserForm')
const closeModalBtn = document.getElementsByClassName('btn-close')[0]
const modal = document.getElementById('registerFormModal')


loginForm.addEventListener('submit', async function(e){
    e.preventDefault()
    const login = document.getElementById("login-input").value
    const password = document.getElementById("password-input").value
    const url = "https://padma-auth.onrender.com/auth/" + login +"?password=" + password
    try{
        const getToken = await getAuth(url)
        sessionStorage.setItem('token', getToken.token)
        sessionStorage.setItem('name', getToken.name)
        sessionStorage.setItem('admin', getToken.role)
        window.open("../pages/home.html", "_self")
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

registerForm.addEventListener('submit', async function(e){
    e.preventDefault()
    const payload = {
        name: document.getElementById('userName').value,
        login: document.getElementById('userLogin').value,
        password: document.getElementById('userPassword').value,
        confirmPassword: document.getElementById('userConfirmPassword').value
    }
    try{
        const requisition = await postUser(payload)
        alert("usuario de login:" + requisition.login+ " e nome: " +requisition.name + " cadastrado com sucesso")
        closeModalBtn.dispatchEvent(new Event('click'))
    }catch(e){
        let messageError = ""
        if(e.response.data.message == "Password and Confirmation don't match"){
            messageError = "Senha e Confirmação devem ser iguais"
        }
        if(e.response.data.message == "User already exists. contact the service administrator"){
            messageError = "Usuário já cadastrado"
        }
        if(e.response.data.message == "Param password need to contain a Number, a Uppercase , a lowercase, 8 digits and a special caracter between the followings: !@#$%¨&*+_¹²³£¢¬§"){
            messageError = "A senha precisa conter 8 digitos, uma letra maiúscula, uma letra minúscula e o um caracter especial dentre os seguintes: !@#$%¨&*+_¹²³£¢¬§ "
        }
        if(e.response.data.message == "Missing Param password"){
            messageError = "a senha é obrigatória"
        }
        if(e.response.data.message == "Missing Param login"){
            messageError = "o Login é obrigatório"
        }
        if(e.response.data.message == "Missing Param name"){
            messageError = "o nome é obrigatória"
        }
        if(e.response.data.message == "Missing Param password confirmation"){
            messageError = "a confirmação de senha é obrigatória"
        }
        const span = document.getElementById("registerError")
        if(span.childNodes.length > 0){

            span.removeChild(span.firstChild)
        }
        span.appendChild(document.createTextNode(messageError))
    }
    })

async function getAuth (url){
    const response = await axios.get(url)
    return response.data
}

async function postUser (payload){
    const url = "https://padma-auth.onrender.com/createUser"
    const response = await axios.post(url, payload)
    return response.data
}

function clearForm(){
    document.getElementById('userName').value = ""
    document.getElementById('userLogin').value = ""
    document.getElementById('userPassword').value = ""
    document.getElementById('userConfirmPassword').value = ""
    const span = document.getElementById("registerError")
    if(span.childNodes.length > 0){
        span.removeChild(span.firstChild)
    }
}

modal.addEventListener('hidden.bs.modal', clearForm)


async function generateTestUser(){
    for(let i = 0; i < 10; i++){
        const dinamicPayload = {
            name : "Teste JP",
            login : "jpbetest" + i,
            password : "Dudaema@3005",
            confirmPassword: "Dudaema@3005"
        }
        await postUser(dinamicPayload)
    }
    console.log("criados")
}
