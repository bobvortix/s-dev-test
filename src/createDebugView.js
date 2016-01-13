module.exports = function(mount) {
  
  return {
    log: function(text) {
      console.log(text);
      mount.innerHTML += (text + '<br/>');
    }
  };
};