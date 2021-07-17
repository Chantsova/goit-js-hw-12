import "./css/styles.css";
import debounce from "lodash/debounce";
import Notiflix from "notiflix";
import { fetchCountries } from './js/fetchCountries.js';
import countryMarkup from './templates/country.hbs';
import counriesMarkup from './templates/countries.hbs';


Notiflix.Notify.init({ width: "400px", position: "right-bottom", fontSize: "17px", });

const DEBOUNCE_DELAY = 800;
const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryContentEl: document.querySelector('.country-info'),
  languagesListEl: document.querySelector('.country_languages')
};

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const value = e.target.value;
  refs.countryContentEl.innerHTML = '';
  refs.countryListEl.innerHTML = '';

  if (value.trim('') === '') {
    return;
  }
 
  fetchCountries(value)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (countries.length === 1) {
        fullDescriptionCountry(countries[0]);
      }
      if (countries.length >= 2 && countries.length <= 10) {
        shortListCountries(countries);
      }
    })
  .catch(err => console.log("Error404"))
}
 
function fullDescriptionCountry(...countries) {
  const markup = countryMarkup(countries[0]);
  const countryLanguage = countries[0].languages;
  const languagesList = (countryLanguage.map(language => language.name).join(', '));
  const languagesMarkup = `<p class="country_detail">Languages: ${languagesList} </p>`;
  refs.countryContentEl.insertAdjacentHTML('afterbegin', languagesMarkup);
  refs.countryContentEl.insertAdjacentHTML('afterbegin', markup);
}
  
function shortListCountries(countries) {
  const markup = counriesMarkup(countries);
  refs.countryListEl.insertAdjacentHTML('afterbegin', markup);
}