jest
  .dontMock('../createPhotosModel')
  .dontMock('../mixinListeners')
  .dontMock('../createFavourites');

describe('createPhotosModel', function() {

  beforeEach(function() {
    
    var createStore = require('../createStore');
    createStore.mockImplementation(function(key) {
      var obj;
      return {
        get: function() { return obj; },
        set: function(value) { obj = value; }
      };
    });
  });
  
  describe('setTag', function() {
    
    it('should call the "photosPublic" method of FlickrAPI with "a-tag"', function() {
      
      var FlickrAPI = require('../FlickrAPI.js');
      spyOn(FlickrAPI, 'photosPublic').and.returnValue(new Promise(function(resolve) {}));
      
      var createPhotosModel = require('../createPhotosModel.js');
      var model = createPhotosModel()
        .setTag('a-tag');
      expect(FlickrAPI.photosPublic).toHaveBeenCalledWith('a-tag');
    });
    
    it('should fire a "loading" event', function(done) {
      
      var FlickrAPI = require('../FlickrAPI');
      spyOn(FlickrAPI, 'photosPublic').and.returnValue(new Promise(function(resolve) {
        resolve({items: []});
      }));
      
      var createPhotosModel = require('../createPhotosModel');
      var model = createPhotosModel();
      
      model.on('loading', function() {
        done();
      });
      
      model.setTag('a-tag-here');
      
      jest.runAllTimers();
    });
    
    it('should fire an "update" event with transformed items on API response', function(done) {
      
      var items = [
        {
          'link': 'http://example.com/a-link'
        }
      ];
      var expectedItems = [
        {
          id: 'http://example.com/a-link',
          link: 'http://example.com/a-link',
          favourited: false
        }
      ];
      
      var createPhotosModel = require('../createPhotosModel');
      var model = createPhotosModel();
    
      model.on('update', function(model) {        
        expect(model.items).toEqual(expectedItems);
        done();
      });
      
      var FlickrAPI = require('../FlickrAPI');
      spyOn(FlickrAPI, 'photosPublic').and.returnValue(new Promise(function(resolve) {
        resolve({items: items});
      }));
      
      model.setTag('b-tag');
      
      jest.runAllTimers();
    });
    
  });
  
});