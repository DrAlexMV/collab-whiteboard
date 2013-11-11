'use strict';

angular.module('WhiteBoardApp')
  .directive('treeview', function () {
    return {
      templateUrl: "views/templates/treeView.html",
      scope: {
        data: "="
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });


