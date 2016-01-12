require('es6-promise').polyfill();

var createPhotosModel = require('./createPhotosModel.js');
var createPhotosView = require('./createPhotosView.js');

var mount = document.getElementById('app');
var model = createPhotosModel({tag: 'london'});
var view = createPhotosView(mount);

model.on('update', view.setModel);