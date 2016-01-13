require('es6-promise').polyfill();

var createPhotosModel = require('./createPhotosModel');
var createPhotosView = require('./createPhotosView');
var createFormView = require('./createFormView');

var mount = document.getElementById('app');
var model = createPhotosModel();
var view = createPhotosView(mount);
var formView = createFormView();

model
  .on('loading', view.setLoading)
  .on('update', view.setModel)
  .on('favourite', view.favourite)
  .on('unfavourite', view.unfavourite);

view.on('toggle', model.toggle);

formView.on('submit', model.setTag);

require('./debug')(model, view);