console.log("teste")

const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('registerUserForm')


loginForm.addEventListener('submit', async function(e){
    e.preventDefault()
    const login = document.getElementById("login-input").value
    const password = document.getElementById("password-input").value
    const url = "https://padma-auth.onrender.com/auth/" + login +"?password=" + password
    try{
        const getToken = await getAuth(url)
        console.log(getToken)
        sessionStorage.setItem('token', getToken.token)
        window.open("../../pages/home.html", "_self")
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
    console.log("Oi")
    const payload = {
        name: document.getElementById('userName').value,
        login: document.getElementById('userLogin').value,
        password: document.getElementById('userPassword').value,
        confirmPassword: document.getElementById('userConfirmPassword').value
    }
    try{
        const requisition = await postUser(payload)
        console.log(requisition)
        alert("usuario " + requisition.login+ " cadastrado com sucesso")
        document.getElementById('userName').value = ""
        document.getElementById('userLogin').value = ""
        document.getElementById('userPassword').value = ""
        document.getElementById('userConfirmPassword').value = ""
        
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

