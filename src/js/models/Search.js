

import easyHTTP from '../lib/easyHTTP';

const http = new easyHTTP;

const proxy = 'https://cors-anywhere.herokuapp.com/';
const key = '462b1cc8d4f2730081462fbc65136320';

export default class SearchRecipe {
  constructor(query) {
    this.query = query;
  }

  async getRecipe(){
    try {
      const res = await http.get(`${proxy}https://www.food2fork.com/api/search?key=${key}&  q=shredded%20${this.query}`);

      this.recipes = res;
      console.log(this.recipes)
    } catch(e) {
      alert(e)
    }
   
  }
  
}

