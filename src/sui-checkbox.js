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
            <div class="ui segment" ng-controller="DemoController as vm">
                <div class="ui segment">
                    <div>These four are defined through `sui-checkbox`:</div>
                    <div sui-checkbox label="{{vm.data.one.label}}" model="vm.data.one.checked" ui-style="" on-check="vm.onCheck(model)"></div>
                    <div sui-checkbox label="{{vm.data.two.label}}" model="vm.data.two.checked" disabled="{{vm.data.two.disabled}}" ui-style="toggle"></div>
                    <div sui-checkbox label="{{vm.data.three.label}}" model="vm.data.three.checked" ui-style="toggle"></div>
                    <div sui-checkbox label="{{vm.data.four.label}}" model="vm.data.four.checked" ui-style="slider"></div>
                </div>
                <div class="ui positive message">
                    <div>Status: {{ vm.data | json }}</div>
                    <div>After check: {{ vm.afterCheck }}</div>
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.checkbox')
            .controller('DemoController', ['$scope', function ($scope) {
                var vm = this;
                vm.data = {
                    one: {
                        label: 'Click to call `onCheck` function',
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
                vm.onCheck = function (model) {
                    vm.afterCheck = model;  
                };
            }]);
        </file>
    </example>
 
 * @restrict EA
 * @element ANY
 * @scope
 *
 * @param {string} label Label
 * @param {boolean} model <i class="exchange icon"></i>The model of this directive
 * @param {boolean} disabled Disabled or not
 * @param {enum} ui-style "`checkbox`" || "`toggle`" || "`slider`"
 * @param {function} on-check The function to be called when the checkbox is toggled.
 *
 */

/**
 * @ngdoc directive
 * @name sui.checkbox.directive:suiSliderCheckbox
 *
 * @description
 * Checkbox element with `ui-style` as `slider`.
 *
 * It is an alias of `suiCheckbox` with a specific UI style. Check {@link sui.checkbox.directive:suiCheckbox suiCheckbox}.
 *
 * @example
 <example module="sui.checkbox">
    <file name="index.html">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
        <div class="ui segment" ng-controller="DemoController as vm">
            <div class="ui segment">
                <div sui-slider-checkbox label="{{vm.data.label}}" model="vm.data.checked"></div>
            </div>
            <div class="ui positive message">
                <div>Status: {{ vm.data | json }}</div>
            </div>
        </div>
    </file>
    <file name="app.js">
    angular.module('sui.checkbox')
        .controller('DemoController', ['$scope', function ($scope) {
            var vm = this;
            vm.data = {
                label: 'I am a Slider',
                checked: true
            };
        }]);
    </file>
 </example>
 *
 * @restrict EA
 * @element ANY
 * @scope
 * @param {string} label Label
 * @param {boolean} model <i class="exchange icon"></i>The model of this directive
 * @param {boolean} disabled Disabled or not
 * @param {function} on-check The function to be called when the checkbox is toggled.
 */

/**
 * @ngdoc directive
 * @name sui.checkbox.directive:suiToggleCheckbox
 * @description
 * Checkbox element with `ui-style` as `toggle`.
 *
 * It is an alias of `suiCheckbox` with a specific UI style. Check {@link sui.checkbox.directive:suiCheckbox suiCheckbox}.
 *
  * @example
 <example module="sui.checkbox">
    <file name="index.html">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
        <div class="ui segment" ng-controller="DemoController as vm">
            <div class="ui segment">
                <div sui-toggle-checkbox label="{{vm.data.label}}" model="vm.data.checked"></div>
            </div>
            <div class="ui positive message">
                <div>Status: {{ vm.data | json }}</div>
            </div>
        </div>
    </file>
    <file name="app.js">
    angular.module('sui.checkbox')
        .controller('DemoController', ['$scope', function ($scope) {
            var vm = this;
            vm.data = {
                label: 'I am a Toggle',
                checked: true
            };
        }]);
    </file>
 </example>
 *
 * @restrict EA
 * @element ANY
 * @scope
 * @param {string} label Label
 * @param {boolean} model <i class="exchange icon"></i>The model of this directive
 * @param {boolean} disabled Disabled or not
 * @param {function} on-check The function to be called when the checkbox is toggled.
 */

/**
 * @ngdoc directive
 * @name sui.checkbox.directive:suiCheckboxGroup
 * @description
 * A checkbox group.
 * Check {@link sui.checkbox.directive:suiCheckbox suiCheckbox}.
 *
 * @example
    <example module="sui.checkbox">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment" ng-controller="DemoController as vm">
                <div class="ui segment">
                    <div>This is a `sui-checkbox-group`:</div>
                    <div sui-checkbox-group options="vm.options" model="vm.groupSelected"></div>
                </div>
                <div class="ui positive message">
                    <div>groupSelected: {{ vm.groupSelected }}</div>
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.checkbox')
            .controller('DemoController', ['$scope', function ($scope) {
                var vm = this;
                vm.options = [{
                    label: 'Orange',
                    value: 'orangeColor'
                }, {
                    label: 'Blue',
                    value: 'blueColor'
                }, {
                    label: 'Green',
                    value: 'greenColor'
                }, {
                    label: 'Red',
                    value: 'redColor'
                }];
                vm.groupSelected = ['redColor', 'blueColor'];
            }]);
        </file>
    </example>

 * @restrict EA
 * @element ANY
 * @scope
 *
 * @param {array} model <i class="exchange icon"></i>The values of selected items.
 * @param {boolean} disabled Disabled or not
 * @param {string} name Name for grouping
 * @param {array} options A list of options to populate the checkboxes. Every option should contain `label` and `value`.
 * @param {function} on-check The function to be called when the checkbox is toggled.
 *
 */

(function () {
    var checkboxApp = angular.module('sui.checkbox', []);

    var checkboxTypes = ['', 'Toggle', 'Slider'];
    angular.forEach(checkboxTypes, function (type) {
        checkboxApp.directive('sui' + type + 'Checkbox', function () {
            return {
                restrict: 'AE',
                scope: {
                    model: '=',
                    label: '@',
                    disabled: '@',
                    uiStyle: '@',
                    onCheck: '&',
                    name: '@'
                },
                template:
                '<div class="ui {{vm.uiStyle}} ' + type.toLowerCase() + ' checkbox" ng-class="{disabled: vm.disabled}" ng-click="vm.onClick()">' +
                '<input type="checkbox" name="{{vm.name}}" ng-model="vm.model" ng-disabled="{{vm.disabled}}" class="hidden" ng-checked="vm.model">' +
                '<label ng-bind="vm.label"></label>' +
                '</div>',
                controllerAs: 'vm',
                bindToController: true,
                controller: [function () {
                    var vm = this;
                    vm.onClick = onClick;

                    function onClick() {
                        if (vm.disabled) {
                            return;
                        }
                        vm.model = !vm.model;
                        vm.onCheck && vm.onCheck({
                            model: vm.model
                        });
                    }
                }]
            };
            });
    });

    checkboxApp.directive('suiCheckboxGroup', function () {
        return {
            restrict: 'AE',
            scope: {
                model: '=',
                disabled: '@',
                options: '=',
                name: '@',
                onCheck: '&'
            },
            template:
                '<div>' +
                    '<div sui-checkbox ng-repeat="r in vm.options" model="vm._checkedItems[r.value]" ' +
                        'label="{{r.label}}" ' +
                        'name="{{vm.name}}" ' +
                        'value="{{r.value}}" ' +
                        'on-check="vm._onCheck(r.value)">' +
                    '</div>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm._checkedItems = {};
                vm._onCheck = _onCheck;

                angular.forEach(vm.model, function (value) {
                   vm._checkedItems[value] = true;
                });

                function _onCheck (item) {
                    if (vm.disabled) {
                        return;
                    }

                    var index = vm.model.findIndex(function (v) {
                        return v === item;
                    });
                    index >= 0 ? vm.model.splice(index, 1) : vm.model.push(item);

                    vm.onCheck && vm.onCheck({
                        model: vm.model
                    });
                }
            }]
        };
    });
})();

