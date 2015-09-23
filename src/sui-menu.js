/**
 * @ngdoc directive
 * @name sui.menu.directive: suiDropdownMenu
 * @description
 * Dropdown menu. When hovered, the menus is displayed.
 *
 * @scope
 * @restrict AE
 * @element ANY
 *
 * @example
 *  <example module="sui.menu">
 *      <file name="index.html">
 *          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
 *          <div ng-controller="demoCtrl as ctrl">
 *              <div size="Large" label="Dropdown Menu" icon="wrench" sui-dropdown-menu options="ctrl.options"></div>
 *          </div>
 *      </file>
 *      <file name="app.js">
 *          angular.module('sui.menu')
 *              .controller('demoCtrl', ['$scope', function ($scope) {
 *                  this.options = [{
 *                      value: 'zero',
 *                      label: 'Option Zero'
 *                  }, {
 *                      value: 'One',
 *                      label: 'Option One'
 *                  }, {
 *                      value: 'Two',
 *                      label: 'Option Two'
 *                  }];
 *              }]);
 *      </file>
 *  </example>
 */

angular.module('sui.menu', [])
    .directive('suiDropdownMenu', function () {
       return {
           restrict: 'AE',
           scope: {
               options: '=',
               selected: '=',
               label: '@',
               icon: '@',
               dropdownIcon: '@',
               size: '@',
               color: '@',
               disabled: '@',
               onChange: '&'
           },
           template:
               '<div class="ui dropdown sui-dropdown-menu" ng-mouseenter="vm.active = true" ng-mouseleave="vm.active = false" ' +
                   'ng-class="{\'visible active\': vm.active}">' +
                   '<i ng-show="vm.icon" class="{{vm.icon}} icon"></i>' +
                   '{{vm.label}}' +
                   '<i class="{{vm.dropdownIcon || \'dropdown\'}} icon"></i>' +
                   '<div class="menu" ng-class="{\'visible transition slide down\': vm.active}">' +
                       '<div class="item" ng-repeat="opt in vm.options" ng-bind="opt.label"></div>' +
                   '</div>' +
               '</div>',
           bindToController: true,
           controllerAs: 'vm',
           controller: ['$scope', function ($scope) {
           }]
       }
    });