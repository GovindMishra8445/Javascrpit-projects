const count = document.querySelector('.count')
const minusCount = document.querySelector('.minus')
const plusCount = document.querySelector('.plus')
const changeBy = document.querySelector('.change-by')
const resetBtn = document.querySelector('.reset-btn')


plusCount.addEventListener('click', ()=>{
     const countValue = parseInt(count.innerText)
     const changeByValue = parseInt(changeBy.value)
     count.innerText = countValue + changeByValue

     // count.innerText = parseInt(count.innerText) + 1
})
minusCount.addEventListener('click', ()=>{
     const countValue = parseInt(count.innerText)
     const changeByValue = parseInt(changeBy.value)
     count.innerText = countValue - changeByValue

     // count.innerText = parseInt(count.innerText) - 1
})

resetBtn.addEventListener('click', ()=>{
     count.innerText = 0
})