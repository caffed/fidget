angular.module('factories.pool', [])

.factory("Pool", function($cacheFactory){
  var _pool, _obj, _keys = [];

  var _randomKey = function _randomKey () {
    return _keys[Math.floor(Math.random() * _keys.length)];
  };

  var _randomInt = function _randomInt () {
    return Math.random() * Math.pow(10, 21);
  };

  var _createKey = function _createKey (objName, delta) {
    var d = "";
    if (delta && delta.length > 0) {
      d = "-" + delta.toString();
    };
    var key = objName + "-" + _randomInt().toString() + d;
    _keys.push(key);

    return key;
  };

  var _deleteKey = function _deleteKey (key) {
    for (var i=0; i<_keys.length; i++){
      if (_keys[i] === key) {
        _keys.splice(i);
      }
    }
  };

  var Pool = function (obj, size) {
    try {
      if (!!obj.name) {
        _obj = angular.copy(obj);
        _pool = $cacheFactory(obj.name, size);
        var key;
        for (var i = 0; i < size; i++) {
          key = _createKey(obj.name, i);
          _pool.put(key, angular.copy(obj));
        }
      } else {
        throw new Error('Pool object must have key "name" with a string value');
      }
    } catch (e) {
      console.warn(e.name + ': ' + e.message);
    }
  };

  Pool.prototype.get = function get () {
    var obj, key = _randomKey();
    if (key && key.length > 0) {
      obj = _pool.get(key);
      _pool.remove(key);
      _deleteKey(key);
    } else {
      obj = angular.copy(_obj);
    }

    return obj;
  };

  Pool.prototype.put = function put (obj) {
    try {
      if (!!obj.name) {
        var key = _createKey(obj.name);
        _pool.put(key, angular.copy(obj));
      } else {
        throw new Error('Not a valid pool object.');
      }
    }  catch (e) {
      console.warn(e.name + ': ' + e.message);
    }
  };

  return Pool;
})

;
