import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import countryMarkup from './templates/country.hbs';
import counriesMarkup from './templates/countries.hbs';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryContentEl: document.querySelector('.country-info'),
  languagesList: document.querySelector('.country_languages')
};

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const value = e.target.value;
 
  fetchCountries(value)
    .then(countries => {
      refs.countryContentEl.innerHTML = '';
      refs.countryListEl.innerHTML = '';

      if (countries.length > 10) {
        console.log('aaaa');
      }
      if (countries.length === 1) {
        fullDescriptionCountry(countries[0]);
      }
      if (countries.length >= 2 && countries.length <= 10) {
        shortListCountries(countries);
      }
    })
          
    .catch(error => console.log(error))
}
 
function fullDescriptionCountry(...countries) {
  const markup = countryMarkup(...countries);
  console.log(...countries)
  //const countryLanguages = `<li>${languages.name}</li>`
  //refs.languagesList.insertAdjacentHTML('beforeend', countryLanguages)
  return refs.countryContentEl.innerHTML = markup;  
}
  
function shortListCountries(countries) {
  
  const markup = counriesMarkup(countries);
  return refs.countryListEl.innerHTML = markup;
}


//const languages = (`${languages}`).map(languages => language.name).join(', ')