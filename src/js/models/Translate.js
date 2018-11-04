import easyHTTP from '../lib/easyHTTP';
import {
  translateKey
} from '../config';

const http = new easyHTTP;

export default class translateSearch {
  constructor(recipe) {
    this.recipe = recipe;
  }
  async getTranslate() {
    try {
        const translatedWord = await http.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=ru-en&key=${translateKey}&text=${this.recipe}`)
        
        this.translateSearch = translatedWord.text[0];
    } catch(e) {
      alert(e)
    }
    
  }
}