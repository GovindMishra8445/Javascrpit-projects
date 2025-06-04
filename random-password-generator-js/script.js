const upperset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerset = 'abcdefghijklmnopqrstuvwxyz';
const numberset = '1234567890';
const symbolesset = '!@#$%^&*()_+=-":?></.,';


const passbox = document.getElementById("pass-box")
const totalchar = document.getElementById("totalchar")
const upperinput = document.getElementById("uppercase")
const lowerinput = document.getElementById("lowercase")
const numberinput = document.getElementById("numbers")
const symbolinput = document.getElementById("symbols")

function randomnumber(randomdata){
    return randomdata[Math.floor(Math.random()*randomdata.length)]
}

const randompassword = (password = "")=>{
     if(upperinput.checked){
          password += randomnumber(upperset)
     }
     if(lowerinput.checked){
          password += randomnumber(lowerset)
     }
     if(numberinput.checked){
          password += randomnumber(numberset)
     }
     if(symbolinput.checked){
          password += randomnumber(symbolesset)
     }
     if(password.length < totalchar.value){
          return randompassword(password)
     }
     passbox.innerText= genratepassword(password, totalchar.value)
}

randompassword()

document.getElementById('btn').addEventListener("click", function(){
     randompassword();
})

function genratepassword(pass,num){
     if(pass.length < num){
          let password = pass.passwordset()
          return password
     }else{
          return pass
     }
}



