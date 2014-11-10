"use strict";

angular.module("directives.draw", ['factories.stack_buffer', 'services.user'])

.controller("DrawCtrl", function($scope, User, StackBuffer, FB){
  StackBuffer.setSize(10000);

  $scope.last  = function() { return StackBuffer.getLast() };
  $scope.first = function() { return StackBuffer.getFirst(); };
  $scope.penultimate = function(){ return  StackBuffer.getLastAtOffset(2); };
  $scope.point = function(x, y, radius){
    var date = new Date();

    var p = {
      x: x,
      y: y,
      uid: User.uid(),
      color: User.color(),
      timestamp: date.getTime(),
      milliseconds: date.getMilliseconds()
    };

    // move these two out
    StackBuffer.push(Math.random().toString(), p);
    FB.push(p);

    return p;
  };

  $scope.drawPath = function(ctx, start, end){
    if (start && end) {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = start.color;
      ctx.stroke();
    }
  }

})


.directive("draw", function($rootScope){
  var draw = {
    controller: "DrawCtrl",
    scope: {
      // use these for size
      width: '@',
      height: '@'
    },
    template: "<canvas id='fidget'></canvas>",
    restrict: 'AE',
    link: function(scope, el, attr, ctrl){
      var canvas = el.children("canvas")[0];
      var ctx = canvas.getContext("2d");
      var clicked = false;

      el.on('mousedown', function(){
        clicked = true;
      });

      el.on('mouseup', function(){
        clicked = false;
      });

      el.on('mouseout', function(){
        clicked = false;
      });

      el.on('mousemove', function(event){
        if (clicked) {
          var point = scope.point(event.clientX, event.clientY, Math.ceil(4 / 2));
          var lastPoint = (!!scope.last() && scope.last()) || point;
          scope.drawPath(ctx, lastPoint ,point);
        }
      });

      $rootScope.$on('stack-buffer-push', function(event, point){
        // need to parse point by user now
        var lastPoint = (!!scope.penultimate() && scope.penultimate()) || point;
        scope.drawPath(ctx, lastPoint, point);
      });

    }
  };

  return draw;
})

;
