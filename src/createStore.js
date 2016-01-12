module.exports = function(key) {

  // Simple object/array store using JSON for serialisation
  return {
    set: function(object) {
      localStorage.setItem(key, JSON.stringify(object));
    },
    get: function() {
      return JSON.parse(localStorage.getItem(key));
    }
  };
};