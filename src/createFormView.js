var mixinListeners = require('./mixinListeners');

module.exports = function() {
  
  var view = {};

  document
    .querySelector('#search-form')
    .addEventListener('submit', function(e) {
      e.preventDefault();
      view.notify('submit', document.querySelector('#text-input').value);
    }
  );
  
  mixinListeners(view, ['submit']);
  
  return view;
};