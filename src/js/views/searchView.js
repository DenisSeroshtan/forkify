import {elem} from './base';

export const getValueSearch = () => elem.inputSearch.value;

export const clearFieldSearch = () => elem.inputSearch.value = '';

export const clearListResult = () => {
    elem.resultRec.innerHTML = '';
    elem.buttonNav.innerHTML = '';
}
export const highlighSelected = id => {
    const recipesLink = document.querySelector(`.results__link[href*="${id}"]`);
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    
    if(!recipesLink || !resultsArr) return;

    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    recipesLink.classList.add('results__link--active');
}
export const limitRicipeTitle = (title, limit = 17) => {
    if(title.length >= limit) {
        let newTitle = [];

        title.split(' ').reduce((acc, word) => {

            if(word.length + acc <= limit) {
                newTitle.push(word)
            }
            return word.length + acc
        }, 0) 

        return title = `${newTitle.join(' ')}...`

    }
    return title
}

const templeteItem = (query) => {
  const markup = `<li>
      <a class="results__link results__link--active" href="#${query.recipe_id}">
          <figure class="results__fig">
              <img src="${query.image_url}" alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRicipeTitle(query.title)}</h4>
              <p class="results__author">${query.publisher}</p>
          </div>
      </a>
    </li>`
    elem.resultRec.insertAdjacentHTML('beforeend', markup);
}
const createButton = (type, numPage) => {
    const button =  `
        <button class = "btn-inline results__btn--${type == 'prev' ? 'prev' : 'next'}"
            data-goto = "${type ==='prev' ? numPage - 1 : numPage + 1}">
            <span> Page ${type ==='prev' ? numPage - 1 : numPage + 1}</span> 
            <svg class = "search__icon">
                <use href = "img/icons.svg#icon-triangle-${type == 'prev' ? 'left' : 'right'}"></use>
            </svg> 
        </button>
    `
    return button;

}

const renderButton = (page, numResult , limitResultRec) => {

    const pages = Math.ceil(numResult/limitResultRec);
    let button;
    if(page === 1 && pages > 1) {
        button = createButton('next', page )
    } else if(page < pages) {
        button = `${createButton('prev', page)}
            ${createButton("next", page)}
        `
    } else if (page === pages && pages > 1) {
        button = createButton('prev', page)
    }

    elem.buttonNav.insertAdjacentHTML("afterbegin", button)

}

export const renderResult = (queries, page = 1, limitResultRec = 10) => {

    const start = (page - 1) * limitResultRec;
    const end = page * limitResultRec;

  queries.slice(start, end).forEach(query => templeteItem(query))
  renderButton(page, queries.length, limitResultRec);
}
