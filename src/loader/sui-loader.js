/**
 * @ngdoc directive
 * @name sui.loader.directive:suiLoader
 * @element ANY
 * @restrict AE
 * @scope
 * 
 * @description 
 * A dimmed loader background when you are loading something.
 *
 * @example
    <example module="sui.loader">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment" ng-controller="DemoCtrl as vm">
                <div sui-loader active="vm.loader.active" size="{{vm.loader.size}}"
                    dim-whole-page="vm.loader.dimWholePage" loading-text="Loading...">
                    <div class="ui positive message">
                        {{ vm.loader | json }}
                    </div>
                </div>
                <div>
                    <button class="ui primary button" ng-click="vm.toggle()">Toggle loader</button>
                    <button class="ui primary button" ng-click="vm.toggleDimmingWholePage()">Toggle dimming whole page</button>
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.loader')
        .controller('DemoCtrl', ['$scope', function ($scope) {
            var vm = this;
            vm.loader = {
                active: false,
                dimWholePage: false,
                size: 'small'
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

 * @param {string} loading-text The text to be displayed under the spinner icon
 * @param {boolean} active <i class="exchange icon"></i>To display dimmer or not
 * @param {enum} size "`mini`" || "`tiny`" || "`small`" || "`large`" || "`huge`" || "`massive`" || `empty`
 * @param {boolean} dim-whole-page <i class="exchange icon"></i>To dim the whole page or not
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