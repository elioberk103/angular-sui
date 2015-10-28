/**
 * @ngdoc directive
 * @name sui.label.directive:suiBaseLabel
 * @description Semantic-UI style labels
 * @element ANY
 * @restrict AE
 * @scope
 * @example
  <example module="sui.label">
      <file name="index.html">
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
          <div class="ui segment form" ng-controller="DemoController as vm">
              <sui-base-label icon="mail" on-click="vm.click(model)" model="{{vm.model}}" displayed="vm.displayed" label-text="{{ vm.labelText }}" detail-text="{{ vm.detailText }}" image="{{ vm.image }}" removable="{{ vm.removable }}" color="{{ vm.color }}"></sui-base-label>
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

/**
 * @ngdoc directive
 * @name sui.label.directive:suiTagLabel
 * @description Semantic-UI style labels
 * @element ANY
 * @restrict AE
 * @scope
 * @example
 <example module="sui.label">
     <file name="index.html">
         <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
         <div class="ui segment form" ng-controller="DemoController as vm">
             <sui-tag-label icon="mail" on-click="vm.click(model)" model="{{vm.model}}" displayed="vm.displayed" label-text="{{ vm.labelText }}" removable="{{ vm.removable }}" color="{{ vm.color }}"></sui-tag-label>
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
          vm.removable = 'true';
          vm.color = 'teal';
          vm.click = function (model) {
              vm.logAfterClicking = 'The callback function is invoked: ' + model;
          };
      }]);
     </file>
 </example>
 */

/**
 * @ngdoc directive
 * @name sui.label.directive:suiCornerLabel
 * @description Semantic-UI style labels
 * @element ANY
 * @restrict AE
 * @scope
 * @example
 <example module="sui.label">
     <file name="index.html">
         <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
         <div class="ui segment form" ng-controller="DemoController as vm">
             <sui-corner-label on-click="vm.click()" position="{{vm.position}}" icon="{{vm.icon}}" color="teal">
             </sui-corner-label>
             <div class="ui positive message">
                <p>{{ vm.logAfterClicking }}</p>
             </div>
         </div>
     </file>
     <file name="app.js">
     angular.module('sui.label')
         .controller('DemoController', [function () {
              var vm = this;
              vm.position = 'right';
              vm.icon = 'save';
              vm.click = function () {
                  vm.logAfterClicking = 'The callback function is invoked';
              };
         }]);
     </file>
 </example>
 */

(function() {
    var labelApp = angular.module('sui.label', []);
    var labelTypes = ['Base', 'Tag'];

    labelApp.directive('suiCornerLabel', function () {
        return {
            scope: {
                position: '@',
                color: '@',
                icon: '@',
                onClick: '&'
            },
            template:
                '<div class="sui-corner-label" ng-click="vm._click()">' +
                    '<a class="ui {{ vm.position }} {{ vm.color }} corner label">' +
                        '<i class="{{ vm.icon }} icon"></i>' +
                    '</a>' +
                '</div>',
            bindToController: true,
            controllerAs: 'vm',
            controller: [function() {
                var vm = this;
                vm._click = function () {
                    vm.onClick && vm.onClick();
                };
            }]
        };
    });

    angular.forEach(labelTypes, function (type) {
        labelApp.directive('sui' + type + 'Label', function () {
            type = type.toLowerCase();
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
                    icon: '@',
                    disabled: '@',
                    isTag: '@'
                },
                template:
                    '<a ' +
                            'class="ui {{vm.color}} ' + type + ' label sui-label" ' +
                            'ng-class="{image: vm.image, tag: vm.isTag}" ' +
                            'ng-show="vm.displayed" ' +
                            'ng-click="vm._onClick()">' +
                        '<img ng-show="vm.image && !vm.uiStyle" ng-src="{{ vm.image }}">' +
                        '<i ng-show="vm.icon" class="{{ vm.icon }} icon"></i>' +
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
    });
})();