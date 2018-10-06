import easyHTTP from '../lib/easyHTTP';
import {proxy,key} from '../config';

const http = new easyHTTP;

export default class Recipe {
  constructor(id) {
    this.id = id;
    this.ingredients = ["1 pizza dough", "1/2 cups sweet chili sauce", "1 cups cooked chicken, cut bite sized pieces", "1/2 red bell pepper, sliced", "1 carrot, julienned", "1 handful bean sprouts", "2 green onions, sliced", "1 cup mozzarella cheese, shredded", "1 handful roasted peanuts, chopped (optional)", "1 handful basil, chopped (optional)", "1 handful cilantro, chopped (optional)"]
  }

  async getRecipe() {

    try {

        const res = await http.get(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);

        const recipe = res.recipe;
        this.title = res.recipe.title;
        this.author = res.recipe.publisher;
        this.img = res.recipe.image_url;
        this.url = res.recipe.source_url;
        // this.ingredients = res.recipe.ingredients;
   

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

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    // универсальные меры 
    const newIngredients = this.ingredients.map(item => {

      let ingredient = item.toLowerCase();

      unitsLong.forEach((unit,i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      })
      // удаляем скобки
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
      
      const arrIng = ingredient.split(' '); 
      
      const unitIndex = arrIng.findIndex(el => unitsShort.includes(el))

      let objIng = null; 

      if(unitIndex > -1) {
        let count;
        const arrCount = arrIng.slice(0, unitIndex);
        if(arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'))
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'))
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }

      } else if(parseInt(arrIng[0],10)) {
        // Это не часть, первый эл-т число 
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }

      } else if(unitIndex === -1) {
        objing = {
          count: 1, 
          unit: '',
          ingredient
        }
      }
       
      return objIng;

    });
    this.ingredients = newIngredients
  }
}