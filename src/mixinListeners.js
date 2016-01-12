module.exports = function(target, names) {
  
  var listeners = {};
  (names || []).forEach(function(name) {
    listeners[name] = [];
  });
  
  target.notify = function(name, data) {
    if (listeners[name]) {
      setTimeout(function() {
        listeners[name].forEach(function(fn) { fn(data); });
      }, 0);
    }
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