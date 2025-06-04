const generateCode = document.querySelector('.generate-code')
const imageTittle = document.querySelector('.image-tittle')
const memeImage = document.querySelector('.meme-image')
const memeAuthors = document.querySelector('.meme-authors')

function getmeme (){
     
     fetch('https://meme-api.com/gimme/wholesomememes')
     .then((res)=> res.json())
     .then((data)=>{
          const {url, title,author} = data 
          imageTittle.innerText = title
          memeImage.src= url
          memeAuthors.innerText = `Meme By:  ${author}`
     })
}
getmeme ()
generateCode.addEventListener('click',()=>{
     getmeme ()
})