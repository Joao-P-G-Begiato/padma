const patientInfo = JSON.parse(sessionStorage.getItem("patientInfo"))

function patientInfoPayloadGenerator(){
    const payload = {}
    if(document.getElementById("nameCheckBox").checked){
        payload.name = document.getElementById("newPatient-name").value
    }
    if(document.getElementById("phoneCheckBox").checked){
        payload.phone = document.getElementById("newPatient-phone").value
    }
    if(document.getElementById("birthDayCheckBox").checked){
        payload.birthDate = document.getElementById("newPatient-birthDate").value
    }
    if(document.getElementById("occupationCheckBox").checked){
        payload.occupation = document.getElementById("newPatient-occupation").value
    }
    if(document.getElementById("emailCheckBox").checked){
        payload.email = document.getElementById("newPatient-email").value
    }
    if(document.getElementById("cellphoneCheckBox").checked){
        payload.cellphone = document.getElementById("newPatient-cellphone").value
    }
    if(document.getElementById("cpfCheckBox").checked){
        payload.cpf = document.getElementById("newPatient-cpf").value
    }
    if(document.getElementById("contactCheckBox").checked){
        payload.contactName = document.getElementById("newPatient-contactName").value
    }
    if(document.getElementById("contactPhoneCheckBox").checked){
        payload.contactPhone = document.getElementById("newPatient-contactPhone").value
    }
    if(document.getElementById("contactRelationCheckBox").checked){
        payload.contactRelation = document.getElementById("newPatient-contactRelation").value
    }
    return payload
}

function patientAddressPayloadGenerator(){
    const payload = {}
    if(document.getElementById("addressZipcodeCheckBox").checked){
        payload.zipcode = document.getElementById("addressZipcode").value
    }
    if(document.getElementById("addressStreetCheckBox").checked){
        payload.street = document.getElementById("addressStreet").value
    }
    if(document.getElementById("addressNumberCheckBox").checked){
        payload.number = document.getElementById("addressNumber").value
    }
    if(document.getElementById("addressComplementCheckBox").checked){
        payload.complement = document.getElementById("addressComplement").value
    }
    if(document.getElementById("addressDistrictCheckBox").checked){
        payload.district = document.getElementById("addressDistrict").value
    }
    if(document.getElementById("addressCityCheckBox").checked){
        payload.city = document.getElementById("addressCity").value
    }
    if(document.getElementById("addressUfCheckBox").checked){
        payload.UF = document.getElementById("addressUf").value
    }
    return payload
}


async function submitPatientInfo(){
    const payload = patientInfoPayloadGenerator()
    if(Object.keys(payload).length == 0){
        alert("Selecione pelo menos um dos campos para alterar.")
    }else{
        const url = "https://padma-pl.onrender.com/patient/"+ patientInfo.patientId
        const response = await axios.patch(url, payload)
        return response
    }
}

async function submitPatientAddress(){
    const payload = patientAddressPayloadGenerator()
    if(Object.keys(payload).length == 0){
        alert("Selecione pelo menos um dos campos para alterar.")
    }else{
        const url = "https://padma-pl.onrender.com/address/"+ patientInfo.patientId
        const response = await axios.patch(url, payload)
        return response
    }
}

async function getAddress () {
    const url = 'https://padma-pl.onrender.com/address/' + patientInfo.patientId
    const response = await axios.get(url)
    return response
}

document.getElementById("registerPatientForm").addEventListener('submit', async (e)=>{
    e.preventDefault()
    const request = await submitPatientInfo()
    if(request.status == 200){
        alert("Usuário alterado com sucesso")
        unCheck()
        sessionStorage.setItem("patientInfo", JSON.stringify(request.data.patient))
    }
})

document.getElementById("addressRegistrationForm").addEventListener('submit', async (e)=>{
    e.preventDefault()
    const request = await submitPatientAddress()
    if(request.status == 200){
        alert("Endereço atualizado com sucesso")
        unCheck()
        await addressFillFileds()
    }
})

document.addEventListener("DOMContentLoaded", async ()=>{
    if(patientInfo){
        document.getElementById("newPatient-name").value = patientInfo.name
        document.getElementById("newPatient-phone").value = patientInfo.phone
        document.getElementById("newPatient-birthDate").value = patientInfo.birthDate
        document.getElementById("newPatient-occupation").value = patientInfo.occupation
        document.getElementById("newPatient-email").value = patientInfo.email
        document.getElementById("newPatient-cellphone").value = patientInfo.cellphone
        document.getElementById("newPatient-cpf").value = patientInfo.cpf
        document.getElementById("newPatient-contactName").value = patientInfo.contactName
        document.getElementById("newPatient-contactPhone").value = patientInfo.contactPhone
        document.getElementById("newPatient-contactRelation").value = patientInfo.contactRelation
        await addressFillFileds()
    }else{
        window.open("../pages/patient.html", "_self")
    }
})

async function addressFillFileds (){
    const address = await getAddress()
    if(address.data != ''){
        const dataAddress = address.data[0]
        document.getElementById("addressZipcode").value = dataAddress.zipcode
        document.getElementById("addressStreet").value = dataAddress.street
        document.getElementById("addressNumber").value = dataAddress.number
        document.getElementById("addressComplement").value = dataAddress.complement
        document.getElementById("addressDistrict").value = dataAddress.district
        document.getElementById("addressCity").value = dataAddress.city
        document.getElementById("addressUf").value = dataAddress.UF
    }else{
        const formAddres = document.getElementById('addressRegistrationForm')
        const textNode = document.createElement("p")
        textNode.textContent = "Este paciente não tem endereço cadastrado, volte para a página de paciente para cadastrar"
        formAddres.parentNode.appendChild(textNode)
        formAddres.parentNode.removeChild(formAddres)
    }
}

// window.onbeforeunload = (event)=>{
//     event.returnValue = true
// }

// window.onunload = ()=>{
//     sessionStorage.removeItem("patientInfo")
// }

document.getElementById("nameCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("nameCheckBox").checked){
        document.getElementById("newPatient-name").required = true
    }else{
        document.getElementById("newPatient-name").required = false
}})

document.getElementById("phoneCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("phoneCheckBox").checked){
        document.getElementById("newPatient-phone").required = true
    }else{
        document.getElementById("newPatient-phone").required = false
}})

document.getElementById("birthDayCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("birthDayCheckBox").checked){
        document.getElementById("newPatient-birthDate").required = true
    }else{
        document.getElementById("newPatient-birthDate").required = false
}})

document.getElementById("occupationCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("occupationCheckBox").checked){
        document.getElementById("newPatient-occupation").required = true
    }else{
        document.getElementById("newPatient-occupation").required = false
}})

document.getElementById("emailCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("emailCheckBox").checked){
        document.getElementById("newPatient-email").required = true
    }else{
        document.getElementById("newPatient-email").required = false
}})

document.getElementById("cellphoneCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("cellphoneCheckBox").checked){
        document.getElementById("newPatient-cellphone").required = true
    }else{
        document.getElementById("newPatient-cellphone").required = false
}})

document.getElementById("cpfCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("cpfCheckBox").checked){
        document.getElementById("newPatient-cpf").required = true
    }else{
        document.getElementById("newPatient-cpf").required = false
}})

document.getElementById("contactCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("contactCheckBox").checked){
        document.getElementById("newPatient-contactName").required = true
    }else{
        document.getElementById("newPatient-contactName").required = false
}})

document.getElementById("contactPhoneCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("contactPhoneCheckBox").checked){
        document.getElementById("newPatient-contactPhone").required = true
    }else{
        document.getElementById("newPatient-contactPhone").required = false
}})

document.getElementById("contactRelationCheckBox").addEventListener('change', ()=>{
    if(document.getElementById("contactRelationCheckBox").checked){
        document.getElementById("newPatient-contactRelation").required = true
    }else{
        document.getElementById("newPatient-contactRelation").required = false
}})

document.getElementById("addressAllCheckBox").addEventListener('change', () =>{
    document.getElementById("addressZipcodeCheckBox").checked = document.getElementById("addressAllCheckBox").checked
    document.getElementById("addressStreetCheckBox").checked = document.getElementById("addressAllCheckBox").checked
    document.getElementById("addressNumberCheckBox").checked = document.getElementById("addressAllCheckBox").checked
    document.getElementById("addressComplementCheckBox").checked = document.getElementById("addressAllCheckBox").checked
    document.getElementById("addressDistrictCheckBox").checked = document.getElementById("addressAllCheckBox").checked
    document.getElementById("addressCityCheckBox").checked = document.getElementById("addressAllCheckBox").checked
    document.getElementById("addressUfCheckBox").checked = document.getElementById("addressAllCheckBox").checked
} )

document.getElementById("patientAllCheckBox").addEventListener('change', () =>{
    document.getElementById("nameCheckBox").checked = document.getElementById("patientAllCheckBox").checked
    document.getElementById("phoneCheckBox").checked = document.getElementById("patientAllCheckBox").checked
    document.getElementById("birthDayCheckBox").checked = document.getElementById("patientAllCheckBox").checked
    document.getElementById("occupationCheckBox").checked = document.getElementById("patientAllCheckBox").checked
    document.getElementById("emailCheckBox").checked = document.getElementById("patientAllCheckBox").checked
    document.getElementById("cellphoneCheckBox").checked = document.getElementById("patientAllCheckBox").checked
    document.getElementById("cpfCheckBox").checked = document.getElementById("patientAllCheckBox").checked
    document.getElementById("contactCheckBox").checked = document.getElementById("patientAllCheckBox").checked
    document.getElementById("contactPhoneCheckBox").checked = document.getElementById("patientAllCheckBox").checked
    document.getElementById("contactRelationCheckBox").checked = document.getElementById("patientAllCheckBox").checked
} )


function unCheck(){
    document.getElementById("addressZipcodeCheckBox").checked = false
    document.getElementById("addressStreetCheckBox").checked = false
    document.getElementById("addressNumberCheckBox").checked = false
    document.getElementById("addressComplementCheckBox").checked = false
    document.getElementById("addressDistrictCheckBox").checked = false
    document.getElementById("addressCityCheckBox").checked = false
    document.getElementById("addressUfCheckBox").checked = false
    document.getElementById("nameCheckBox").checked = false
    document.getElementById("phoneCheckBox").checked = false
    document.getElementById("birthDayCheckBox").checked = false
    document.getElementById("occupationCheckBox").checked = false
    document.getElementById("emailCheckBox").checked = false
    document.getElementById("cellphoneCheckBox").checked = false
    document.getElementById("cpfCheckBox").checked = false
    document.getElementById("contactCheckBox").checked = false
    document.getElementById("contactPhoneCheckBox").checked = false
    document.getElementById("contactRelationCheckBox").checked = false
}

const magnifying = document.getElementById("cepSearch")

async function searchCEP(cep) {
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
    const address = await searchCEP(cep)
    console.log(address)
    fillAdressField(address)
})

function fillAdressField(address){
    document.getElementById("addressStreet").value = address.logradouro
    document.getElementById("addressDistrict").value = address.bairro
    document.getElementById("addressCity").value = address.localidade
    document.getElementById("addressUf").value = address.uf
}

