export default function getrefs() {
  return {
    input: document.querySelector('#searchCountries'),
    countryChoose: document.querySelector('.countries-container'),
    output: document.getElementById('result-container'),
    notification: document.querySelector('.notification'),
  };
}