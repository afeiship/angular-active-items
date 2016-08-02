(function () {
  'use strict';

  angular.module('nx.widget')
    .directive('nxActiveItems', ['$timeout',function ($timeout) {
      return {
        restrict: 'E',
        transclude: true,
        template: '<div class="nx-widget-active-items {{cssClass}}" ng-transclude></div>',
        scope: {
          items: '=',
          select:'&',
          activeIndex: '=',
          cssClass: '@'
        },
        link: linkFn,
        controller: controllerFn
      };

      function linkFn(scope, element, attrs) {

        scope.select = attrs.select ? scope.select() : select;

        if(!angular.isDefined(scope.activeIndex)){
          scope.activeIndex = 0;
        }

        scope.$on('itemClick', function (inEvent, inArgs) {
          scope.select(inArgs.item);
        });



        function select(inItem) {
          angular.forEach(scope.items, function (item, index) {
            if (angular.equals(item, inItem)) {
              scope.activeIndex = index;
            }
            item.active = false;
          });
          inItem.active = true;
        }
      }

      function controllerFn($scope) {



        $scope.$watch('items', function (inItems) {
          if(inItems && inItems.length > 0){
            __defaultItems(inItems);
            angular.forEach(inItems, function (item, index) {
              if (item.active) {
                $scope.index = index;
              }
            });
          }
        });

        $scope.$watch('activeIndex', function (inValue) {
          if($scope.items.length>0){
            var activeItem = $scope.items[inValue];
            if(inValue==-1){
              __reset();
            }else{
              if(!activeItem.active){
                $scope.select(activeItem);
              }
            }
          }
        });

        function __reset(){
          angular.forEach($scope.items, function (item, index) {
            item.active=false;
          });
        }

        function __defaultItems(inItems){
          var firstItem=inItems[0];
          if(!angular.isDefined(firstItem.active)){
            inItems.forEach(function(item){
              item.active=false;
            });
            firstItem.active=true;
          }
        }

      }

    }]);


})();
