// Global app controller

import {elem, renderLoader, clearLoader} from './views/base';
import Search from './models/Search';
import * as viewSearch from './views/searchView';
import Recipe from './models/Recipes';
import * as viewRecipe from './views/recipeView';
import List from './models/List';
import * as shopView from './views/shopView';

const state = {};

async function controlSearch() { 
  
  try {
    const search = new Search(viewSearch.getValueSearch());

    viewSearch.clearFieldSearch();
    viewSearch.clearListResult();
    renderLoader(elem.result);

    state.search = search;

    await state.search.getRecipe();
    clearLoader();
    viewSearch.renderResult(state.search.result);
    
  } catch(e) {
    alert('fail processing get recipes...');
    clearLoader();
  }
  
  
}
// search recipes
elem.form.addEventListener('submit', e => {
  e.preventDefault();

  controlSearch();
});
//pagination
elem.buttonNav.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  const goTo = parseInt(btn.dataset.goto, 10);
  if(btn) {
    viewSearch.clearListResult();
    viewSearch.renderResult(state.search.result, goTo);
  }
}) 

//////
// Recipe controller 
//////

const controlRecipe = async () => {
  
  viewRecipe.clearRecipe();

  const id = window.location.hash.replace("#", '')

  if(id) {

    if(state.recipe) viewSearch.highlighSelected(id)
    try {
      renderLoader(elem.recipe);

      state.recipe = new Recipe(id);
      await state.recipe.getRecipe();
      
      state.recipe.calcTime();
      state.recipe.calcServings();
      state.recipe.parseIngredients();

      clearLoader();
      viewRecipe.renderRecipe(state.recipe);

      
    } catch (e) {
      clearLoader();
      alert('fail processing get recipe...');
    }
      
  }
 
} 
//////
// List controller 
//////

const controlList = () => {
  if(state.recipe) state.list = new List();
  console.log(state)
  state.recipe.ingredients.forEach(ing => {
    const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
    shopView.renderShopItem(item);
  })

}

//////
//events
//////

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elem.recipe.addEventListener('click', e => {
  if(e.target.matches('.btn-plus, .btn-plus *')) {
   
      state.recipe.updateServings('+');
      viewRecipe.updateViewRecipe(state.recipe);
    
    
  } else if(e.target.matches('.btn-minus, .btn-minus *')) {
    if (state.recipe.servings > 0) {
      state.recipe.updateServings('-');
      viewRecipe.updateViewRecipe(state.recipe);
    }
  } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList()
  }
});


elem.shopList.addEventListener('click', e => {
  const item = e.target.closest('.shopping__item')
  const id = item.dataset.shopid;
  if (e.target.matches('.btn-tiny, .btn-tiny *')) {
    
    state.list.deleteItem(id);
    shopView.deleteShopItem(id);

  } else if (e.target.matches('.shopping__count-value')) {

    const val = parseFloat(e.target.value);    
    state.list.updateItem(id, val);

  }
})

