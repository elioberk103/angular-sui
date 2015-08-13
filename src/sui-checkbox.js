/**
 * @ngdoc directive
 * @name sui.checkbox.directive:suiCheckbox
 * @description
 * Checkbox element
 * 
 * @example
    <example module="sui.checkbox">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment" ng-controller="demoCtrl as ctrl">
                <div sui-checkbox label="{{ctrl.data.one.label}}" ng-model="ctrl.data.one.checked" ui-style="" on-toggle="ctrl.onToggle(model)"></div>
                <div sui-checkbox label="{{ctrl.data.two.label}}" ng-model="ctrl.data.two.checked" disabled="{{ctrl.data.two.disabled}}" ui-style="toggle"></div>
                <div sui-checkbox label="{{ctrl.data.three.label}}" ng-model="ctrl.data.three.checked" ui-style="toggle"></div>
                <div sui-checkbox label="{{ctrl.data.four.label}}" ng-model="ctrl.data.four.checked" ui-style="slider"></div>
                <div class="ui positive message">
                    <div>Status: {{ ctrl.data | json }}</div>
                    <div>After toggle: {{ ctrl.afterToggle }}</div>
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.checkbox')
            .controller('demoCtrl', ['$scope', function ($scope) {
                var vm = this;
                vm.data = {
                    one: {
                        label: 'Click to call `onToggle` function',
                        checked: false
                    },
                    two: {
                        label: 'Disabled checkbox',
                        checked: true,
                        disabled: true
                    },
                    three: {
                        label: 'Toggle',
                        checked: true
                    },
                    four: {
                        label: 'Slider',
                        checked: true
                    }
                };
                vm.onToggle = function (model) {
                    vm.afterToggle = model;  
                };
            }]);
        </file>
    </example>
 
 * @restrict EA
 * @element ANY
 * @scope
 *
 * @param {string} label Label
 * @param {boolean} ng-model <i class="exchange icon"></i>The model of this directive
 * @param {boolean} disabled Disabled or not
 * @param {enum} ui-style "`checkbox`" || "`toggle`" || "`slider`"
 * @param {function} on-toggle The function to be called when the checkbox is toggled. 
 *
 */
angular.module('sui.checkbox', [])
    .directive('suiCheckbox', [function () {
        return {
            restrict: 'AE',
            scope: {
                ngModel: '=',
                label: '@',
                disabled: '@',
                uiStyle: '@',
                onToggle: '&',
                name: '@'
            },
            template: 
                '<div class="ui {{vm.uiStyle}} checkbox" ng-class="{disabled: vm.disabled}" ng-click="vm.onCheck()">' +
                    '<input type="checkbox" name="{{vm.name}}" ng-model="vm.ngModel" ng-disabled="{{vm.disabled}}" class="hidden" ng-checked="vm.ngModel">' +
                    '<label ng-bind="vm.label"></label>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm.onCheck = onCheck;

                function onCheck() {
                    if (vm.disabled) {
                        return;
                    }
                    vm.ngModel = !vm.ngModel;
                    vm.onToggle && vm.onToggle({
                        model: vm.ngModel
                    });
                }
            }]
        };
    }]);
