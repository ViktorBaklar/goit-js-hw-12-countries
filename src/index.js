import './styles.css';
import selectListTpl from './templates/selectList.hbs';
import countryCardTpl from './templates/countryCard.hbs';
import API from './js/fetchCountries';
import { debounce } from 'lodash';
import notice from './js/notifications';
import getRefs from './js/get-refs';

const refs = getRefs();

let SearchSelectList = '';

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();
  refs.countryChoose.classList.remove('is-hidden');
  refs.output.innerHTML = '';
  const searchSelect = event.target.value.trim();
  if (!searchSelect) {
    return;
  }

  API.fetchCountriesList(searchSelect).then(data => {
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
  SearchSelectList = event.target.textContent;
  API.fetchCountriesList(SearchSelectList).then(renderCountryCard);
  refs.output.removeEventListener('click', onListClick);
}

function renderCountriesList(listData) {
  refs.output.innerHTML = selectListTpl(listData);
}

function renderCountryCard(countryData) {
  refs.output.innerHTML = countryCardTpl(countryData);
  refs.input.value = '';
  refs.output.removeEventListener('click', onListClick);
}