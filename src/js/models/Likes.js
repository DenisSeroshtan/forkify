export default class Likes {
  constructor() {
    this.recipes = []
  }

  addRecipesLikes({id, author, title, img}) {
    const item = {
      id,
      author,
      title,
      img
    }

    this.recipes.push(item);
    
    this.setStorage();
    return item;
  }

  deleteRecipesLikes(id) {
    const index = this.recipes.findIndex((recipe) => recipe.id == id );
    this.recipes.splice(index, 1);
    this.setStorage();
  }

  isLiked(id) {
    return this.recipes.findIndex(recipe => recipe.id == id) !== -1 
  }
  
  setStorage() {
    localStorage.setItem('likes', JSON.stringify(this.recipes));
  }

  getStorage() {
    const likeRecipe = JSON.parse(localStorage.getItem('likes'));

    if(likeRecipe) this.recipes = likeRecipe;
  }
}