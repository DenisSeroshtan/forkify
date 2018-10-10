export const elem = {
  form : document.querySelector('.search'),
  inputSearch: document.querySelector('.search__field'),
  result: document.querySelector('.results'),
  resultRec: document.querySelector('.results__list'),
  buttonNav: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopList: document.querySelector('.shopping__list')
}
export const elementLoader = {
  loader: "loader"
}
export const renderLoader = parent => {
  const svg = `
    <div class="${elementLoader.loader}">
      <svg>
        <use href='img/icons.svg#icon-cw'></use>
      </svg>
    </div>
  `
  parent.insertAdjacentHTML('afterbegin', svg);

}

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementLoader.loader}`);

  if(loader) {
    loader.parentElement.removeChild(loader);
  }
}