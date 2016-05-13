(function () {
  'use strict';

  angular.module('nx.widget')
  .directive('nxActiveItem', [function () {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div class="nx-widget-active-item" data-active="{{item.active}}" ng-transclude></div>',
      link: linkFn
    };


    function linkFn(scope, element, attrs) {
      element.bind('click', function () {
        scope.$emit('itemClick', scope);
        scope.$apply();
      })
    }

  }]);

})();
