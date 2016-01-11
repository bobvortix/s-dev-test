module.exports = function(mount) {
  
  function setModel(model) {
    
    console.log('Setting the view model');
    console.log(model);
    
  }
  
  // var photoEl = document.createElement('div');
  // 
  // photoEl.innerText = 'HELLO';
  // 
  // mount.appendChild(photoEl);
  
  return {
    
    setModel: setModel
  };
};