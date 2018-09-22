import {elem} from './base'
console.log(elem)
export const getValueSearch = () => elem.inputSearch.value;

export const clearFieldSearch = () => elem.inputSearch.value = '';

export const clearListResult = () => elem.resultRec.innerHTML = '';

const templeteItem = (query) => {
  const markup = `<li>
      <a class="results__link results__link--active" href="#${query.recipe_id}">
          <figure class="results__fig">
              <img src="${query.image_url}" alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${query.title}</h4>
              <p class="results__author">${query.publisher}</p>
          </div>
      </a>
    </li>`
    elem.resultRec.insertAdjacentHTML('beforeend', markup);
}

export const renderResult = (queries) => {
  queries.forEach(query => templeteItem(query))
}
