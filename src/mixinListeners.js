module.exports = function(target, names) {
  
  var listeners = {};
  (names || []).forEach(function(name) {
    listeners[name] = [];
  });
  
  // Async
  target.notify = function(name, data) {
    
    setTimeout(function() {
      target.syncNotify(name, data);
    }, 0);
    
    return this;
  }
  
  target.syncNotify = function(name, data) {

    if (listeners[name] && listeners[name].length > 0)
      listeners[name].forEach(function(fn) { fn(data); });

    return target;
  }
  
  target.on = function(name, cb) {
    
    if (listeners[name] && listeners[name].indexOf(cb) === -1)
      listeners[name].push(cb);
    
    return target;
  }
  
  target.off = function() {

    // ... saving some time ...
    return target;
  };
  
  return target;
};