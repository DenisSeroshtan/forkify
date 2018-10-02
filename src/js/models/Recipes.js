import easyHTTP from '../lib/easyHTTP';
import {proxy,key} from '../config';

const http = new easyHTTP;

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {

    try {

        const res = await http.get(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);

        const recipe = res.recipe;
        this.title = res.recipe.title;
        this.author = res.recipe.publisher;
        this.img = res.recipe.image_url;
        this.url = res.recipe.source_url;
        this.ingredients = res.recipe.ingredients;

    } catch(e) {
      console.log(e)
      alert('Something went wrong...')
    }
  
  }

  calcTime() {
    const ing = this.ingredients.length;
    this.time = Math.ceil(ing/3) * 15 
   }

  calcServings() {
    this.servings = 4;
  }
}