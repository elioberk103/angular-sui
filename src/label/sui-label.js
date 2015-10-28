/**
 * @ngdoc directive
 * @name sui.label.directive:suiLabel
 * @description Semantic-UI style labels
 * @element ANY
 * @restrict AE
 * @scope
 * @example
  <example module="sui.label">
      <file name="index.html">
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
          <div class="ui segment form" ng-controller="DemoController as vm">
              <sui-label on-click="vm.click(model)" model="{{vm.model}}" displayed="vm.displayed" label-text="{{ vm.labelText }}" detail-text="{{ vm.detailText }}" image="{{ vm.image }}" removable="{{ vm.removable }}" color="{{ vm.color }}"></sui-label>
              <div class="ui positive message">
                  <p>{{ vm.logAfterClicking }}</p>
              </div>
          </div>
      </file>
      <file name="app.js">
      angular.module('sui.label')
          .controller('DemoController', [function () {
              var vm = this;
              vm.model = 'v';
              vm.displayed = true;
              vm.labelText = 'Veronkia';
              vm.detailText = 'Friend';
              vm.image = 'http://semantic-ui.com/images/avatar/small/joe.jpg';
              vm.removable = 'true';
              vm.color = 'teal';
              vm.click = function (model) {
                  vm.logAfterClicking = 'The callback function is invoked: ' + model;
              };
          }]);
      </file>
  </example>
 */

(function() {
    var labelApp = angular.module('sui.label', []);
    labelApp.directive('suiLabel', function () {
        return {
            restrict: 'AE',
            scope: {
                displayed: '=',
                model: '@',
                labelText: '@',
                detailText: '@',
                image: '@',
                removable: '@',
                color: '@',
                onClick: '&',
                disabled: '@'
            },
            template:
                '<a ' +
                        'class="ui {{vm.color}} label sui-label" ' +
                        'ng-class="{image: vm.image}" ' +
                        'ng-show="vm.displayed" ' +
                        'ng-click="vm._onClick()">' +
                    '<img ng-show="vm.image && !vm.uiStyle" ng-src="{{ vm.image }}">' +
                    '{{ vm.labelText }}' +
                    '<i ng-show="vm.removable" class="delete icon" ng-click="vm._hide()"></i>' +
                    '<div class="detail" ng-show="vm.detailText && !vm.uiStyle" ng-bind="vm.detailText"></div>' +
                '</a>',
            bindToController: true,
            controllerAs: 'vm',
            controller: ['$scope', function($scope) {
                var vm = this;
                vm._onClick = function() {
                    !vm.disabled && vm.onClick && vm.onClick({
                        model: vm.model
                    });
                };

                vm._hide = function() {
                    vm.displayed = false;
                };
            }]
        };
    });
})();