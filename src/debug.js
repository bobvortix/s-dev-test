module.exports = function(model, view) {

  var debugView = require('./createDebugView')(document.getElementById('debug'));
  
  debugView.log('Welcome to Flickr Favourites. Debug messages will appear below...<br/>');
  
  model
    .on('loading', function() {
      debugView.log('Loading...');
    })
    .on('update', function(model) {
      debugView.log('Update ' + model.items.length + ' item(s)');
    })
    .on('favourite', function(itemId) {
      debugView.log('Favourited ' + itemId);
    })
    .on('unfavourite', function(itemId) {
      debugView.log('Unfavourited ' + itemId);
    })
    .on('debug', debugView.log);
  
  view.on('toggle', function(photoId) {
    debugView.log('Toggled ' + photoId);
  });
};