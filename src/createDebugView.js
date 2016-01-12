module.exports = function(mount) {
  
  return {
    log: function(text) {
      mount.innerHTML += (text + '<br/>');
    }
  };
};