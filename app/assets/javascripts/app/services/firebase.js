"use strict";

angular.module("providers.firebase", [])

.provider('firebase', function (){
  var firebase = this;

  firebase.config = {
    username: null, // string
    model: null    // array
  }

  this.$get = function(){
    return {
      config: firebase.config
    }
  };
});

angular.module("services.firebase", ['providers.firebase'])

.service("FB", function(firebase, StackBuffer){
  // next: dynamically create models with accessor methods based on models array
  var fbref = new Firebase("https://" + firebase.config.username + ".firebaseio.com/" + firebase.config.model );

  fbref.on("child_added", function(resp) {
    StackBuffer.push(resp.key(), resp.val())
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  return fbref;
})

;
