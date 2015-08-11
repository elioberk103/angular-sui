/**
 * @ngdoc directive
 * @name sui.radio.directive:suiRadio
 * @element ANY
 * @restrict AE
 * @scope
 * @description
 * Single form radio.
 *
 * @example
    <example module="sui.radio">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment form" ng-controller="demoCtrl as ctrl">
                <div class="inline fields">
                    <div sui-radio-item ng-repeat="r in ctrl.radios" ng-model="ctrl.value" 
                        label="{{r.label}}" 
                        name="{{r.name}}" 
                        value="{{r.value}}" 
                        on-toggle="r.onToggle(model)">
                    </div>
                </div>
                <div sui-radio inline="true" options="ctrl.radios" ng-model="ctrl.value" name="groupColor"></div>
                <div class="ui positive message">
                    {{ ctrl.value }}
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.radio')
            .controller('demoCtrl', [function () {
                var vm = this;
                vm.value = null;
                vm.radios = [{
                    label: 'Green',
                    checked: vm.checked,
                    name: 'color',
                    value: 'greenColor',
                    onToggle: onToggle
                }, {
                    label: 'Red',
                    checked: vm.checked,
                    name: 'color',
                    value: 'redColor',
                    onToggle: onToggle
                }, {
                    label: 'Orange',
                    checked: vm.checked,
                    name: 'color',
                    value: 'orangeColor',
                    onToggle: onToggle
                }];

                function onToggle (model) {
                    console.log(model);
                    vm.value = model;
                }
            }]);
        </file>
    </example>
 */

angular.module('sui.radio', [])
    .directive('suiRadio', [function () {
        return {
            restrict: 'AE',
            scope: {
                disabled: '@',
                options: '=',
                ngModel: '=',
                name: '@',
                onChange: '&?',
                inline: '@?'
            },
            template: 
                '<div class="sui-radio" ng-class="{\'ui fields\': vm.inline}">' +
                    '<div sui-radio-item ng-repeat="r in vm.options" ng-model="vm.ngModel" ' +
                        'label="{{r.label}}" ' +
                        'name="{{vm.name}}" ' +
                        'value="{{r.value}}" ' +
                        'on-toggle="vm.onInternalChange(model)">' +
                    '</div>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm.onInternalChange = onInternalChange;

                function onInternalChange () {
                    !vm.disabled && vm.onChange && vm.onChange({
                        model: vm.ngModel
                    });
                }
            }]
        };
    }]);

angular.module('sui.radio')
    .directive('suiRadioItem', [function () {
        return {
            restrict: 'AE',
            scope: {
                disabled: '@',
                label: '@',
                ngModel: '=',
                name: '@',
                value: '@',
                onToggle: '&?'
            },
            template: 
                '<div class="field sui-radio-item">' +
                    '<div ng-click="vm.onChange()" class="ui radio checkbox" ng-class="{ checked: vm.ngModel === vm.value, disabled: vm.disabled }">' +
                        '<input type="radio" name="{{ vm.name }}" class="hidden" ng-model="vm.ngModel" value="{{ vm.value }}">' + 
                        '<label ng-bind="vm.label"></label>' +
                    '</div>' +
                '</div>',
            bindToController: true,
            controllerAs: 'vm',
            controller: [function () {
                var vm = this;
                vm.onChange = onChange;

                function onChange () {
                    if (!vm.disabled) {
                        vm.ngModel = vm.value;
                        vm.onToggle && vm.onToggle({
                            model: vm.ngModel
                        });
                    }
                }
            }]
        };
    }]);