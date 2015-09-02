/**
 * @ngdoc directive
 * @name sui.common.directive: suiCommon
 * @description
 *      Accepts common parameters like `color`, `size`, to its parent directive.
 * @restrict A
 * @param {enum} color `red` || `orange` || `yellow` || `olive` || `green` || `teal` || `blue` || `violet` || `purple` || `pink` || `brown` || `grey`
 * @param {enum} size `mini` || `tiny` || `small` || `large` || `huge` || `massive` || `empty`
 * @param {enum} icon Any https://fortawesome.github.io/Font-Awesome/icons/ icon name
 * @param {boolean} disabled Whether disabled or not
 * @param {boolean} inverted Inverted or not
 * @param {boolean} active Whether active or not
 * @param {boolean} vertical Whether vertical or not
 * @parem {string} label The text to be displayed
 */
angular.module('sui.common', [])
    .constant('sharedParameters', [
        'color',
        'size',
        'icon',
        'disabled',
        'inverted',
        'active',
        'vertical',
        'label'
    ])
    .directive('suiCommon', ['sharedParameters', function (sharedParameters) {
        return {
            restrict: 'A',
            link: function (scope, iElement) {
                var $parentScope = scope.$parent;
                var $parentElement = iElement.parent();
                angular.forEach(sharedParameters, function (paramKey) {
                    $parentScope[paramKey] = $parentElement.attr(paramKey);
                });
            }
        }
    }]);
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
                onSwitch: '&'
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
                <div sui-checkbox label="{{ctrl.data.one.label}}" ng-model="ctrl.data.one.checked" ui-style="" on-toggle="ctrl.onToggle(model)"></div>
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
                vm.onToggle = function (model) {
                    vm.afterToggle = model;  
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
                disabled: '@',
                uiStyle: '@',
                onToggle: '&',
                name: '@'
            },
            template: 
                '<div class="ui {{vm.uiStyle}} checkbox" ng-class="{disabled: vm.disabled}" ng-click="vm.onCheck()">' +
                    '<input type="checkbox" name="{{vm.name}}" ng-model="vm.ngModel" ng-disabled="{{vm.disabled}}" class="hidden" ng-checked="vm.ngModel">' +
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
                        model: vm.ngModel
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
 * @name sui.menu.directive: suiDropdownMenu
 * @description
 * Dropdown menu. When hovered, the menus is displayed.
 *
 * @scope
 * @restrict AE
 * @element ANY
 *
 * @example
 *  <example module="sui.menu">
 *      <file name="index.html">
 *          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
 *          <div ng-controller="demoCtrl as ctrl">
 *              <div size="Large" label="Dropdown Menu" icon="wrench" sui-dropdown-menu options="ctrl.options"></div>
 *          </div>
 *      </file>
 *      <file name="app.js">
 *          angular.module('sui.menu')
 *              .controller('demoCtrl', ['$scope', function ($scope) {
 *                  this.options = [{
 *                      value: 'zero',
 *                      label: 'Option Zero'
 *                  }, {
 *                      value: 'One',
 *                      label: 'Option One'
 *                  }, {
 *                      value: 'Two',
 *                      label: 'Option Two'
 *                  }];
 *              }]);
 *      </file>
 *  </example>
 */

angular.module('sui.menu', ['sui.common'])
    .directive('suiDropdownMenu', function () {
       return {
           restrict: 'AE',
           scope: {
               options: '=',
               selected: '=',
               label: '@',
               icon: '@',
               dropdownIcon: '@',
               size: '@',
               color: '@',
               disabled: '@',
               onChange: '&'
           },
           template:
               '<div sui-common class="ui dropdown sui-dropdown-menu" ng-mouseenter="vm.active = true" ng-mouseleave="vm.active = false" ' +
                   'ng-class="{\'visible active\': vm.active}">' +
                   '<i ng-show="vm.icon" class="{{vm.icon}} icon"></i>' +
                   '{{vm.label}}' +
                   '<i class="{{vm.dropdownIcon || \'dropdown\'}} icon"></i>' +
                   '<div class="menu" ng-class="{\'visible transition slide down\': vm.active}">' +
                       '<div class="item" ng-repeat="opt in vm.options" ng-bind="opt.label"></div>' +
                   '</div>' +
               '</div>',
           bindToController: true,
           controllerAs: 'vm',
           controller: ['$scope', function ($scope) {
           }]
       }
    });
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
                onChange: '&',
                inline: '@'
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
                disabled: '@',
                onLeave: '&',
                onHover: '&',
                onRate: '&'
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

/**
 * @ngdoc directive
 * @name sui.select.directive:suiSelect
 * @element ANY
 * @restrict AE
 * @scope
 * @description
 * Form select field.
 *
 * @param {boolean} disabled The select is disabled or not
 * @param {string} label The text shown above the select
 * @param {string} selected <i class="exchange icon"></i>Value of the selected option
 * @param {object} options <i class="exchange icon"></i>Options of the select
 * @param {string} defaultOption Default text in gray color; if null, the first option is selected
 * @param {boolean} searchable Whether searchable or not
 * @param {string} ajaxUrl If specified, go to fetch options from this URL
 *
 * @example
    <example module="sui.select">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment form" ng-controller="demoCtrl as ctrl">
                <div class="fields">
                    <div class="eight wide field">
                        <div sui-select on-change="ctrl.onChange(selected)" options="ctrl.countryOptions" selected="ctrl.selected" label="Country: " default-option="uk" searchable="true"></div>
                    </div>
                    <div class="eight wide field">
                        <div sui-select ajax-url="../json/form-options-country.json" label="Load options from some URL: " selected="ctrl.ajaxSelected" default-option="Click to fetch country list" searchable="true"></div>
                    </div>
                </div>
                <div class="ui positive message">
                    Country: {{ ctrl.selected }}; From Ajax: {{ ctrl.ajaxSelected }}; After change: {{ ctrl.valueAfterSelect }}
                </div>
            <div>
        </file>
        <file name="app.js">
        angular.module('sui.select')
            .controller('demoCtrl', function () {
                var vm = this;
                vm.selected = '';
                vm.ajaxSelected = '';
                vm.countryOptions = [{
                    label: 'China',
                    value: 'cn',
                    icon: 'cn flag'
                }, {
                    label: 'United States',
                    value: 'us',
                    icon: 'us flag'
                }, {
                    label: 'Russia',
                    value: 'ru',
                    icon: 'ru flag'
                }, {
                    label: 'United Kingdom',
                    value: 'uk',
                    icon: 'uk flag'
                }, {
                    label: 'Philippines',
                    value: 'ph',
                    icon: 'ph flag'
                }];
                vm.onChange = function (selected) {
                    vm.valueAfterSelect = selected;
                };
            });
        </file>
    </example>
 */

angular.module('sui.select', [])
    .directive('suiSelect', ['$document', '$http', '$timeout', function ($document, $http, $timeout) {
        return {
            restrict: 'AE',
            scope: {
                disabled: '@',      // {Boolean} Indicate whether the whole select menu is disabled
                label: '@',         // {String}  Label to be displayed as beside the select
                selected: '=',      // {String}  Value of the selected option
                options: '=',       // {Object}  Options of the select
                defaultOption: '@', // {String}  Default text in gray color; if null, the first option is selected
                searchable: '@',    // {Boolean} The menu is searchable
                ajaxUrl: '@',       // {String}  If specified, go to fetch options from this URL
                onChange: '&'       // {Function} The callback after changing
            },
            transclude: true,
            template: 
                '<div class="field sui-select" ng-class="{error: _failed}">' +
                    '<label ng-bind="label"></label>' +
                    '<div class="ui search selection dropdown" ng-class="{active: _isSelecting, disabled: disabled}" ng-click="onSelect($event)">' +
                        '<select ng-model="selected">' +
                           '<option ng-repeat="opt in options" value="{{opt.value}}" ng-bind="opt.label"></option>' +
                        '</select>' +
                        '<i class="dropdown icon"></i><div ng-show="_isLoading" class="ui active mini inline loader"></div> ' +
                        '<input class="search"" ng-show="searchable" ng-model="_keyword" ng-model-options="{debounce: 300}" ng-change="search(_keyword)">' +
                        '<div class="text" ng-hide="_keyword || _isLoading" ng-class="{default: !selected}">' + 
                            '<i ng-show="_selectedOption.icon" class="{{ _selectedOption.icon }}"></i>' +
                            '<span ng-bind="_selectedOption ? _selectedOption.label : defaultOption"></span>' +
                        '</div>' +
                        '<div class="menu transition animating slide down in" ng-class="{visible: _isSelecting, _hidden: !_isSelecting}">' +
                            '<div class="item" ng-class="{active: isSelected(opt), selected: isSelected(opt)}"' + 
                                'ng-click="onSelectOption(opt, $event)" ng-repeat="opt in options" ng-hide="opt._hidden">' + 
                                '<i ng-show="opt.icon" class="{{ opt.icon }}"></i>' + 
                                '<span ng-bind="opt.label"></span>' +
                            '</div>' + 
                        '</div>' +
                    '</div>' +
                '</div>',
            controller: ['$scope', '$timeout', function ($scope, $timeout) {
                $scope.defaultOption && angular.forEach($scope.options, function (opt) {
                    if (opt.value === $scope.defaultOption) {
                        $scope._selectedOption = opt;
                        $scope.selected = opt.value;
                    }
                });

                $scope.search = function (_keyword) {
                    $timeout(function () {
                        findInAllFields(_keyword);
                    });
                };

                function findInAllFields (_keyword) {
                    _keyword = _keyword.toLowerCase();
                    angular.forEach($scope._indexes, function(fieldString, index) {
                        var opt = $scope.options[index];
                        opt._hidden = true;
                        (fieldString.indexOf(_keyword) >= 0) && (opt._hidden = false);
                    });
                }

                $scope.onSelectOption = function (opt, $event) {
                    $event.stopPropagation();
                    $scope._selectedOption = opt;
                    $scope.selected = opt.value;
                    $scope.resetFlags();
                    $scope.onChange && $scope.onChange({
                        selected: $scope.selected
                    });
                };

                $scope.isSelected = function (opt) {
                    return $scope.selected === opt.value;
                };

                $scope.resetFlags = function () {
                    angular.forEach($scope.options, function (opts) {
                        opts._hidden = false;
                    });
                    $scope._keyword = '';
                    $scope._isSelecting = false;
                };
            }],
            link: function (scope, iElement, attrs) {
                indexOptions();

                scope.onSelect = function ($event) {
                    $event.stopPropagation();

                    if (!scope.options && scope.ajaxUrl) {
                        scope._isLoading = true;
                        $http.get(scope.ajaxUrl).success(function (data) {
                            scope.options = data.options;
                            indexOptions();
                            scope._isLoading = false;
                            scope._failed = false;
                        }).error(function () {
                            console.error('_failed to load options from ' + scope.ajaxUrl);
                            scope._isLoading = false;
                            scope._failed = true;
                        });
                    }

                    if (scope._isSelecting && scope.searchable) {
                        return;
                    }
                    scope._isSelecting = !scope._isSelecting;
                    if (scope._isSelecting) {
                        $document.on('click', clickToHideSelect);
                    } else {
                        $document.off('click', clickToHideSelect);
                    }
                };

                function indexOptions () {
                    scope._indexes = [];
                    angular.forEach(scope.options, function (field, index) {
                        var chainedFields = '';
                        angular.forEach(field, function (value, key) {
                            (key.indexOf('$') < 0) && (key !== '_hidden') && (chainedFields += value.toString().toLowerCase() + '***');
                        });
                        scope._indexes.push(chainedFields);
                    });
                }

                function clickToHideSelect(e) {
                    scope.$apply(function () {
                        scope.resetFlags();
                    });
                }
            }
        };
    }]);