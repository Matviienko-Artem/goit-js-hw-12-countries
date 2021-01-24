import './styles.css';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import fetchCountryByName from './js/fetchCountries';
import getRefs from './js/get-refs.js';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const refs = getRefs();

refs.searchFormInput.addEventListener('input', _.debounce(searchCountry, 500));

function searchCountry(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const searchQuery = refs.searchFormInput.value;

  fetchCountryByName(searchQuery)
    .then(renderCountryList)
    .catch(error => console.log(error));
}

function renderCountryList(countryies) {
  refs.cardForCountry.innerHTML = '';

  if (countryies.length === 1) {
    const oneCountry = countryCardTpl(countryies);
    refs.cardForCountry.innerHTML = oneCountry;
  } else if (countryies.length < 10) {
    const manyCountries = countryListTpl(countryies);
    refs.cardForCountry.innerHTML = manyCountries;
  } else {
    alert({
      title: `Найдено ${countryies.length} стран`,
      text: 'Пожалуйста введите более точную информацию',
      shadow: true,
      delay: 3000,
      width: '500px',
      styling: 'material',
    });
  }
}
