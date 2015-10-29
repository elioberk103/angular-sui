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
              <sui-base-label icon="mail" on-click="vm.click(model)" model="{{vm.model}}" label-text="{{ vm.labelText }}" detail-text="{{ vm.detailText }}" image="{{ vm.image }}" removable="{{ vm.removable }}" color="{{ vm.color }}"></sui-base-label>
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
 * @name sui.label.directive:suiLabelGroup
 * @description Semantic-UI style labels
 * @element ANY
 * @restrict AE
 * @scope
 * @example
 <example module="sui.label">
     <file name="index.html">
         <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
         <div class="ui segment form" ng-controller="DemoController as vm">
             <sui-label-group model="vm.model" labels="vm.labels"></sui-label-group>
             <div class="ui positive message">
                 <p>{{ vm.model }}</p>
             </div>
         </div>
     </file>
     <file name="app.js">
     angular.module('sui.label')
     .controller('DemoController', [function () {
         var vm = this;
         vm.model = [];
         vm.labels = [{
             text: 'Php',
             value: 'php',
             icon: 'save',
             removable: true
         }, {
             text: 'JavaScript',
             value: 'javascript',
             icon: 'spoon',
             color: 'blue',
             removable: true
         }, {
             text: 'CSS',
             value: 'css',
             color: 'orange'
         }, {
             text: 'WordPress',
             value: 'wordpress',
             color: 'teal',
             removable: true,
             image: 'http://semantic-ui.com/images/avatar/small/joe.jpg'
         }, {
             text: 'Java',
             value: 'java',
             color: 'purple',
             icon: 'alarm',
             removable: true,
             detailText: 'Oracle Java'
         }];
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

/**
 * @ngdoc directive
 * @name sui.label.directive:suiRibbonLabel
 * @description Semantic-UI style labels
 * @element ANY
 * @restrict AE
 * @scope
 * @example
 <example module="sui.label">
     <file name="index.html">
         <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
         <div class="ui segment form" ng-controller="DemoController as vm">
             <sui-ribbon-label on-click="vm.click()" position="{{vm.position}}" icon="{{vm.icon}}" color="blue" label-text="Food"></sui-ribbon-label>
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
              vm.icon = 'spoon';
              vm.click = function () {
                  vm.logAfterClicking = 'The callback function is invoked';
              };
         }]);
     </file>
 </example>
 */

/**
 * @ngdoc directive
 * @name sui.label.directive:suiFloatingLabel
 * @description Semantic-UI style labels
 * @element ANY
 * @restrict AE
 * @scope
 * @example
 <example module="sui.label">
     <file name="index.html">
         <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
         <div class="ui segment form" ng-controller="DemoController as vm">
             <sui-floating-label color="{{ vm.color }}" label-text="{{ vm.text }}"></sui-floating-label>
             This paragraph has a floating label.
         </div>
     </file>
     <file name="app.js">
     angular.module('sui.label')
         .controller('DemoController', [function () {
              var vm = this;
              vm.color = 'red';
              vm.text = '22';
         }]);
    </file>
 </example>
 */

/**
 * @ngdoc directive
 * @name sui.label.directive:suiPointingLabel
 * @description Semantic-UI style labels
 * @element ANY
 * @restrict AE
 * @scope
 * @example
 <div class="alert alert-error" role="alert">
    Note: The UI of this demo crashes because of CSS collision (`input`) between Bootstrap and Semantic-UI. Please click The link "Edit in Plunker" to view.
 </div>
 <example module="sui.label">
     <file name="index.html">
         <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
         <div class="ui segment form" ng-controller="DemoController as vm">
             <div class="inline field">
                 <sui-pointing-label color="{{ vm.color }}" position="{{ vm.position }}">This is some indicating information</sui-pointing-label>
                 <input type="text" placeholder="First name">
             </div>
         </div>
     </file>
     <file name="app.js">
     angular.module('sui.label')
     .controller('DemoController', [function () {
          var vm = this;
          vm.position = 'right';
          vm.color = 'red';
     }]);
     </file>
 </example>
 */

(function() {
    var labelApp = angular.module('sui.label', []);
    var labelTypes = ['Base', 'Tag'];

    angular.forEach(labelTypes, function (type) {
        labelApp.directive('sui' + type + 'Label', function () {
            type = type.toLowerCase();
            return {
                restrict: 'AE',
                scope: {
                    hidden: '=',
                    model: '@',
                    labelText: '@',
                    detailText: '@',
                    image: '@',
                    removable: '@',
                    color: '@',
                    icon: '@',
                    disabled: '@',
                    onClick: '&',
                    onHidden: '&'
                },
                replace: true,
                template:
                    '<a ' +
                            'class="ui {{vm.color}} ' + type + ' label sui-label" ' +
                            'ng-class="{image: vm.image}" ' +
                            'ng-hide="vm.hidden" ' +
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
                        invokeHandler(vm.onClick);
                    };

                    vm._hide = function() {
                        if (!vm.disabled) {
                            vm.hidden = true;
                            invokeHandler(vm.onHidden);
                        }
                    };

                    function invokeHandler(fn) {
                        if (!vm.disabled) {
                            fn && fn({
                                model: vm.model
                            });
                        }
                    }
                }]
            };
        });
    });

    labelApp.directive('suiLabelGroup', function () {
        return {
            restrict: 'AE',
            scope: {
                model: '=',
                labels: '='
            },
            template:
                '<div class="sui-label-group">' +
                    '<div ng-repeat="label in vm.labels" sui-base-label ' +
                        'image="{{label.image}}" ' +
                        'model="vm.model[$index]" ' +
                        'color="{{label.color}}" ' +
                        'icon="{{label.icon}}" ' +
                        'label-text="{{label.text}}" ' +
                        'detail-text="{{label.detailText}}" ' +
                        'removable="{{label.removable}}" ' +
                        'on-hidden="vm._removeLabel(label.value)" ' +
                        'on-click="label.onClick()">' +
                    '</div>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function() {
                var vm = this;

                init();

                function init() {
                    vm.model.splice(0, vm.model.length);
                    angular.forEach(vm.labels, function(label) {
                        !label.hidden && vm.model.push(label.value);
                    });
                }

                vm._removeLabel = function(value) {
                    var index = vm.model.indexOf(value);
                    (index >= 0) && vm.model.splice(index, 1);
                };
            }]
        };
    });

    var attachedTypes = ['Corner', 'Ribbon'];
    angular.forEach(attachedTypes, function (type) {
        labelApp.directive('sui' + type +'Label', function () {
            type = type.toLowerCase();
            return {
                scope: {
                    position: '@',
                    color: '@',
                    icon: '@',
                    onClick: '&',
                    labelText: '@'
                },
                replace: true,
                template:
                    '<a class="ui {{ vm.color }} {{ vm.position }} ' + type + ' label sui-corner-label" ng-click="vm._click()">' +
                        '<i class="{{ vm.icon }} icon"></i>' +
                        '{{ vm.labelText }}' +
                    '</a>',
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
    });

    labelApp.directive('suiFloatingLabel', function () {
        return {
            scope: {
                color: '@',
                labelText: '@'
            },
            replace: true,
            template:
                '<div class="floating ui {{ vm.color }} label">' +
                    '{{ vm.labelText }}' +
                '</div>',
            bindToController: true,
            controllerAs: 'vm',
            controller: [function() {
            }]
        };
    });

    labelApp.directive('suiPointingLabel', function () {
        return {
            scope: {
                position: '@',
                color: '@'
            },
            replace: true,
            transclude: true,
            template:
                '<div class="ui {{ vm.color }} pointing {{ vm.position }} basic label">' +
                    '<div ng-transclude></div>' +
                '</div>',
            bindToController: true,
            controllerAs: 'vm',
            controller: [function() {
            }]
        };
    });

})();