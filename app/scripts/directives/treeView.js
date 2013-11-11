'use strict';

angular.module('WhiteBoardApp')
  .directive('treeview', function () {
    return {
      templateUrl: "views/treeView.html",
      scope: {
        data: "="
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });


