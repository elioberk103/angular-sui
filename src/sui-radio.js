/**
 * @ngdoc directive
 * @name sui.radio.directive:suiRadioGroup
 * @element ANY
 * @restrict AE
 * @scope
 * @description
 * A form radio group.
 *
 * @param {string} model<i class="exchange icon"></i> The value of selected item
 * @param {boolean} disabled Whether disabled or not
 * @param {array} options A list of options to populate the radios. Every option should contain `label` and `value`.
 * @param {string} name Name of the radio group
 * @param {boolean} inline If `true`, the radio items are put as `inline` elements
 * @param {function} onCheck Callback function when checked.
 *
 * @example
    <example module="sui.radio">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment form" ng-controller="DemoController as vm">
                <div class="inline fields">
                    <div sui-radio ng-repeat="r in vm.radios" model="vm.value"
                        label="{{r.label}}" 
                        name="{{r.name}}" 
                        value="{{r.value}}" 
                        on-toggle="r.onCheck(model)">
                    </div>
                </div>
                <div sui-radio-group inline="true" options="vm.radios" model="vm.value" name="groupColor"></div>
                <div class="ui positive message">
                    {{ vm.value }}
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.radio')
            .controller('DemoController', [function () {
                var vm = this;
                vm.value = null;
                vm.radios = [{
                    label: 'Green',
                    checked: vm.checked,
                    name: 'color',
                    value: 'greenColor',
                    onCheck: onCheck
                }, {
                    label: 'Red',
                    checked: vm.checked,
                    name: 'color',
                    value: 'redColor',
                    onCheck: onCheck
                }, {
                    label: 'Orange',
                    checked: vm.checked,
                    name: 'color',
                    value: 'orangeColor',
                    onCheck: onCheck
                }];

                function onCheck (model) {
                    console.log(model);
                    vm.value = model;
                }
            }]);
        </file>
    </example>
 */

/**
 * @ngdoc directive
 * @name sui.radio.directive:suiRadio
 * @element ANY
 * @restrict AE
 * @scope
 * @description
 * A single radio. It is used by {@link sui.radio.directive:suiRadioGroup suiRadioGroup}.
 *
 * {@link sui.radio.directive:suiRadioGroup#example Demo}
 *
 * @param {string} model<i class="exchange icon"></i> The value
 * @param {boolean} disabled Whether disabled or not
 * @param {string} label The label text displayed next to the radio
 * @param {string} value Value for grouping
 * @param {function} on-check Callback function when checked.
 */

angular.module('sui.radio', [])
    .directive('suiRadioGroup', [function () {
        return {
            restrict: 'AE',
            scope: {
                model: '=',
                disabled: '@',
                options: '=',
                name: '@',
                onCheck: '&',
                inline: '@'
            },
            template: 
                '<div class="sui-radio" ng-class="{\'ui fields\': vm.inline}">' +
                    '<div sui-radio ng-repeat="r in vm.options" model="vm.model" ' +
                        'label="{{r.label}}" ' +
                        'name="{{vm.name}}" ' +
                        'value="{{r.value}}" ' +
                        'on-check="vm._onCheck(model)">' +
                    '</div>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm._onCheck = _onCheck;

                function _onCheck () {
                    !vm.disabled && vm.onCheck && vm.onCheck({
                        model: vm.model
                    });
                }
            }]
        };
    }]);

angular.module('sui.radio')
    .directive('suiRadio', [function () {
        return {
            restrict: 'AE',
            scope: {
                disabled: '@',
                label: '@',
                model: '=',
                name: '@',
                value: '@',
                onCheck: '&'
            },
            template: 
                '<div class="field sui-radio-item">' +
                    '<div ng-click="vm._onCheck()" class="ui radio checkbox" ng-class="{ checked: vm.model === vm.value, disabled: vm.disabled }">' +
                        '<input type="radio" name="{{ vm.name }}" class="hidden" ng-model="vm.model" value="{{ vm.value }}">' +
                        '<label ng-bind="vm.label"></label>' +
                    '</div>' +
                '</div>',
            bindToController: true,
            controllerAs: 'vm',
            controller: [function () {
                var vm = this;
                vm._onCheck = _onCheck;

                function _onCheck () {
                    if (!vm.disabled) {
                        vm.model = vm.value;
                        vm.onCheck && vm.onCheck({
                            model: vm.model
                        });
                    }
                }
            }]
        };
    }]);