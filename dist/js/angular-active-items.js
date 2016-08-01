(function () {
  'use strict';

  angular.module('nx.widget', []);

})();

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

(function () {
  'use strict';

  angular.module('nx.widget')
    .directive('nxActiveItems', [function ($scope) {
      return {
        restrict: 'E',
        transclude: true,
        template: '<div class="nx-widget-active-items {{cssClass}}" ng-transclude></div>',
        scope: {
          items: '=',
          activeIndex: '=',
          cssClass: '@'
        },
        link: linkFn,
        controller: controllerFn
      };

      function linkFn(scope, element, attrs) {
        scope.$on('itemClick', function (inEvent, inArgs) {
          scope.select(inArgs.item);
        });
      }

      function controllerFn($scope) {

        $scope.select = select;

        $scope.$watch('items', function (inItems) {
          angular.forEach(inItems, function (item, index) {
            if (item.active) {
              $scope.index = index;
            }
          });
        });

        $scope.$watch('activeIndex', function (inValue) {
          if($scope.items.length>0){
            var activeItem = $scope.items[inValue];
            $scope.select(activeItem);
          }
        });

        function select(inItem) {
          angular.forEach($scope.items, function (item, index) {
            if (angular.equals(item, inItem)) {
              $scope.activeIndex = index;
            }
            item.active = false;
          });
          inItem.active = true;
        }
      }

    }]);


})();
