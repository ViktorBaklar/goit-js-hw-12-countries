import { error, success } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

function onNotFoundError() {
  error({
    text: 'Country not found. Please try again!',
    delay: 1500,
  });
}

function onTooManyError() {
  error({
    text: 'Too many matches. Please enter more letters!',
    type: 'error',
    delay: 1500,
  });
}

function onSuccess(searchResult) {
  success({
    text: `Was found ${searchResult.length} countries. Select from the list`,
    delay: 1500,
  });
}

export default { onTooManyError, onSuccess, onNotFoundError };