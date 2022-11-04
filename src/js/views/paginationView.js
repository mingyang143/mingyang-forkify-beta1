import View from "./View.js";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')

    _generateMarkupButton(numPages){
      //Page 1, and there are other pages
      if (this._data.page === 1 && numPages > 1) {
        return `
          <button data-goto="${
            this._data.page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
      }

      //Last page
      if (this._data.page === numPages && numPages > 1) {
        return `
          <button data-goto="${
            this._data.page - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
        `;
      }
      //Other page
      if (this._data.page < numPages) {
        return `
          <button data-goto="${
            this._data.page - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          <button data-goto="${
            this._data.page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
      }
      //page 1, and there are NO other pages

      return ``;
    }
    
    _generateMarkup(){
      const numPages = Math.ceil(
        this._data.results.length / this._data.resultsPerPage
      );
      return this._generateMarkupButton(numPages)

      
    }
    addHandlerClick(handler){
        this._parentElement.addEventListener('click',function(e){
            console.log(e)
            console.log(this)
            const btn = e.target.closest('.btn--inline');
            console.log(btn)
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage)
        })
    }
}

export default new PaginationView()