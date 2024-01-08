window.onunload = function(event) {
    sessionStorage.removeItem("patientId")
};
const magnifying = document.getElementById("cepSearch")
const form = document.getElementById('addressRegistrationForm')

async function buscaCep(cep) {
    const cleanCep = cep.value.replace(".", "").replace("-", "");
    const url = `https://viacep.com.br/ws/${cleanCep}/json/`;
    try{
        const address = await axios.get(url)
        return address.data
    }catch(e){
        alert("algo inesperado aconteceu, tente novamente.")
    }
}


magnifying.addEventListener('click', async ()=>{
    const cep = document.getElementById("addressZipcode")
    const address = await buscaCep(cep)
    console.log(address)
    fillAdressField(address)
})

function fillAdressField(address){
    document.getElementById("addressStreet").value = address.logradouro
    document.getElementById("addressDistrict").value = address.bairro
    document.getElementById("addressCity").value = address.localidade
    document.getElementById("addressUf").value = address.uf
}

function payloadGenerator(){
    const payload = {
        patientId: sessionStorage.getItem("patientId"),
        zipcode : document.getElementById("addressZipcode").value ,
        street : document.getElementById("addressStreet").value,
        number : document.getElementById("addressNumber").value,
        complement : document.getElementById("addressComplement").value === "" ? '-' : document.getElementById("addressComplement").value ,
        district : document.getElementById("addressDistrict").value,
        city : document.getElementById("addressCity").value,
        UF : document.getElementById("addressUf").value
    }
    return payload
}

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const payload = payloadGenerator()
    const requisition = await postAddress(payload)
    if(requisition.status == 201){

        alert("Endereço cadastrado com sucesso")
        sessionStorage.removeItem("patientId")
        window.open("../pages/patient.html", "_self")
    }else{
        alert("Algo inesperado aconteceu, tente novamente por gentileza")
    }
    console.log(requisition)
})


async function postAddress(payload){
    const url = 'https://padma-pl.onrender.com/address'
    try{
        const response = await axios.post(url, payload)
        return response
    }catch(e){
        return e.response
    }
}