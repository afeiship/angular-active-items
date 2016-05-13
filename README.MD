#angular-active-items
AngularJS directive used to build abstract active items.

##usage:
+ html part:
```html

<nx-active-items items="items" active-index="activeIndex" css-class="header">
  <nx-active-item ng-repeat="item in items">{{item.title}}</nx-active-item>
</nx-active-items>

<nx-active-items items="items1" active-index="activeIndex" css-class="body">
  <nx-active-item ng-repeat="item in items1">qeqwewq{{item.content}}</nx-active-item>
</nx-active-items>

```

+ javascript part:
```javascript
var TestModule = angular.module('TestApp', ['nx.widget'])
    .controller('MainCtrl', function ($scope) {
      $scope.activeIndex = 2;
      $scope.items = [
        {
          title: 'Tab1',
          active: true
        },
        {
          title: 'Tab2',
          active: false
        },
        {
          title: 'Tab3',
          active: false
        }
      ];

      $scope.items1 = [
        {
          content: 'content1',
          active: true
        },
        {
          content: 'content2',
          active: false
        },
        {
          content: 'content3',
          active: false
        }
      ];


    });
```


