var mixinListeners = require('./mixinListeners.js');

module.exports = function(mount) {
  
  var view = {};
  
  var FAVOURITE_CLASS = 'photo--favourited';
  
  mixinListeners(view, ['toggle']);
  
  function createItemHtml(item) {
    return '<div class="grid__item grid__item--half grid__item--quarter@800">' +
        '<div class="photo ' + (item.favourited ? FAVOURITE_CLASS : '') + '" data-id="' + item.id + '">' +
          '<img class="photo__img" src="' + item.media.m + '"/>' +
        '</div>' +
      '</div>';
  }
  
  function handleClick(photo) {
    photo.addEventListener('click', function(e) {
      e.preventDefault();
      var id = photo.getAttribute('data-id');
      view.notify('toggle', id);
    });
  }
  
  function setModel(model) {
    
    /* 
     * This is really inefficient but easy to reason about.
     * A Virtual DOM with smart diffing (e.g. React) would be a good idea.
     */
    
    var html = '<div class="photos grid">';
    html += model.items.map(createItemHtml).join('');
    html += '</div>';
    
    mount.innerHTML = html;
    
    photos = Array.prototype.slice.call(mount.querySelectorAll('.photo'));
    photos.forEach(handleClick);
  }
  
  function findItem(itemId) {
    return mount.querySelector('[data-id="' + itemId + '"]');
  }
  
  function favourite(itemId) {
    console.log('**** Favourite ' + itemId);
    var item = findItem(itemId);
    item.classList.add(FAVOURITE_CLASS);
  }
  
  function unfavourite(itemId) {
    console.log('**** Unfavourited ' + itemId);
    var item = findItem(itemId);
    item.classList.remove(FAVOURITE_CLASS);
  }
  
  view.setModel = setModel;
  view.favourite = favourite;
  view.unfavourite = unfavourite;
  
  return view;
};