/**
 * @ngdoc directive
 * @name sui.loader.directive:suiLoader
 * @description 
 * A dimmed loader background when you are loading something.
 *
 * @example
    <example module="sui.loader">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment" ng-controller="demoCtrl as ctrl">
                <div sui-loader active="ctrl.loader.active" size="{{ctrl.loader.size}}"
                    dim-whole-page="ctrl.loader.dimWholePage" loading-text="Loading...">
                    <div class="ui positive message">
                        {{ ctrl.loader | json }}
                    </div>
                </div>
                <div>
                    <button class="ui primary button" ng-click="ctrl.toggle()">Toggle loader</button>
                    <button class="ui primary button" ng-click="ctrl.toggleDimmingWholePage()">Toggle dimming whole page</button>
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.loader')
        .controller('demoCtrl', ['$scope', function ($scope) {
            var vm = this;
            vm.loader = {
                active: false,
                dimWholePage: false,
                size: 'massive'
            };
            vm.toggle = function () {
                vm.loader.active = !vm.loader.active;
            };
            vm.toggleDimmingWholePage = function () {
                vm.loader.dimWholePage = !vm.loader.dimWholePage;
            };
        }]);
        </file>
    </example>
 */

angular.module('sui.loader', [])
    .directive('suiLoader', [function () {
        return {
            restrict: 'AE',
            scope: {
                loadingText: '@',
                active: '=',
                size: '@',
                dimWholePage: '='
            },
            transclude: true,
            template: 
                '<div class="ui segment sui-loader">' +
                    '<div class="ui dimmer" ng-class="{active: active, page: dimWholePage}">' +
                        '<div ng-bind="loadingText" class="ui {{size}} text loader"></div>' +
                    '</div>' +
                    '<div ng-transclude></div>' +
                '</div>'
        };
    }]);