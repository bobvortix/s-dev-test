var FlickrAPI = require('./FlickrAPI.js');
var mixinListeners = require('./mixinListeners.js');
var createFavourites = require('./createFavourites.js');

module.exports = function() {

  var itemsById = {};
  var model = { items: [] };
  
  mixinListeners(model, ['update', 'favourite', 'unfavourite', 'debug']);
  
  var favourites = createFavourites();
  
  model.notify('debug', 'Found ' + favourites.count() + ' stored favourite(s).');
  
  function createItem(item) {
    
    item.id = item.link;
    item.favourited = favourites.contains(item.id);
    return item;
  }
  
  function setTag(tag) {
    
    itemsById = [];
    model.items = [];

    model.notify('update', model);
    
    FlickrAPI.photosPublic(tag).then(function(data) {

      var items = data.items.map(createItem);
      model.items = items;
      model.items.forEach(function(item) { itemsById[item.id] = item; });      
      model.notify('update', model);
    });
  }
  
  function favourite(item) {
    item.favourited = true;
    favourites.add(item.id);
    model.notify('favourite', item.id);  
  }
  
  function unfavourite(item) {
    item.favourited = false;
    favourites.remove(item.id);
    model.notify('unfavourite', item.id);
  } 
  
  function toggle(itemId) {
    var item = itemsById[itemId];

    if (item.favourited)
      unfavourite(item);
    else
      favourite(item);
  }
  
  model.setTag = setTag;
  model.toggle = toggle;
  
  return model;
};