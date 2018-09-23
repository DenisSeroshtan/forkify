

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
      const res = await http.get(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);

      // const result = res;
      // console.log(res.recipes);
      this.result = res.recipes;

    } catch(e) {
      alert(e)
    }
   
  }
  
}

