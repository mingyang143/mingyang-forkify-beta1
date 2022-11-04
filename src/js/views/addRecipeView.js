import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded!'

  constructor(){
    super()
    this._addHandlerShowWindow();
    this._addHandlerRemoveWindow();
  }

  toggleform(){
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow(){
    this._btnOpen.addEventListener('click',this.toggleform.bind(this));
  }
  _addHandlerRemoveWindow(){
    this._btnClose.addEventListener('click',this.toggleform.bind(this));
    this._overlay.addEventListener('click',this.toggleform.bind(this));
  }
  _addHandlerUpload(handler){
    this._parentElement.addEventListener('submit',function(e){
        e.preventDefault()
        const dataArray = [...new FormData(this)]
        handler(Object.fromEntries(dataArray))
    })
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
