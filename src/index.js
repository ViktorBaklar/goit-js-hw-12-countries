import './styles.css';
import countriesListTpl from './templates/countriesList.hbs';
import countryCardTpl from './templates/countryCard.hbs';
import API from './js/fetchCountries';
import { debounce } from 'lodash';
import notice from './js/notifications';
import getRefs from './js/get-refs';

const refs = getRefs();

let furtherSearchQuery = '';

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();
  refs.spinner.classList.remove('is-hidden');
  refs.output.innerHTML = '';
  const searchQuery = event.target.value.trim();

  if (searchQuery === '') {
    refs.spinner.classList.add('is-hidden');
    return;
  }

  API.fetchCountriesList(searchQuery).then(data => {
    // console.log(data);
    if (!data) return;
    if (data.length > 10) {
      notice.onTooManyError();
      console.warn('more than 10 items');
      return;
    }

    if (data.length > 1) {
      renderCountriesList(data);
      notice.onSuccess(data);
      refs.output.addEventListener('click', onListClick);
    }

    if (data.length === 1) {
      renderCountryCard(data);
    }
    if (data.length === 0) {
      console.log(data);
      return;
    }
  });
}

function onListClick(event) {
  furtherSearchQuery = event.target.textContent;
  API.fetchCountriesList(furtherSearchQuery).then(renderCountryCard);
  refs.output.removeEventListener('click', onListClick);
}

function renderCountriesList(listData) {
  refs.output.innerHTML = countriesListTpl(listData);
}

function renderCountryCard(countryData) {
  refs.output.innerHTML = countryCardTpl(countryData);
  refs.input.value = '';
  refs.output.removeEventListener('click', onListClick);
}