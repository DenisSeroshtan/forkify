// Global app controller

import {elem} from './views/base';
import Search from './models/Search';
import * as viewSearch from './views/searchView';

const state = {};

async function controlSearch() { 
 
  const search = new Search(viewSearch.getValueSearch());

  viewSearch.clearFieldSearch();
  viewSearch.clearListResult();

  state.search = search;
  
  await state.search.getRecipe();
  viewSearch.renderResult(state.search.result);
  
}

elem.form.addEventListener('submit', e => {
  e.preventDefault();

  controlSearch();
});

 
