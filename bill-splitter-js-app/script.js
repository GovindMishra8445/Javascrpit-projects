const billAmountInput = document.querySelector('.bill-amount')
const numberOfPeopleInput = document.querySelector('.number-of-people')
const customTipInput = document.querySelector('.custom-tip')
const genrateBillBtn = document.querySelector('.genrate-bill-btn')
const tipAmountOutput = document.querySelector('.tip-amount span')
const totaBilllOutput = document.querySelector('.total span')
const eachPersonBillOutput = document.querySelector('.each-person-bill span')
const tipsContainer = document.querySelector('.tip-conteainer')
const resetBtn = document.querySelector('.reset-btn')


let tipPercentage = 0
genrateBillBtn.addEventListener('click', () => {
        const billAmount = parseInt(billAmountInput.value)
        const numberOfPeople = parseInt(numberOfPeopleInput.value)

        const tipAmount = billAmount * (tipPercentage / 100)

        const totalBill = billAmount + tipAmount
        const eachPersonBill = totalBill / numberOfPeople


        tipAmountOutput.innerText = `₹${tipAmount}`
        totaBilllOutput.innerText = `₹${totalBill}`
        eachPersonBillOutput.innerText = `${eachPersonBill}`
        resetBtn.disabled = false
})

tipsContainer.addEventListener('click', (e) => {
        if (tipsContainer.classList.contains('disabled')) return

        if (e.target !== tipsContainer) {
                [...tipsContainer.children].forEach((tip) => tip.classList.remove('selected'))
                e.target.classList.add('selected')
                tipPercentage = parseInt(e.target.innerText);
                customTipInput.value = ''
                
        }
})

customTipInput.addEventListener('input', () => {
        tipPercentage = parseInt(customTipInput.value);
        [...tipsContainer.children].forEach((tip) => tip.classList.remove('selected'))
})


resetBtn.addEventListener('click', () => {
        tipPercentag = 0
        billAmountInput.value = ''
        numberOfPeopleInput.value = ''
        customTipInput.value = ''
                ;[...tipsContainer.children].forEach((tip) => tip.classList.remove('selected'))
        tipAmountOutput.innerText = ''
        totaBilllOutput.innerText = ''
        eachPersonBillOutput.innerText = ''
        resetBtn.disabled = true
        customTipInput.disabled = true
        numberOfPeopleInput.disabled = true
        genrateBillBtn.disabled = true
        tipsContainer.classList.add('disabled')

})

billAmountInput.addEventListener('input', () => {
        if (billAmountInput.value) {
                customTipInput.disabled = false
                numberOfPeopleInput.disabled = false
                tipsContainer.classList.remove('disabled')
        } else {
                
                customTipInput.disabled = true
                numberOfPeopleInput.disabled = true
                tipsContainer.classList.add('disabled')
        }
        
})
numberOfPeopleInput.addEventListener('input', () => {
        if(numberOfPeopleInput.value){
                genrateBillBtn.disabled = false
        }else{
                genrateBillBtn.disabled = true
        }
        
})
customTipInput.addEventListener('input', () => {
        if(customTipInput.value){
                genrateBillBtn.disabled = false
        }else{
                genrateBillBtn.disabled =true
        }
})

tipsContainer.addEventListener('click', ()=>{
        genrateBillBtn.disabled= false
})