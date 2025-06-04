const headerPhotoRefreshButton = document.querySelector('.header-photo')

headerPhotoRefreshButton.addEventListener('click', function(){
  window.location.reload();
})

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }




// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });




// word animated 

// Sidebar Title Animated 

const spanTitle = document.querySelector('.title-span')
const wordList = ['Developer', 'Coder', 'Designer', 'Engineer', 'Software']

let wordIndex = 0
let charterIndex = 0
let skipUpdate = 0
let reverseType = false;

const intervalId = setInterval(() => {
  if (skipUpdate) {
    skipUpdate--
    return
  }

  if (!reverseType) {
    skipUpdate = 1
    spanTitle.innerText = spanTitle.innerText + wordList[wordIndex][charterIndex]
    charterIndex++;
  } else {
    spanTitle.innerText = spanTitle.innerText.slice(0, spanTitle.innerText.length - 1)
    charterIndex--
  }

  if (charterIndex === wordList[wordIndex].length) {
    reverseType = true
    skipUpdate = 5
  }


  if (spanTitle.innerText.length === 0 && reverseType) { 
    reverseType = false
    wordIndex++;
  }

  if (wordIndex === wordList.length) {
    wordIndex = 0
  }
}, 100)


// About Me Animated
// const aboutMe = document.querySelector('.about-me')
const aboutMe = document.querySelector('[about-me]')
const aboutText = 'About-Me'


let aboutIndex = 0
let aboutReverseType = false

const aboutId = setInterval(() => {
  if (!aboutReverseType) {
    aboutMe.innerText = aboutMe.innerText + aboutText[aboutIndex]
    aboutIndex++
  } else {
    aboutMe.innerText = aboutMe.innerText.slice(0, aboutMe.innerText.length + 1)
  }

  // if (aboutMe.innerText.length === 0 && aboutReverseType) {
  //   aboutReverseType = false
  //   aboutIndex = 0
  // }
  if (aboutIndex === aboutText.length) {
    aboutReverseType = true
  }
}, 300)


// portfolio Word Animated

const portfolioName = document.querySelector('.portfolio-name')
const portfolioText = ['Web-Design', 'Mini-Applications','Web-Application','Web-Development']

let portfolioIndex = 0
let portfolioReverseType = false
let portfolioCharterIndex = 0
let portfolioUpdate = 0

const portfolioId = setInterval(() => {
  if (portfolioUpdate) {
    portfolioUpdate--
    return
  }

  if (! portfolioReverseType) {
    portfolioUpdate = 2
    portfolioName.innerText = portfolioName.innerText + portfolioText[portfolioIndex][portfolioCharterIndex]
    portfolioCharterIndex++;
  } else {
    portfolioName.innerText = portfolioName.innerText.slice(0, portfolioName.innerText.length - 1)
    portfolioCharterIndex--
  }

  if (portfolioCharterIndex === portfolioText[portfolioIndex].length) {
    portfolioReverseType = true
    portfolioUpdate = 3
  }


  if (portfolioName.innerText.length === 0 && portfolioReverseType) {
    portfolioReverseType = false
    portfolioIndex++;
  }

  if (portfolioIndex === portfolioText.length) {
    portfolioIndex = 0
  }
}, 100)



// const portfolioId = setInterval(() => {

//   if (!portfolioReverseType) {
//     portfolioName.innerText = portfolioName.innerText + portfolioText[portfolioIndex]
//     portfolioIndex++
//   } else {
//     portfolioName.innerText = portfolioName.innerText.slice(0, portfolioName.innerText.length - 1)
//   }

//   if (portfolioName.innerText.length === 0 && portfolioReverseType) {
//     portfolioReverseType = false
//     portfolioIndex = 0
//   }
//   if (portfolioIndex === portfolioText.length) {
//     portfolioReverseType = true
//   }
// }, 300)





// testimonials variables


const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


