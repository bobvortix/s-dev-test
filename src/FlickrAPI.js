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
    return new Promise(function(resolve) {
      requestJsonp('/photos_public.gne?tags=' +  tags, resolve);
    });
  }
  
};