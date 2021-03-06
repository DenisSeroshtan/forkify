

import easyHTTP from '../lib/easyHTTP';
import {proxy , key} from '../config'

const http = new easyHTTP;

export default class SearchRecipe {
  constructor(query) {
    this.query = query;
  }

  async getRecipe(){
    try {
      const res = await http.get(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.recipes;
    } catch(e) {
      alert(e)
    }
   
  }
  
}

