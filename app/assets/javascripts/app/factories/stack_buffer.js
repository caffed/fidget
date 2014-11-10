angular.module('factories.stack_buffer', [])

.factory("StackBuffer", function($cacheFactory, $rootScope){
  var _sb = $cacheFactory('stackbuffer_' + Math.ceil(Math.random() + 100000) );
  var _index = [];
  var _limit = null;

  var _isNotFull = function(){
    var cs = _sb.info();
    if (cs.size >= 0 && cs.size < _limit) {
      return true;
    } else {
      return false;
    }
  };

  var sb = {

    setSize: function(size){
      if (_limit === null && _limit !== size ){
        _limit = size;
      }
    },

    push: function(index, data) {
      if(_isNotFull()){
        _index.push(index);
        _sb.put(index, data);
        $rootScope.$emit('stack-buffer-push', data);
      } else {
        // error here
        // or just pop off?
      }
    },

    pop: function() {
      var index = _index.shift();
      var data = _sb.get(index);
      _sb.remove(index);
      return data;
    },

    // non destructive
    getFirst: function(){
      return _sb.get(_index[0]);
    },

    getLast: function(){
      return _sb.get(_index[_index.length - 1]);
    },

    getLastAtOffset: function(index){
      return _sb.get(_index[_index.length - index]);
    }

  };

  return sb;
})

;
