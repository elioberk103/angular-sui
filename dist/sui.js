/**
 * @ngdoc directive
 * @name sui.accordion.directive:suiAccordion
 * @restrict AE
 * @element any
 * @description
 * Accordion to switch to different sub-sections. It has `ng-transclude: true` to include an array of directive {@link sui.accordion.directive:suiAccordionItem suiAccordionItem}.
 *
 * @scope
 * @param {function} on-switch Callback when switching between items
 *
 * @example
    <example module="sui.accordion">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment" ng-controller="demoCtrl as ctrl">
                <div sui-accordion on-switch="ctrl.onSwitch(model)">
                    <div sui-accordion-item ng-repeat="acc in ctrl.accordions" title="{{acc.title}}" active="acc.active">
                        {{ acc.content }}
                    </div>
                </div>
                <div class="ui positive message">
                    Selected item after callback: {{ ctrl.model | json }}
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.accordion')
            .controller('demoCtrl', ['$scope', function ($scope) {
                var vm = this;

                vm.accordions = [{
                    title: 'Item One',
                    content: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
                }, {
                    title: 'Item Two',
                    content: 'There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.',
                    active: true
                }, {
                    title: 'Item Three',
                    content: 'Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters. A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.'
                }];

                vm.onSwitch = function (model) {
                    vm.model = model.title;
                };
            }]);
        </file>
    </example>
 */

/**
 * @ngdoc directive
 * @name sui.accordion.directive:suiAccordionItem
 * @restrict AE
 * @scope
 * @element ANY
 * @description
 * The accordion item of `suiAccordion`. It requires the controller of its parent `suiAccordion`. So it cannot be used without `suiAccordion`.
 *
 * 
 * {@link sui.accordion.directive:suiAccordion#example Demo}
 *
 * @param {string} title Title 
 * @param {boolean} active Be active or not
 *
 */

angular.module('sui.accordion', [])
    .directive('suiAccordion', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                onSwitch: '&?'
            },
            transclude: true,
            replace: true,
            template: '<div ng-transclude class="ui styled fluid accordion"></div>',
            controller: ['$scope', function ($scope) {
                $scope.accordions = [];
                this.switch = function (accordion) {
                    angular.forEach($scope.accordions, function (acc) {
                        acc.active = (accordion === acc && !accordion.active) ? true: false;
                    });
                    $scope.onSwitch && $scope.onSwitch({
                        model: accordion
                    });
                };
                this.newAccordion = function (accordion) {
                    $scope.accordions.push(accordion);
                };
            }],
            link: function (scope, iElement, attrs) {
                // $timeout to wait for `ng-repeat` to finish
                $timeout(function () {
                    var titleNodes = iElement.find('.title');
                    if (titleNodes[0]) {
                        // hide the extra top border by Semantic-UI
                        angular.element(titleNodes[0]).css({
                            'border-top': 'none'
                        });
                    }
                });
            }
        };
    }])
    .directive('suiAccordionItem', [function () {
        return {
            restrict: 'A',
            scope: {
                title: '@',
                active: '='
            },
            require: '^suiAccordion',
            transclude: true,
            replace: true,
            template: 
                '<div class="sui-accordion">' +
                    '<div class="title" ng-class="{active: active}" ng-click="switch()">' +
                        '<i class="dropdown icon"></i>' +
                        '<span class="content" ng-bind="title"></span>' +
                    '</div>' +
                    '<div class="content animating" ng-class="{active: active}">' +
                        '<p ng-transclude class="transition animating fade in" ng-class="{visible: active, hidden: !active}" style="animation-duration: 350ms; -webkit-animation-duration: 350ms">' + 
                        '</p>' +
                    '</div>' +
                '</div>',
            link: function (scope, iElement, iAttrs, accordionCtrl) {
                accordionCtrl.newAccordion(scope);
                scope.switch = function () {
                    accordionCtrl.switch(scope);
                };
            }
        };
    }]);
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
            <div class="ui segment" ng-controller="demoCtrl as ctrl">
                <div sui-checkbox label="{{ctrl.data.one.label}}" ng-model="ctrl.data.one.checked" ui-style="" on-toggle="ctrl.onToggle(status)"></div>
                <div sui-checkbox label="{{ctrl.data.two.label}}" ng-model="ctrl.data.two.checked" disabled="{{ctrl.data.two.disabled}}" ui-style="toggle"></div>
                <div sui-checkbox label="{{ctrl.data.three.label}}" ng-model="ctrl.data.three.checked" ui-style="toggle"></div>
                <div sui-checkbox label="{{ctrl.data.four.label}}" ng-model="ctrl.data.four.checked" ui-style="slider"></div>
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
                        label: 'Slider',
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
 * @param {boolean} ng-model <i class="exchange icon"></i>The model of this directive
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
                ngModel: '=',
                label: '@',
                disabled: '@?',
                uiStyle: '@?',
                onToggle: '&?'
            },
            template: 
                '<div class="ui {{vm.uiStyle}} checkbox" ng-class="{disabled: vm.disabled}" ng-click="vm.onCheck()">' +
                    '<input type="checkbox" ng-model="vm.ngModel" ng-disabled="{{vm.disabled}}" class="hidden" ng-checked="vm.ngModel">' +
                    '<label ng-bind="vm.label"></label>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm.onCheck = onCheck;

                function onCheck() {
                    if (vm.disabled) {
                        return;
                    }
                    vm.ngModel = !vm.ngModel;
                    vm.onToggle && vm.onToggle({
                        status: vm.ngModel
                    });
                }
            }]
        };
    }]);

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
            <div class="ui segment" ng-controller="demoCtrl as ctrl">
                <div sui-progress percentage="ctrl.progress.percentage" active="{{ctrl.progress.active}}" 
                    show-percentage="{{ctrl.progress.showPercentage}}" 
                    bottom-attached="{{ctrl.progress.bottomAttached}}" 
                    top-attached="{{ctrl.progress.topAttached}}" 
                    indicating="true" label="Loading ({{ ctrl.progress.percentage }}%)...">
                    <div>Then content</div>
                </div>
                <div class="ui segment">
                    <div class="ui primary button" ng-click="ctrl.tiptap()">Start Progress</div>
                    <div class="ui primary button" ng-click="ctrl.attachedToContent()">Attach to top and bottom</div>
                </div>
                <div class="ui positive message">
                    {{ ctrl.progress | json }}
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.progress')
            .controller('demoCtrl', ['$interval', function ($interval) {
                var vm = this;
                vm.progress = {
                    percentage: 33,
                    showPercentage: true,
                    indicating: true,
                    label: 'We are working...',
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
                    '<div ng-show="!bottomAttached && !topAttached" class="ui {{type}} {{color}} {{size}} progress sui-progress" data-percent="{{ percentage }}" ' + 
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
