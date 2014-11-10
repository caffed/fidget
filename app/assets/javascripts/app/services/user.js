"use strict";

angular.module('services.user', [])

.service("User", function(){
  // DRY up here
  // refactor this to factory 'lib' with setters and getters

  var _cookieExists = function(key){
    var regex = new RegExp(key);
    return !!document.cookie.match(regex);
  }

  var _userId, _color, date = new Date('2015');


  if (_cookieExists("_fidgetUID")){
    _userId = document.cookie.replace(/(?:(?:^|.*;\s*)_fidgetUID\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  } else {
    _userId = (Math.random() * 100000000) ^ 2;
    document.cookie = "_fidgetUID=" + _userId  + "; path=/; expires=" + date.toGMTString() + ";";
  }

  var randomColor = function() {
    var c = '#';
    for (var i = 0; i < 6; i++){
      c += Number(Math.ceil((Math.random()  * 250 / 16))).toString(16);
    }
    return c;
  }

  if (_cookieExists("_fidgetColor")){
    _color = document.cookie.replace(/(?:(?:^|.*;\s*)_fidgetColor\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  } else {
    _color = randomColor();
    document.cookie = "_fidgetColor=" + _color  + "; path=/; expires=" + date.toGMTString() + ";";
  }

  return {

    uid: function() { return _userId; },
    color: function() { return _color; }

  };
})
;

