jest.dontMock('../createPhotosModel.js');
jest.dontMock('../mixinListeners.js');

describe('createPhotosModel', function() {
  
  it('should call the "photosPublic" method of FlickrAPI with "a-tag"', function() {
    
    var FlickrAPI = require('../FlickrAPI.js');
    spyOn(FlickrAPI, 'photosPublic').and.returnValue(new Promise(function(resolve) {}));
    
    var createPhotosModel = require('../createPhotosModel.js');
    var model = createPhotosModel({tag: 'a-tag'});
    expect(FlickrAPI.photosPublic).toHaveBeenCalledWith('a-tag');
  });
  
  it('should fire an "update" event when it received data from the Flickr API', function(done) {
    
    var items = [
      {
        'link': 'http://example.com/a-link'
      }
    ];
    var expectedItems = [
      {
        id: 'http://example.com/a-link',
        link: 'http://example.com/a-link',
        selected: false
      }
    ];
    
    var FlickrAPI = require('../FlickrAPI.js');
    spyOn(FlickrAPI, 'photosPublic').and.returnValue(new Promise(function(resolve) {
      resolve({items: items});
    }));
    
    var createPhotosModel = require('../createPhotosModel.js');
    var model = createPhotosModel({tag: 'b-tag'});
  
    model.on('update', function(model) {
      expect(model.items).toEqual(expectedItems);
      done();
    });
  });
  
});