import Notiflix from "notiflix";

function fetchCountries(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
      if (response.ok === true) {
        return response.json();
      }
      if (response.ok === false) {
        throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name!"));
      }
    })
}

export { fetchCountries }