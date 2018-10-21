import {elem} from './base';
import {limitRicipeTitle} from './searchView';

export const renderLikes = likes => {
  const markup = `
      <li>
          <a class="likes__link" href="#${likes.id}">
              <figure class="likes__fig">
                  <img src="${likes.img}" alt="Test">
              </figure>
              <div class="likes__data">
                  <h4 class="likes__name">${limitRicipeTitle(likes.title)}</h4>
                  <p class="likes__author">${likes.author}</p>
              </div>
          </a>
      </li>
    `
  elem.likesList.insertAdjacentHTML('beforeend', markup);
}
export const changeBtn = (type) => {
  const icon = type ? 'icon-heart' : "icon-heart-outlined";
  
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${icon}`)
  
}

export const deleteLikes = id => {
  const like = document.querySelector(`.likes__link[href="#${id}"]`);

  like.parentElement.removeChild(like);
}

export const showLike = (likes) => {
  elem.likes.style.visibility = (likes.length > 0) ? 'visible' : 'hidden';
}