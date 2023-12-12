import {verify} from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const token = sessionStorage.getItem('token')
const userName = sessionStorage.getItem('name')
const validToken = verify(token , process.env.SECRET)
const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm_Do28iLCJyb2xlIjpmYWxzZSwiaWF0IjoxNzAyMzA1OTQ4LCJleHAiOjE3MDIzNDE5NDh9._yxYwDklcyFZr7OWQIhTdZQ48SQBA8RBwjtEPABJbYM"

console.log(validToken)
console.log(jwt.verify(expiredToken))

document.addEventListener('DOMContentLoaded', function(){
    if(!teste){
        window.open('../index.html', "_self")
    }
    const nameSpace = document.getElementById('name')
    console.log(nameSpace)
    nameSpace.innerText = userName + " ! "
})