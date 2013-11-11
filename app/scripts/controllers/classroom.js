'use strict';

angular.module('WhiteBoardApp')
  .controller('ClassroomCtrl', function ($scope, $ekathuwa) {
    $scope.directory = [{
      label: 'AlexanderVentura',
      children: ["Hello", "World"]
    }];
    // Modal view used to add a new blackboard
    $scope.addNewBlackboardModal = function() {
      $ekathuwa.modal({
        id: "addNewBlackboard",
        scope: $scope,
        headerText: "Add a new Blackboard.",
        bodyTemplateURL: "templates/addNewBlackboardModal.html"
      });
    };
  });

