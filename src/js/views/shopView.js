import {elem} from './base';

export const renderShopItem = item => {
  const markup = `
    <li class="shopping__item" data-shopid=${item.id}>
      <div class="shopping__count">
          <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
          <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.ingredient}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
    </li>
  `
  elem.shopList.insertAdjacentHTML('beforeend', markup);
}

export const deleteShopItem = id => {
  const item = document.querySelector(`[data-shopid="${id}"]`);

  item.parentElement.removeChild(item);
}
