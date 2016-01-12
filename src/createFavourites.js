var createStore = require('./createStore.js');

module.exports = function() {
  
  var store = createStore('favourites');
  var list = store.get();
  if (!list) {
    list = [];
    store.set(list);
  }
  
  return {
    count: function() {
      return list.length;
    },
    add: function(itemId) {
      if (list.indexOf(item.id) === -1)
        list.push(item.id);
      store.set(list);
    },
    remove: function(itemId) {
      var idx = list.indexOf(item.id);
      if (idx !== -1)
        list.splice(idx, 1);
      store.set(list);
    }
  };
};