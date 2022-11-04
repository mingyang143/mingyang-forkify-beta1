import View from "./View.js";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';



 
class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;))'
    _message = '';
    _generateMarkup(){
        //return previewView.render(this._data,false) (debbugging issue why can't this work???)
        return this._data.map(result=>previewView.render(result,false)).join('')
        // return this._data.map((rec)=>{
        //     return `
        //     <li class="preview">
        //         <a class="preview__link ${window.location.hash.slice(1)===rec.id?'preview__link--active':''}" href="#${rec.id}">
        //         <figure class="preview__fig">
        //             <img src="${rec.image}" alt="${rec.title}" />
        //         </figure>
        //         <div class="preview__data">
        //             <h4 class="preview__title">${rec.title}</h4>
        //             <p class="preview__publisher">${rec.publisher}</p>
        //         </div>
        //         </a>
        //     </li>
        // `;
        // }).join('')
        
        
    }
}

export default new ResultsView()