/**
 * @ngdoc directive
 * @name sui.rating.directiv:suiRating
 * @description
 * Rating directive
 *
 * @restrict EA
 * @element ANY
 * @scope
 *
 * @param {int} model <i class="exchange icon"></i>The selected value
 * @param {enum} size "`mini`" || "`tiny`" || "`small`" || "`large`" || "`huge`" || "`massive`" || `empty`
 * @param {enum} ui-style "`star`" || "`heart`"
 * @param {array} options <i class="exchange icon"></i> Array of integer values, e.g., `[1, 2, 3, 5, 8, 13]`
 * @param {boolean} disabled Disabled or not
 * @param {function} on-leave Callback when leaving the rating
 * @param {function} on-hover Callback when hovering the rating
 * @param {function} on-rate  Callback when confirming the rating
 *
 * @example
    <example module="sui.rating">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment" ng-controller="DemoController as vm">
                <div sui-rating model="vm.value" options="vm.options"
                    on-rate="vm.onRate(model)" on-leave="vm.onLeave(model)" on-hover="vm.onHover(model)"
                    size="{{vm.size}}" ui-style="{{vm.uiStyle}}" disabled="{{vm.disabled}}"></div>
                <div class="ui divider"></div>
                <button class="ui tiny negative button" ng-click="vm.toggleDisable()">Toggle disable</button>
                <button class="ui tiny primary button" ng-click="vm.setSize('mini')">mini</button>
                <button class="ui tiny primary button" ng-click="vm.setSize('tiny')">tiny</button>
                <button class="ui tiny primary button" ng-click="vm.setSize('small')">small</button>
                <button class="ui tiny primary button" ng-click="vm.setSize('')">normal</button>
                <button class="ui tiny primary button" ng-click="vm.setSize('large')">large</button>
                <button class="ui tiny primary button" ng-click="vm.setSize('huge')">huge</button>
                <button class="ui tiny primary button" ng-click="vm.setSize('massive')">massive</button>
                <div class="ui divider"></div>
                <button class="ui tiny primary button" ng-click="vm.setStyle('heart')">
                    <i class="heart icon"></i>
                    Heart Icon
                </button>
                <button class="ui tiny primary button" ng-click="vm.setStyle('star')">
                    <i class="star icon"></i>
                    Star Icon
                </button>
                <button class="ui tiny primary button" ng-click="vm.setStyle('')">
                    <i class="icon"></i>
                    Default Icon
                </button>
                <div class="ui positive message">{{ vm | json }}</div>
            </div>
        </file>
        <file name="app.js">
            angular.module('sui.rating')
                .controller('DemoController', [function () {
                    var vm = this;

                    vm.options = [1, 2, 3, 5, 8, 13];
                    vm.size = "huge";
                    vm.uiStyle = "heart";
                    vm.disabled = '';
                    vm.value = 5;

                    vm.toggleDisable = function () {
                        vm.disabled = vm.disabled ? '' : 'true';
                    };
                    vm.setSize = function (s) {
                        vm.size = s;
                    };
                    vm.setStyle = function (s) {
                        vm.uiStyle = s;
                    };
                    vm.onHover = function (value) {
                        vm.hover = 'Callback hover: ' + value;  
                    };
                    vm.onLeave = function (value) {
                        vm.leave = 'Callback leave: ' + value;  
                    };
                    vm.onRate = function (value) {
                        vm.rate = 'Callback rate: ' + value;  
                    };
                }]);
        </file>
    </example>
 */

angular.module('sui.rating', [])
    .directive('suiRating', [function () {
        return {
            restrict: 'A',
            scope: {
                model: '=',
                size: '@',
                uiStyle: '@',
                options: '=',
                disabled: '@',
                onLeave: '&',
                onHover: '&',
                onRate: '&'
            },
            template:
                '<div class="ui {{vm.uiStyle}} {{vm.size}} rating sui-rating">' +
                    '<i ng-repeat="v in vm.options track by $index" ng-mouseenter="vm._onHover(v)" ng-mouseleave="vm._onLeave(v)" ng-click="vm._onRate(v)" ' +
                        'ng-class="{ selected: v <= vm._hovered, active: v <= vm.model, disabled: vm.disabled }" class="icon"></i>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm._hovered = NaN;
                vm._onRate = _onRate;
                vm._onHover = _onHover;
                vm._onLeave = _onLeave;

                function _onRate(value) {
                    !vm.disabled && (vm.model = value);
                    invokeHandler(vm.onRate, value);
                }

                function _onHover(value) {
                    invokeHandler(vm.onHover, value);
                }

                function _onLeave(value) {
                    vm._hovered = NaN;
                    invokeHandler(vm.onLeave, value);
                }

                function invokeHandler(fn, value) {
                    if (!vm.disabled) {
                        vm._hovered = value;
                        fn && fn({
                            model: value || vm.model
                        });
                    }
                }
            }]
        };
    }]);
