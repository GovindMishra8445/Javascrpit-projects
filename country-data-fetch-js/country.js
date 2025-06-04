const countryName = new URLSearchParams(window.location.search).get("name");
const flagImage = document.querySelector(".country-detalis img");
const countryNameH1 = document.querySelector(".country-detalis h1");
const nativeName = document.querySelector(".native-name");
const Population = document.querySelector(".Population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const curency = document.querySelector(".curency");
const language = document.querySelector(".language");
const borderCountry = document.querySelector('.border-country')
const themChangers = document.querySelector('.theme-changer')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flagImage.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;
    Population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    subRegion.innerText = country.subregion;
    capital.innerText = country.capital?.[0];
    topLevelDomain.innerText = country.tld.join(", ");
    curency.innerText = country.currencies?.[0];
    language.innerText = country.languages?.[0];

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }
    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }
    if (country.currencies) {
      curency.innerText = Object.values(country.currencies)
        .map((curency) => curency.name)
        .join(", ");
    }
    if (country.languages) {
      language.innerText = Object.values(country.languages).join(", ");
    }

    if(country.borders){
     country.borders.forEach((border) =>{
          console.log(border);
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res)=>res.json())
          .then(([bordercountry])=>{
          // console.log(bordercountry);
          const bordercountryTag = document.createElement('a')
          bordercountryTag.innerText = bordercountry.name.common
          bordercountryTag.href=`country.html?name=${bordercountry.name.common}`
          borderCountry.append(bordercountryTag)
          })
     })
    }
  });

  themChangers.addEventListener('click', ()=>{
    document.body.classList.toggle('dark')
  })