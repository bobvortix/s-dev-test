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