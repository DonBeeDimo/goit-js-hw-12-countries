import '../sass/main.scss';
import getRefs from './get-rafs';
import fetchCountries from './fetch';
import countryItemsTemplate from '../templates/countryItem.hbs';
import countriesListTemplate from '../templates/countriesList.hbs';
import error from './pnotify';
import debounce from 'lodash.debounce';

const refs = getRefs();

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
});

refs.searchForm.addEventListener('input', debounce(e => {
    onSearch(e);
  }, 500),
 );

 function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.target.value;

    if (!searchQuery) {      
      clearListItems();
      return;
    }

    clearListItems();

      fetchCountries(searchQuery).then(data =>{
        const markup = buildItemMarkup(data);
        const renderCountryList = buildCountriesList(data);
        if(!data) {
          return;
        } else if (data.length > 10) {
          clearListItems();
          const message = 'Найдено слишком много совпадений, уточните ваш запрос'
          error({
            title: 'Ошибка',
            text: message,
            delay: 2000,
          });
        } else if (data.length >= 2 && data.length <= 10) {
          insertListItem(renderCountryList);
        } else if (data.length === 1) {
          insertListItem(markup);
        } else {
          alert('Ничего не найдено.Корректно введите запрос')
        }  
      })  
  }

  function insertListItem(items) {
    refs.countryList.insertAdjacentHTML('beforeend', items);
  }

  function buildCountriesList(items) {
    return countriesListTemplate(items);
  }

  function buildItemMarkup(items) {
  return countryItemsTemplate(items);
}

  function clearListItems() {
    refs.countryList.innerHTML = '';
  }