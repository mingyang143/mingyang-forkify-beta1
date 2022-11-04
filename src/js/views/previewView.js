import View from "./View.js";
import icons from 'url:../../img/icons.svg';
class PreviewView extends View {
  _parentElement = document.querySelector('*');
  _generateMarkup() {
    return `
            <li class="preview">
                <a class="preview__link ${
                  window.location.hash.slice(1) === this._data.id
                    ? 'preview__link--active'
                    : ''
                }" href="#${this._data.id}">
                <figure class="preview__fig">
                    <img src="${this._data.image}" alt="${this._data.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${this._data.title}</h4>
                    <p class="preview__publisher">${this._data.publisher}</p>
                    <div class="preview__user-generated ${this._data.key?'':'hidden'}">
                        <svg>
                        <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>
                </div>
                </a>
            </li>
        `;

    //(debbugging issue why can't this work???) 
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

export default new PreviewView()