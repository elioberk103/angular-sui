/**
 * @ngdoc directive
 * @name sui.radio.directive:suiRadioGroup
 * @element ANY
 * @restrict AE
 * @scope
 * @description
 * A form radio group.
 *
 * @example
    <example module="sui.radio">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment form" ng-controller="DemoController as vm">
                <div sui-radio-group inline="{{vm.inline}}" disabled="{{vm.disabled}}" options="vm.radios" model="vm.model" name="groupColor" on-check="vm.onCheck(model)"></div>
                <div class="ui segment">
                    <div class="ui primary button" ng-click="vm.toggleDisabled()">Toggle Disable</div>
                    <div class="ui primary button" ng-click="vm.toggleInline()">Toggle Inline</div>
                </div>
                <div class="ui positive message">
                    <p>Model: {{ vm.model }}</p>
                    <p>{{ vm.logAfterCheck }}</p>
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
                    value: 'greenColor'
                }, {
                    label: 'Red',
                    value: 'redColor'
                }, {
                    label: 'Orange',
                    value: 'orangeColor'
                }];

                vm.onCheck = function (model) {
                    vm.logAfterCheck = 'The radio-group callback function is called: ' + model;
                }

                vm.toggleDisabled = function () {
                    vm.disabled = vm.disabled ? '' : true;
                };
                vm.toggleInline = function () {
                    vm.inline = vm.inline ? '' : true;
                };
            }]);
        </file>
    </example>

 * @param {string} model <i class="exchange icon"></i>The value of selected item
 * @param {boolean} disabled Whether disabled or not
 * @param {array} options <i class="exchange icon"></i>A list of options to populate the radios. Every option should contain `label` and `value`.
 * @param {string} name Name of the radio group
 * @param {boolean} inline If `true`, the radio items are put as `inline` elements
 * @param {function} onCheck Callback function when checked.
 *
 */

angular.module('sui.radio', [])
    .directive('suiRadioGroup', [function () {
        return {
            restrict: 'AE',
            scope: {
                model: '=',
                options: '=',
                disabled: '@',
                inline: '@',
                name: '@',
                onCheck: '&'
            },
            template: 
                '<div class="ui sui-radio-group">' +
                    '<div class="ui radio checkbox sui-radio" ng-style="vm._getDisplayStyle()" ng-repeat="r in vm.options" ng-click="vm._onCheck(r.value)" ' +
                        'ng-class="{ checked: vm.model === r.value, disabled: vm.disabled }">' +
                        '<input type="radio" name="{{ vm.name }}" class="hidden" ng-model="vm.model" value="{{ r.value }}">' +
                        '<label ng-bind="r.label"></label>' +
                    '</div>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm._onCheck = _onCheck;
                vm._getDisplayStyle = _getDisplayStyle;

                function _getDisplayStyle() {
                    return {
                        "display": vm.inline ? "inline-block" : "block"
                    };
                }

                function _onCheck (value) {
                    if (vm.disabled) {
                        return;
                    }
                    vm.model = value;
                    vm.onCheck && vm.onCheck({
                        model: vm.model
                    });
                }
            }]
        };
    }]);