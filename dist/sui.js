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
            <div class="ui segment" ng-controller="DemoController as vm">
                <div class="ui segment">
                    <div>These four are defined through `sui-checkbox`:</div>
                    <div sui-checkbox label="{{vm.data.one.label}}" model="vm.data.one.checked" ui-style="" on-check="vm.onCheck(model)"></div>
                    <div sui-checkbox label="{{vm.data.two.label}}" model="vm.data.two.checked" disabled="{{vm.data.two.disabled}}" ui-style="toggle"></div>
                    <div sui-checkbox label="{{vm.data.three.label}}" model="vm.data.three.checked" ui-style="toggle"></div>
                    <div sui-checkbox label="{{vm.data.four.label}}" model="vm.data.four.checked" ui-style="slider"></div>
                </div>
                <div class="ui positive message">
                    <div>Status: {{ vm.data | json }}</div>
                    <div>After check: {{ vm.afterCheck }}</div>
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.checkbox')
            .controller('DemoController', ['$scope', function ($scope) {
                var vm = this;
                vm.data = {
                    one: {
                        label: 'Click to call `onCheck` function',
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
                vm.onCheck = function (model) {
                    vm.afterCheck = model;  
                };
            }]);
        </file>
    </example>
 
 * @restrict EA
 * @element ANY
 * @scope
 *
 * @param {string} label Label
 * @param {boolean} model <i class="exchange icon"></i>The model of this directive
 * @param {boolean} disabled Disabled or not
 * @param {enum} ui-style "`checkbox`" || "`toggle`" || "`slider`"
 * @param {function} on-check The function to be called when the checkbox is toggled.
 *
 */

/**
 * @ngdoc directive
 * @name sui.checkbox.directive:suiSliderCheckbox
 *
 * @description
 * Checkbox element with `ui-style` as `slider`.
 *
 * It is an alias of `suiCheckbox` with a specific UI style. Check {@link sui.checkbox.directive:suiCheckbox suiCheckbox}.
 *
 * @example
 <example module="sui.checkbox">
    <file name="index.html">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
        <div class="ui segment" ng-controller="DemoController as vm">
            <div class="ui segment">
                <div sui-slider-checkbox label="{{vm.data.label}}" model="vm.data.checked"></div>
            </div>
            <div class="ui positive message">
                <div>Status: {{ vm.data | json }}</div>
            </div>
        </div>
    </file>
    <file name="app.js">
    angular.module('sui.checkbox')
        .controller('DemoController', ['$scope', function ($scope) {
            var vm = this;
            vm.data = {
                label: 'I am a Slider',
                checked: true
            };
        }]);
    </file>
 </example>
 *
 * @restrict EA
 * @element ANY
 * @scope
 * @param {string} label Label
 * @param {boolean} model <i class="exchange icon"></i>The model of this directive
 * @param {boolean} disabled Disabled or not
 * @param {function} on-check The function to be called when the checkbox is toggled.
 */

/**
 * @ngdoc directive
 * @name sui.checkbox.directive:suiToggleCheckbox
 * @description
 * Checkbox element with `ui-style` as `toggle`.
 *
 * It is an alias of `suiCheckbox` with a specific UI style. Check {@link sui.checkbox.directive:suiCheckbox suiCheckbox}.
 *
  * @example
 <example module="sui.checkbox">
    <file name="index.html">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
        <div class="ui segment" ng-controller="DemoController as vm">
            <div class="ui segment">
                <div sui-toggle-checkbox label="{{vm.data.label}}" model="vm.data.checked"></div>
            </div>
            <div class="ui positive message">
                <div>Status: {{ vm.data | json }}</div>
            </div>
        </div>
    </file>
    <file name="app.js">
    angular.module('sui.checkbox')
        .controller('DemoController', ['$scope', function ($scope) {
            var vm = this;
            vm.data = {
                label: 'I am a Toggle',
                checked: true
            };
        }]);
    </file>
 </example>
 *
 * @restrict EA
 * @element ANY
 * @scope
 * @param {string} label Label
 * @param {boolean} model <i class="exchange icon"></i>The model of this directive
 * @param {boolean} disabled Disabled or not
 * @param {function} on-check The function to be called when the checkbox is toggled.
 */

/**
 * @ngdoc directive
 * @name sui.checkbox.directive:suiCheckboxGroup
 * @description
 * A checkbox group.
 * Check {@link sui.checkbox.directive:suiCheckbox suiCheckbox}.
 *
 * @example
    <example module="sui.checkbox">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment" ng-controller="DemoController as vm">
                <div class="ui segment">
                    <div>This is a `sui-checkbox-group`:</div>
                    <div sui-checkbox-group options="vm.options" model="vm.groupSelected"></div>
                </div>
                <div class="ui positive message">
                    <div>groupSelected: {{ vm.groupSelected }}</div>
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.checkbox')
            .controller('DemoController', ['$scope', function ($scope) {
                var vm = this;
                vm.options = [{
                    label: 'Orange',
                    value: 'orangeColor'
                }, {
                    label: 'Blue',
                    value: 'blueColor'
                }, {
                    label: 'Green',
                    value: 'greenColor'
                }, {
                    label: 'Red',
                    value: 'redColor'
                }];
                vm.groupSelected = ['redColor', 'blueColor'];
            }]);
        </file>
    </example>

 * @restrict EA
 * @element ANY
 * @scope
 *
 * @param {array} model <i class="exchange icon"></i>The values of selected items.
 * @param {boolean} disabled Disabled or not
 * @param {string} name Name for grouping
 * @param {array} options A list of options to populate the checkboxes. Every option should contain `label` and `value`.
 * @param {function} on-check The function to be called when the checkbox is toggled.
 *
 */

(function () {
    var checkboxApp = angular.module('sui.checkbox', []);

    var checkboxTypes = ['', 'Toggle', 'Slider'];
    angular.forEach(checkboxTypes, function (type) {
        checkboxApp.directive('sui' + type + 'Checkbox', function () {
            return {
                restrict: 'AE',
                scope: {
                    model: '=',
                    label: '@',
                    disabled: '@',
                    uiStyle: '@',
                    onCheck: '&',
                    name: '@'
                },
                template:
                '<div class="ui {{vm.uiStyle}} ' + type.toLowerCase() + ' checkbox" ng-class="{disabled: vm.disabled}" ng-click="vm.onClick()">' +
                '<input type="checkbox" name="{{vm.name}}" ng-model="vm.model" ng-disabled="{{vm.disabled}}" class="hidden" ng-checked="vm.model">' +
                '<label ng-bind="vm.label"></label>' +
                '</div>',
                controllerAs: 'vm',
                bindToController: true,
                controller: [function () {
                    var vm = this;
                    vm.onClick = onClick;

                    function onClick() {
                        if (vm.disabled) {
                            return;
                        }
                        vm.model = !vm.model;
                        vm.onCheck && vm.onCheck({
                            model: vm.model
                        });
                    }
                }]
            };
            });
    });

    checkboxApp.directive('suiCheckboxGroup', function () {
        return {
            restrict: 'AE',
            scope: {
                model: '=',
                disabled: '@',
                options: '=',
                name: '@',
                onCheck: '&'
            },
            template:
                '<div>' +
                    '<div sui-checkbox ng-repeat="r in vm.options" model="vm._checkedItems[r.value]" ' +
                        'label="{{r.label}}" ' +
                        'name="{{vm.name}}" ' +
                        'value="{{r.value}}" ' +
                        'on-check="vm._onCheck(r.value)">' +
                    '</div>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm._checkedItems = {};
                vm._onCheck = _onCheck;

                angular.forEach(vm.model, function (value) {
                   vm._checkedItems[value] = true;
                });

                function _onCheck (item) {
                    if (vm.disabled) {
                        return;
                    }

                    var index = vm.model.findIndex(function (v) {
                        return v === item;
                    });
                    index >= 0 ? vm.model.splice(index, 1) : vm.model.push(item);

                    vm.onCheck && vm.onCheck({
                        model: vm.model
                    });
                }
            }]
        };
    });
})();


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
                size: '@?',
                uiStyle: '@?',
                options: '=',
                disabled: '@',
                onLeave: '&',
                onHover: '&',
                onRate: '&'
            },
            require: ['suiRating', 'ngModel'],
            template: '<div class="ui {{vm.uiStyle}} {{vm.size}} rating sui-rating">' +
            '<i ng-repeat="v in vm.options track by $index" ng-mouseenter="vm._onHover(v)" ng-mouseleave="vm._onLeave(v)" ng-click="vm._onRate(v)" ' +
            'ng-class="{ selected: v <= vm.hovered, active: v <= vm.model, disabled: vm.disabled }" class="icon"></i>' +
            '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm.hovered = NaN;
                vm._onRate = _onRate;
                vm._onHover = _onHover;
                vm._onLeave = _onLeave;

                function _onRate(value) {
                    vm.model = value;
                    invokeHandler(vm.onRate, value);
                }

                function _onHover(value) {
                    invokeHandler(vm.onHover, value);
                }

                function _onLeave(value) {
                    vm.hovered = NaN;
                    invokeHandler(vm.onLeave, value);
                }

                function invokeHandler(fn, value) {
                    console.log('disabled: ' + vm.disabled);
                    if (!vm.disabled) {
                        vm.hovered = value;
                        fn && fn({
                            model: value || vm.model
                        });
                    }
                }
            }]
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