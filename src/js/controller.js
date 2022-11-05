import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

const controlRecipes = async function () {
  try {
    resultsView.update(model.getSearchResultsPage())
    
    const id = window.location.hash.slice(1)
    if (!id) return;
    // 1) Loading recipe
    
    recipeView.renderSpinner()
    await model.loadRecipe(id)
    // 2) Rendering recipe
    recipeView.render(model.state.recipe)
    bookmarksView.update(model.state.bookmarks);
    
  } catch (err) {
    console.log(err)
    recipeView.renderError();

  }
};

const controlSearchResults = async function(){
  try{
  const query = searchView.getQuery();
  if (!query) return;
  resultsView.renderSpinner()
  await model.loadSearchResults(query);
  resultsView.render(model.getSearchResultsPage(1));
  //render initial pagination button
  paginationView.render(model.state.search)
  }
  catch(err){
    console.log(err)
  }
}

const controlPagination = function(goToPage){
  resultsView.render(model.getSearchResultsPage(goToPage))
  paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  //Update the recipe servings (in state)
  model.updateServings(newServings)
  // Update the recipe view
  recipeView.update(model.state.recipe)
}
const controlAddBookmark = function(){
  //add/remove bookmark
  if (!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }
  else{
    model.removeBookmark(model.state.recipe.id)
  }
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks)
 
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe){
  try{
    //show loading spinner
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage()
    bookmarksView.render(model.state.bookmarks)
    window.history.pushState(null,'',`#${model.state.recipe.id}`)
    //close form window
    setTimeout(function(){
      addRecipeView.toggleform()
      window.location.reload();
    },MODAL_CLOSE_SEC*1000)
    
  }catch(err){
    
    addRecipeView.renderError(err.message)
  }
}
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView._addHandlerUpload(controlAddRecipe)

}
init()
if (module.hot){
  module.hot.accept();
}

