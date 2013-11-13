'use strict';

angular.module('WhiteBoardApp')
  .directive('colorPicker', function () {
    return {
      templateURL: "views/colorPicker.html",
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.test = "test";
        scope.palette = ["#FFFF", "#0000"];
      }
    };
  });
