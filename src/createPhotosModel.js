var FlickrAPI = require('./FlickrAPI.js');
var mixinListeners = require('./mixinListeners.js');
var createFavourites = require('./createFavourites.js');

module.exports = function() {

  var itemsById = {};
  var model = { items: [] };
  
  mixinListeners(model, ['update', 'debug']);
  
  var favourites = createFavourites();
  
  model.notify('debug', 'Found ' + favourites.count() + ' stored favourite(s).');
  
  function createItem(item) {
    item.id = item.link;
    item.selected = favourites.indexOf(item.id) !== -1;
    return item;
  }
  
  function setTag(tag) {
    
    itemsById = [];
    model.items = [];

    model.notify('update', model);
    
    FlickrAPI.photosPublic(tag).then(function(data) {
      model.items = data.items.map(createItem);
      model.items.forEach(function(item) { itemsById[item.id] = item; });
      model.notify('update', model);
    });
  }
  
  function select(item) {
    item.selected = true;
    favourites.add(item.id);
    model.notify('debug', 'Favourited ' + item.id);
  }
  
  function deselect(item) {
    item.selected = false;
    favourites.remove(item.id);
    model.notify('debug', 'Unfavourited ' + item.id);
  } 
  
  function toggle(itemId) {
    var item = itemsById[itemId];

    if (item.selected)
      deselect(item);
    else
      select(item);

    model.notify('update', model);
  }
  
  model.setTag = setTag;
  model.toggle = toggle;
  
  return model;
};