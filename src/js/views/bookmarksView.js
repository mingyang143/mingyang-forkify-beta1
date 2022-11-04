import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No recipes found for your query! Please try again! ;)';
  _message = '';
  addHandlerRender(handler){
    window.addEventListener('load',handler)
  }
  _generateMarkup() {
    return this._data.map(bookmark=>previewView.render(bookmark,false)).join('')
    // return this._data
    //   .map(rec => {
    //     return `
    //         <li class="preview">
    //             <a class="preview__link ${
    //               window.location.hash.slice(1) === rec.id
    //                 ? 'preview__link--active'
    //                 : ''
    //             }" href="#${rec.id}">
    //             <figure class="preview__fig">
    //                 <img src="${rec.image}" alt="${rec.title}" />
    //             </figure>
    //             <div class="preview__data">
    //                 <h4 class="preview__title">${rec.title}</h4>
    //                 <p class="preview__publisher">${rec.publisher}</p>
    //             </div>
    //             </a>
    //         </li>
    //     `;
    //   })
    //   .join('');
  }
}

export default new BookMarksView();
