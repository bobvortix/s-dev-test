require('es6-promise').polyfill();

var createPhotosModel = require('./createPhotosModel.js');
var createPhotosView = require('./createPhotosView.js');

var mount = document.getElementById('app');
var model = createPhotosModel();
var view = createPhotosView(mount);

model
  .on('update', view.setModel)
  .on('favourite', view.favourite)
  .on('unfavourite', view.unfavourite);
view.on('toggle', model.toggle);

// Would refactor out into its own view given more time
document
  .querySelector('#search-form')
  .addEventListener('submit', function(e) {
    e.preventDefault();
    model.setTag(document.querySelector('#text-input').value);
  }
);

function debug() {
  var debugView = require('./createDebugView.js')(document.getElementById('debug'));
  
  model
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
}

debug();