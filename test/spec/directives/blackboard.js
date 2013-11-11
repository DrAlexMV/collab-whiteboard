'use strict';

describe('Directive: blackboard', function () {

  // load the directive's module
  beforeEach(module('WhiteBoardApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<blackboard></blackboard>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the blackboard directive');
  }));
});
