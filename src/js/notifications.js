import { error, success } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

function onNotFoundError() {
  error({
    text: 'There is no such country. Please try another search!',
    delay: 4000,
  });
}

function onTooManyError() {
  error({
    text: 'Too many items found. Please enter a more specific query!',
    type: 'error',
    delay: 4000,
  });
}

function onSuccess(searchResult) {
  success({
    text: `Your search found ${searchResult.length} countries. Click on any item in the list to see the country card`,
    delay: 4000,
  });
}

export default { onTooManyError, onSuccess, onNotFoundError };