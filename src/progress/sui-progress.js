/**
 * @ngdoc directive
 * @name sui.progress.directive:suiProgress
 * @description
 * A progress bar.
 * 
 * @element ANY
 * @restrict AE
 * @scope
 *
 * @param {int} percentage <i class="exchange icon"></i>[0, 100] integer number indicating percentage
 * @param {enum} size "`mini`" || "`tiny`" || "`small`" || "`large`" || "`huge`" || "`massive`" || `empty`
 * @param {string} color Color of the bar
 * @param {boolean} disabled Disabled or not
 * @param {boolean} show-percentage Whether to show the percentage number on the bar
 * @param {boolean} bottom-attached Attach the bar to bottom of the transcluded content
 * @param {boolean} top-attached Attach the bar to top of the transcluded content
 * @param {enum} type "`success`" || "`warning`" || "`error`"
 * @param {boolean} active Whether show animation on the bar
 * @param {boolean} indicating If `true`: different color when the value is different. Colors are: gray->red->yellow->green
 * @param {string} label If not empty, display the label under the bar
 *
 * @example
 *  <div class="alert alert-error" role="alert">
 *      Note: The UI of this demo crashes because of CSS collision (`.progress`, `.label`) between Bootstrap and Semantic-UI. Please click The link "Edit in Plunker" to view.
 *  </div>
    <example module="sui.progress">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment" ng-controller="DemoCtrl as vm">
                <div sui-progress percentage="vm.progress.percentage" active="{{vm.progress.active}}"
                    show-percentage="{{vm.progress.showPercentage}}"
                    bottom-attached="{{vm.progress.bottomAttached}}"
                    top-attached="{{vm.progress.topAttached}}"
                    disabled="{{vm.progress.disabled}}"
                    indicating="true" label="Loading ({{ vm.progress.percentage }}%)...">
                    <div>Then content</div>
                </div>
                <div class="ui segment">
                    <div class="ui primary button" ng-click="vm.tiptap()">Start Progress</div>
                    <div class="ui primary button" ng-click="vm.attachedToContent()">Attach to top and bottom</div>
                    <div class="ui primary button" ng-click="vm.disable()">Disable</div>
                </div>
                <div class="ui positive message">
                    {{ vm.progress | json }}
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.progress')
            .controller('DemoCtrl', ['$interval', function ($interval) {
                var vm = this;
                vm.progress = {
                    percentage: 33,
                    showPercentage: true,
                    indicating: true,
                    active: true,
                    bottomAttached: '',
                    topAttached: ''
                };

                var t;
                vm.tiptap = function() {
                    if (t) {
                        return;
                    }
                    t = $interval(function() {
                        if (vm.progress.percentage >= 100) {
                            $interval.cancel(t);
                            t = null;
                        } else {
                            vm.progress.percentage++;
                        }
                    }, 1000);
                };
                vm.attachedToContent = function () {
                    vm.progress.bottomAttached = true;
                    vm.progress.topAttached = true;
                };
                vm.disable = function () {
                    vm.progress.disabled = true;
                };
            }]);
        </file>
    </example>
 */

angular.module('sui.progress', [])
    .directive('suiProgress', [function () {
        return {
            restrict: 'AE',
            scope: {
                percentage: '=',
                size: '@',
                color: '@',
                disabled: '@',
                showPercentage: '@',
                bottomAttached: '@',
                topAttached: '@', 
                type: '@',
                active: '@',
                indicating: '@',
                label: '@'
            },
            transclude: true,
            template:
                '<div class="ui segment sui-progress">' +
                    '<div ng-show="topAttached" ng-class="{active: active, indicating: indicating, disabled: disabled}" ' + 
                        'class="ui {{type}} {{color}} {{size}} top attached progress" data-percent="{{percentage}}">' +
                        '<div class="bar" style="{{animationStyle}} width: {{percentage}}%;"></div>' +
                    '</div>' +
                    '<div ng-show="topAttached || bottomAttached" ng-transclude></div>' +
                    '<div ng-show="bottomAttached" class="ui {{type}} {{color}} {{size}} bottom attached progress" data-percent="{{percentage}}" ' + 
                        'ng-class="{active: active, indicating: indicating, disabled: disabled}">' +
                        '<div class="bar" style="{{animationStyle}} width: {{percentage}}%;"></div>' +
                    '</div>' +
                    '<div ng-show="!bottomAttached && !topAttached" class="ui {{type}} {{color}} {{size}} progress" data-percent="{{ percentage }}" ' +
                        'ng-class="{active: active, indicating: indicating, disabled: disabled}">' +
                        '<div class="bar" style="{{animationStyle}} width: {{percentage}}%;">' +
                            '<div class="progress" ng-show="showPercentage">{{ percentage }}%</div>' +
                        '</div>' +
                        '<div ng-show="label" class="label" ng-bind="label"></div>' + 
                    '</div>' +
                '</div>',
            controller: ['$scope', function ($scope) {
                $scope.animationStyle = "transition-duration: 300ms; -webkit-transition-duration: 300ms; ";
            }]
        };
    }])