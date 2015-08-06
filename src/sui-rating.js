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
 * @param {int} ng-model <i class="exchange icon"></i>The selected value
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
            <div class="ui segment" ng-controller="demoCtrl as ctrl">
                <div sui-rating ng-model="ctrl.value" options="ctrl.options" 
                    on-rate="ctrl.onRate(model)" on-leave="ctrl.onLeave(model)" on-hover="ctrl.onHover(model)" 
                    size="{{ctrl.size}}" ui-style="{{ctrl.uiStyle}}" disabled="{{ctrl.disabled}}"></div>
                <div class="ui divider"></div>
                <button class="ui tiny negative button" ng-click="ctrl.toggleDisable()">Toggle disable</button>
                <button class="ui tiny primary button" ng-click="ctrl.setSize('mini')">mini</button>
                <button class="ui tiny primary button" ng-click="ctrl.setSize('tiny')">tiny</button>
                <button class="ui tiny primary button" ng-click="ctrl.setSize('small')">small</button>
                <button class="ui tiny primary button" ng-click="ctrl.setSize('')">normal</button>
                <button class="ui tiny primary button" ng-click="ctrl.setSize('large')">large</button>
                <button class="ui tiny primary button" ng-click="ctrl.setSize('huge')">huge</button>
                <button class="ui tiny primary button" ng-click="ctrl.setSize('massive')">massive</button>
                <div class="ui divider"></div>
                <button class="ui tiny primary button" ng-click="ctrl.setStyle('heart')">
                    <i class="heart icon"></i>
                    Heart Icon
                </button>
                <button class="ui tiny primary button" ng-click="ctrl.setStyle('star')">
                    <i class="star icon"></i>
                    Star Icon
                </button>
                <button class="ui tiny primary button" ng-click="ctrl.setStyle('')">
                    <i class="icon"></i>
                    Default Icon
                </button>
                <div class="ui positive message">{{ ctrl | json }}</div>
            </div>
        </file>
        <file name="app.js">
            angular.module('sui.rating')
                .controller('demoCtrl', [function () {
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
    .controller('suiRatingCtrl', ['$scope', function ($scope) {
        var vm = this;
        vm.hovered = NaN;
        vm.init = init;
        vm.rate = rate;
        vm.hover = hover;
        vm.leave = leave;

        var ngModelCtrl = {
            $setViewValue: angular.noop
        };

        function init (ngModelCtrl_) {
            ngModelCtrl = ngModelCtrl_;
            ngModelCtrl.$render = function () {
                vm.value = ngModelCtrl.$viewValue;
            };
        }

        function rate (v) {
            if (!vm.disabled) {
                ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue === v ? 0 : v);
                ngModelCtrl.$render();
                invokeHandler(vm.onRate, v);
            }
        }

        function hover (v) {
            if (!vm.disabled) {
                vm.hovered = v;
                invokeHandler(vm.onHover, v);
            }
        }

        function leave (v) {
            if (!vm.disabled) {
                vm.hovered = NaN;
                invokeHandler(vm.onLeave, v);
            }
        }

        function invokeHandler (fn, value) {
            fn && fn({
                model: value || vm.value
            });
        }

    }])
    .directive('suiRating', [function () {
        return {
            restrict: 'A',
            scope: {
                size: '@?',
                uiStyle: '@?',
                options: '=',
                disabled: '@?',
                onLeave: '&?',
                onHover: '&?',
                onRate: '&?'
            },
            require: ['suiRating', 'ngModel'],
            template: 
                '<div class="ui {{vm.uiStyle}} {{vm.size}} rating sui-rating">' +
                    '<i ng-repeat="v in vm.options track by $index" ng-mouseenter="vm.hover(v)" ng-mouseleave="vm.leave(v)" ng-click="vm.rate(v)" ' +
                        'ng-class="{ selected: v <= vm.hovered, active: v <= vm.value, disabled: vm.disabled }" class="icon"></i>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: 'suiRatingCtrl',
            link: function (scope, iElement, attrs, ctrls) {
                var ratingCtrl = ctrls[0];
                var ngModelCtrl = ctrls[1];
                ratingCtrl.init(ngModelCtrl);
            }
        };
    }]);
