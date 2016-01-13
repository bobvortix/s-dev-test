var createStore = require('./createStore');

module.exports = function() {
  
  var store = createStore('favourites');
  var list = store.get();
  if (!list) {
    list = [];
    store.set(list);
  }
  
  function count() {
    return list.length;
  }
  
  function add(itemId) {
    if (!contains(itemId))
      list.push(itemId);
    store.set(list);
  }
  
  function remove(itemId) {
    var idx = list.indexOf(itemId);
    if (idx !== -1)
      list.splice(idx, 1);
    store.set(list);
  }
  
  function contains(itemId) {
    return list.indexOf(itemId) !== -1;
  }
  
  return {
    count: count,
    add: add,
    remove: remove,
    contains: contains
  };
};