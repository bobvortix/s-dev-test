require('es6-promise').polyfill();

var createPhotosModel = require('./createPhotosModel.js');
var createPhotosView = require('./createPhotosView.js');

var mount = document.getElementById('app');
var model = createPhotosModel();
var view = createPhotosView(mount);

model.on('update', view.setModel);

view.on('toggle', function(photoId) {
  model.toggle(photoId);
});

document
  .querySelector('#search-form')
  .addEventListener('submit', function(e) {
    e.preventDefault();
    model.setTag(document.querySelector('#text-input').value);
  }
);

function debug() {
  var debugView = require('./createDebugView.js')(document.getElementById('debug'));
  
  model.on('update', function(model) {
    debugView.log('Update ' + model.items.length + ' item(s)');
  });
  
  model
    .on('debug', debugView.log)
    .on('debug', function(text) {
      console.log(text);
    });
  
  view.on('toggle', function(photoId) {
    debugView.log('Toggled ' + photoId);
  });
}

debug();