var mixinListeners = require('./mixinListeners.js');

module.exports = function(mount) {
  
  var view = {};
  
  mixinListeners(view, ['toggle']);
  
  function createItemHtml(item) {
    return '<div class="grid__item grid__item--half grid__item--quarter@800">' +
        '<div class="photo ' + (item.selected ? 'photo--selected' : '') + '" data-id="' + item.id + '">' +
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
  
  view.setModel = setModel;
  
  return view;
};