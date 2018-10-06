// Global app controller

import {elem, renderLoader, clearLoader} from './views/base';
import Search from './models/Search';
import * as viewSearch from './views/searchView';
import Recipe from './models/Recipes';

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
  const rec = new Recipe();
  rec.parseIngredients();
  console.log(
    rec.ingredients
  )
  const id = window.location.hash.replace("#", '')

  if(id) {

    try {
      state.recipe = new Recipe(id);
      await state.recipe.getRecipe();
    } catch (e) {
      alert('fail processing get recipe...');
    }
      
  }
 
}

// const recipe = new Recipe(47746);

// recipe.getRecipe();

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))