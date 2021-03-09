export default function getrefs() {
  return {
    body: document.querySelector('body'),
    input: document.querySelector('#searchCountries'),
    spinner: document.querySelector('.countries-container'),
    output: document.getElementById('container'),
    notification: document.querySelector('.notification'),
  };
}