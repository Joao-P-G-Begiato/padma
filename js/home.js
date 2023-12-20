const token = sessionStorage.getItem('token')

document.addEventListener('DOMContentLoaded', async function(){
    try{
        const verifiedToken = await requestTokenValidation()
        const userName = verifiedToken.data.name
        const isAdmin = verifiedToken.data.role
        if(isAdmin == "false" || !isAdmin){
            console.log('oi')
            document.getElementById('userManagment').remove()
        }
        if(!token){
            window.open('../index.html', "_self")
        }
        const nameSpace = document.getElementById('name')
        nameSpace.innerText = userName + " ! "
    }catch(e){
        console.log(e)
        alert(e.response.data.message)
        window.open('../index.html', "_self")
    }
})

async function requestTokenValidation(){
    const payload = {
        token,
    }
    const response = await axios.post("https://padma-auth.onrender.com/verify", payload)
    return response
}
