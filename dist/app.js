(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var jsonpId = 0;
var baseUrl = 'http://api.flickr.com/services/feeds/';

function generateCallback(fn) {
  var name = 'flickrjsonp_' + (jsonpId++);
  window[name] = function(data) {
    fn(data);
  };
  return name;
}

function buildQueryPrefix(path) {
  return (path.indexOf('?') === -1) ? '?' : '&';
}

function buildSrc(path, name) {
  return baseUrl + path + buildQueryPrefix(path) + 'format=json&jsoncallback=' + name;
}

function requestJsonp(path, fn) {
  var name = generateCallback(fn);
  var script = document.createElement('script');
  script.src = buildSrc(path, name);
  document.head.appendChild(script);
}

module.exports = {
  
  photosPublic: function(tags, callback) {
    return requestJsonp('/photos_public.gne?tags=' +  tags, callback);
  }
  
};
},{}],2:[function(require,module,exports){
var createPhotosModel = require('./createPhotosModel.js');
var createPhotosView = require('./createPhotosView.js');

var mount = document.getElementById('app');
var model = createPhotosModel({tag: 'tomato'});
var view = createPhotosView(mount);

model.on('update', view.setModel);
},{"./createPhotosModel.js":3,"./createPhotosView.js":4}],3:[function(require,module,exports){
var FlickrAPI = require('./FlickrAPI.js');

module.exports = function(opts) {
  
  var tag = opts.tag || 'london';
  var items = [];
  var listeners = { update: [] };
  
  FlickrAPI.photosPublic(tag, function(data) {
    
    

    fire('update', data);
  });
  
  function fire(name, data) {
    if (listeners[name])
      listeners[name].map(function(fn) { fn(data); });
  }
  
  return {
    
    on: function(name, cb) {
      if (listeners[name] && listeners[name].indexOf(cb) === -1)
        listeners[name].push(cb);
    }
    
  };
};
},{"./FlickrAPI.js":1}],4:[function(require,module,exports){
module.exports = function(mount) {
  
  function setModel(model) {
    
    console.log('Setting the view model');
    console.log(model);
    
  }
  
  // var photoEl = document.createElement('div');
  // 
  // photoEl.innerText = 'HELLO';
  // 
  // mount.appendChild(photoEl);
  
  return {
    
    setModel: setModel
  };
};
},{}]},{},[2]);
