'use strict';
angular.module('WhiteBoardApp')
  .directive('blackboard', function ($timeout, angularFire) {
    return {
      templateUrl: "views/blackboard.html",
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Initializes the blackboard
        var canvas = element.children()[0];
        var color = "#DECDC1";
        var stroke = "5";
        canvas.width = attrs.width ? attrs.width : 1140;
        canvas.height = attrs.height ? attrs.height : 600;

        // Creates a stage
        var stage = new createjs.Stage(canvas);
        stage.autoClear = false;
        stage.enableDOMEvents(true);
        // Enable touch for touch devices
        createjs.Touch.enable(stage);
        // Create a drawing canvas
        var drawingCanvas = new createjs.Shape();
        // Create a clear canvas png to clear canvas later
        stage.clear();
        scope.clearCanvas = stage.toDataURL();

        // Create a connection to a Firebase
        var baseUrl = "https://classnote.firebaseio.com/";

        // Create a binding to generate canvas update
        scope.pngCode;
        angularFire(new Firebase(baseUrl + "test/"), scope, "pngCode");

        // Point variables
        var oldPt;
        var oldMidPt;

        // Define mouse events
        var handleMouseMove = function() {
          var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);
          drawingCanvas.graphics
            .clear()
            .setStrokeStyle(stroke, 'round', 'round')
            .beginStroke(color)
            .moveTo(midPt.x, midPt.y)
            .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);
          oldPt.x = stage.mouseX;
          oldPt.y = stage.mouseY;
          oldMidPt.x = midPt.x;
          oldMidPt.y = midPt.y;
          stage.update();
        };

        var handleMouseUp = function() {
          stage.removeEventListener("stagemousemove", handleMouseMove);
          scope.$apply(function() {
            scope.pngCode = stage.toDataURL();
          });
        };

        var handleMouseDown = function() {
          oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
          oldMidPt = oldPt;
          stage.addEventListener("stagemousemove", handleMouseMove);
        };

        // Add mouse event handlers
        stage.addEventListener("stagemousedown", handleMouseDown);
        stage.addEventListener("stagemouseup", handleMouseUp);

        // Add drawing canvas to the stage
        stage.addChild(drawingCanvas);
        stage.update();

        var redrawCanvas = function(png) {
          if (png) {
            console.log("drawing");
            var context = canvas.getContext("2d");
            var imageData = new Image();
            imageData.src = png;
            imageData.onload = function() {
              context.drawImage(imageData, 0, 0);
            }
          } else {
            stage.clear();
            scope.pngCode = stage.toDataURL();
          }
        };

        // Redraw the canvas every 500ms
        setInterval(function() {
         redrawCanvas(scope.pngCode);
        }, 500);

        // Subscribe to clear canvas listener
        scope.$on("clearBlackboard", function() {
          scope.pngCode = false;
        });
      }
    };
  });
