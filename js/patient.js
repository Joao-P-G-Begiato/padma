const token = sessionStorage.getItem('token')
const editPatientInfoBtn = document.getElementById("editPatientBtn")
const editPatientAddresBtn = document.getElementById("editAddresBtn")

async function requestTokenValidation(){
    const payload = {
        token,
    }
    const response = await axios.post("https://padma-auth.onrender.com/verify", payload)
    return response
}

document.addEventListener('DOMContentLoaded', async function(){
    try{
        const loadingDiv = document.getElementById("loadingDiv")
        const verifiedToken = await requestTokenValidation()
        if(verifiedToken.data){
            await tableRender()
            loadingDiv.setAttribute("class", "hide")
        }
    }catch(e){
        const loadingDiv = document.getElementById("loadingDiv")
        loadingDiv.setAttribute("class", "hide")
        console.log(e)
        if(e.response.data.message){
            alert(e.response.data.message)
        }
        window.open('../index.html', "_self")
    }
})

async function tableRender(){
    const patientData = await getPatientData()
    const columns = [
        {
            data: "name"
            ,width: "30%"
        }
        ,{
            data: "cpf"
            ,width: "25%"
        }
        ,{
            data: "birthDate"
            ,width: "25%"
            , render: function(data){
                return moment(data).format("DD/MM/YYYY")
            }
        },
        {
            data: "completeData",
            width: "20%",
            render: function(data){
                return `<img src = "../assets/person-card.PNG" title='informações do paciente' class = "icon" onclick = 'openPacientInfo(${JSON.stringify(data)})'>
                <img src = "../assets/map.PNG" title='endereço do paciente' class = "icon" onclick = 'openAddress("${JSON.parse(data).patientId}")'>
                <img src = "../assets/Anamnesis.PNG" title='Anamnese' class = "icon" onclick = 'notImplemented(${JSON.stringify(data)})'>
                <img src = "../assets/package.PNG" title='Pacotes' class = "icon" onclick = 'notImplemented("${JSON.parse(data).patientId}")'>
                <img src = "../assets/Padma.PNG" title='Marcar Consulta' class = "icon" onclick = 'notImplemented(${JSON.stringify(data)})'>
                <img src = "../assets/trash.PNG" title='Deletar Paciente' class = "icon" onclick = 'deleteIconClick("${JSON.parse(data).patientId}")'>
                `
            }
        }
    ]
    tableBuild("#patientTable", patientData, columns)
}

async function getPatientData() {
    const response = await axios.get("https://padma-pl.onrender.com/patient")
    const revisedData = response.data.map((element => {
        const result = {
            name: element.name,
            cpf: element.cpf,
            phone: element.phone,
            birthDate: element.birthDate,
            completeData: JSON.stringify(element)
        }
        return result
    }))
    return revisedData
}

function openPacientInfo(data){
    data = JSON.parse(data)
    const nameTextNode = document.createTextNode(data.name)
    const CPFTextNode = document.createTextNode(data.cpf)
    const birthDateTextNode = document.createTextNode(moment(data.birthDate).format("DD/MM/YYYY"))
    const phoneTextNode = document.createTextNode(data.phone)
    const cellphoneTextNode = document.createTextNode(data.cellphone)
    const emailTextNode = document.createTextNode(data.email)
    const occupationTextNode = document.createTextNode(data.occupation)
    const contactNameTextNode = document.createTextNode(data.contactName)
    const contactPhoneTextNode = document.createTextNode(data.contactPhone)
    const ContactRelationTextNode = document.createTextNode(data.contactRelation)
    document.getElementById("modalPatientName").appendChild(nameTextNode)
    document.getElementById("modalPatientCPF").appendChild(CPFTextNode)
    document.getElementById("modalPatientBirthDate").appendChild(birthDateTextNode)
    document.getElementById("modalPatientPhone").appendChild(phoneTextNode)
    document.getElementById("modalPatientCellphone").appendChild(cellphoneTextNode)
    document.getElementById("modalPatientEmail").appendChild(emailTextNode)
    document.getElementById("modalPatientOccupation").appendChild(occupationTextNode)
    document.getElementById("modalPatientContactName").appendChild(contactNameTextNode)
    document.getElementById("modalPatientContactPhone").appendChild(contactPhoneTextNode)
    document.getElementById("modalPatientContactRelation").appendChild(ContactRelationTextNode)
    sessionStorage.setItem("patientInfo", JSON.stringify(data))
    $("#patientInfoModal").modal("show")
}

$("#patientInfoModal").on("hidden.bs.modal", ()=>{
    document.getElementById("modalPatientName").removeChild(document.getElementById("modalPatientName").firstChild)
    document.getElementById("modalPatientCPF").removeChild(document.getElementById("modalPatientCPF").firstChild)
    document.getElementById("modalPatientBirthDate").removeChild(document.getElementById("modalPatientBirthDate").firstChild)
    document.getElementById("modalPatientPhone").removeChild(document.getElementById("modalPatientPhone").firstChild)
    document.getElementById("modalPatientCellphone").removeChild(document.getElementById("modalPatientCellphone").firstChild)
    document.getElementById("modalPatientEmail").removeChild(document.getElementById("modalPatientEmail").firstChild)
    document.getElementById("modalPatientOccupation").removeChild(document.getElementById("modalPatientOccupation").firstChild)
    document.getElementById("modalPatientContactName").removeChild(document.getElementById("modalPatientContactName").firstChild)
    document.getElementById("modalPatientContactPhone").removeChild(document.getElementById("modalPatientContactPhone").firstChild)
    document.getElementById("modalPatientContactRelation").removeChild(document.getElementById("modalPatientContactRelation").firstChild)
    sessionStorage.removeItem("patientInfo")
})

$("#patientAddressModal").on('hidden.bs.modal', ()=>{
    const span = document.getElementById("addressSpan")
    span.removeChild(span.firstChild)
})

async function openAddress(id){
    const data = await getAddress(id)
    if(data != ''){
        const span = document.getElementById("addressSpan")
        span.childNodes.forEach((node)=> span.removeChild(node))
        let text
        if(data[0].complement ===  "-"){
            text = document.createTextNode(data[0].street + "," + data[0].number + " - "  + data[0].district + ", " + data[0].city + " - " + data[0].UF + ", " + data[0].zipcode)
        }else{
            text = document.createTextNode(data[0].street + "," + data[0].number + " - " + data[0].complement + " - " + data[0].district + ", " + data[0].city + " - " + data[0].UF + ", " + data[0].zipcode)
        }
        span.appendChild(text)
        $("#patientAddressModal").modal('show')
    }else{
        if(confirm("Paciente sem endereço cadastrado, gostaria de realizar o cadastro?") == true){
            sessionStorage.setItem('patientId' , id)
            window.open("../pages/addressRegistration.html", "_self")
        }
    }
}

async function getAddress(id){
    const url = "https://padma-pl.onrender.com/address/"+id
    const response = await axios.get(url)
    return response.data
}

function notImplemented(){
    alert("Função ainda não implementada")
}

function addPatientBtn(){
    //alert("abrir adicionar paciente")
    $("#newPatientRegister").modal('show')
}

$("#newPatientRegister").on("hidden.bs.modal", ()=>{
    clearRegisterFields()
})

function clearRegisterFields(){
    document.getElementById("newPatient-name").value = ""
    document.getElementById("newPatient-phone").value = ""
    document.getElementById("newPatient-birthDate").value = ""
    document.getElementById("newPatient-occupation").value = ""
    document.getElementById("newPatient-email").value = ""
    document.getElementById("newPatient-cellphone").value = ""
    document.getElementById("newPatient-cpf").value = ""
    document.getElementById("newPatient-contactName").value = ""
    document.getElementById("newPatient-contactPhone").value = ""
    document.getElementById("newPatient-contactRelation").value = ""
}

const form = document.getElementById("registerPatientForm")
form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const payload = {
        name : document.getElementById("newPatient-name").value ,
        phone : document.getElementById("newPatient-phone").value ,
        birthDate: document.getElementById("newPatient-birthDate").value ,
        occupation: document.getElementById("newPatient-occupation").value ,
        email: document.getElementById("newPatient-email").value,
        cellphone: document.getElementById("newPatient-cellphone").value ,
        cpf: document.getElementById("newPatient-cpf").value.includes(".") ? document.getElementById("newPatient-cpf").value.split(".").join("").split("-").join("") : document.getElementById("newPatient-cpf").value ,
        contactName: document.getElementById("newPatient-contactName").value ,
        contactPhone: document.getElementById("newPatient-contactPhone").value ,
        contactRelation: document.getElementById("newPatient-contactRelation").value 
    }
    try{
        const post = await postPatient(payload)
        alert(`Paciente ${payload.name} cadastrado com sucesso !`)
        $("#newPatientRegister").modal('hide')
        tableRender()

    }catch(e){
        console.log(e)
        if(e.response.data.message){
            alert(e.response.data.message)
        }else{
            alert("error: "+ e.message+ " contate o administrador do sistema.")
        }
    }
})

async function postPatient(payload){
    const url = "https://padma-pl.onrender.com/patient"
    const response = await axios.post(url, payload)
    return response
}
async function deletePatient(id){
    const url = "https://padma-pl.onrender.com/patient/"+id
    const response = await axios.delete(url)
    return response
}

async function deleteIconClick(id){
    if(confirm("Você tem certeza que quer deletar o registro desse paciente ?")){

    }
}

editPatientInfoBtn.addEventListener('click', ()=>{
    window.open("../pages/editPatientInfo.html", "_self")
})

editPatientAddresBtn.addEventListener('click', ()=>{
    window.open("../pages/editPatientInfo.html", "_self")
})