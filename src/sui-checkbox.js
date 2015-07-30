/**
 * @ngdoc directive
 * @name sui.checkbox.directive:sui-checkbox
 * @description
 * Checkbox element
 * 
 * @example
    <example module="sui.checkbox">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment" ng-controller="demoCtrl as ctrl">
                <div sui-checkbox label="{{ctrl.data.one.label}}" checked="ctrl.data.one.checked" ui-style="" on-toggle="ctrl.onToggle(status)"></div>
                <div sui-checkbox label="{{ctrl.data.two.label}}" checked="ctrl.data.two.checked" disabled="{{ctrl.data.two.disabled}}" ui-style="toggle"></div>
                <div sui-checkbox label="{{ctrl.data.three.label}}" checked="ctrl.data.three.checked" ui-style="toggle"></div>
                <div sui-checkbox label="{{ctrl.data.four.label}}" checked="ctrl.data.four.checked" ui-style="slider"></div>
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
                        label: 'slider',
                        checked: true
                    }
                };
                vm.onToggle = function (status) {
                    vm.afterToggle = status;  
                };
            }]);
        </file>
    </example>
 
 * @restrict EA
 * @element ANY
 * @scope
 *
 * @param {string} label Label
 * @param {boolean} checked Checked or not
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
                label: '@',
                checked: '=',
                disabled: '@',
                uiStyle: '@',
                onToggle: '&?'
            },
            template: '<div class="ui {{vm.uiStyle}} checkbox " ng-class="{disabled: vm.disabled}" ng-click="vm.toggle()">' +
                '<input type="checkbox" class="hidden" ng-model="vm.checked">' +
                '<label ng-bind="vm.label"></label>' +
                '</div>',
            controller: ['$scope', function ($scope) {
                var vm = this;
                vm.toggle = function () {
                    if (!vm.disabled) {
                        vm.checked = !vm.checked;
                        vm.onToggle && vm.onToggle({
                            status: {
                                checked: vm.checked
                            }
                        });
                    }
                };
            }],
            controllerAs: 'vm',
            bindToController: true
        };
    }]);
