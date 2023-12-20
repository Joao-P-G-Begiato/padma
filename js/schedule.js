const token = sessionStorage.getItem('token')

async function requestTokenValidation(){
    const payload = {
        token,
    }
    const response = await axios.post("https://padma-auth.onrender.com/verify", payload)
    return response
}

document.addEventListener('DOMContentLoaded', async function(){
    try{
        const verifiedToken = await requestTokenValidation()
    }catch(e){
        alert(e.response.data.message)
        window.open('../index.html', "_self")
    }
})