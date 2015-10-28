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
            <div class="ui segment" ng-controller="DemoCtrl as vm">
                <div sui-accordion on-switch="vm.onSwitch(model)">
                    <div sui-accordion-item ng-repeat="acc in vm.accordions" title="{{acc.title}}" active="acc.active">
                        {{ acc.content }}
                    </div>
                </div>
                <div class="ui positive message">
                    Selected item after callback: {{ vm.model | json }}
                </div>
            </div>
        </file>
        <file name="app.js">
        angular.module('sui.accordion')
            .controller('DemoCtrl', ['$scope', function ($scope) {
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
                    <p>This is a `sui-checkbox-group`:</p>
                    <div inline="{{vm.inline}}" sui-checkbox-group options="vm.options" disabled="{{vm.disabled}}" model="vm.groupSelected"></div>
                    <button class="ui tiny primary button" ng-click="vm.toggleDisabled()">Toggle disabled</button>
                    <button class="ui tiny primary button" ng-click="vm.toggleInline()">Toggle inline</button>
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
                vm.disabled = '';
                vm.toggleDisabled = function () {
                    vm.disabled = vm.disabled ? '' : 'true';
                };
                vm.toggleInline = function () {
                    vm.inline = vm.inline ? '' : 'true';
                };
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
                    '<div class="ui {{vm.uiStyle}} ' + type.toLowerCase() + ' checkbox sui-checkbox" ng-class="{disabled: vm.disabled}" ng-click="vm._onClick()">' +
                        '<input type="checkbox" name="{{vm.name}}" ng-model="vm.model" ng-disabled="{{vm.disabled}}" class="hidden" ng-checked="vm.model">' +
                        '<label ng-bind="vm.label"></label>' +
                    '</div>',
                controllerAs: 'vm',
                bindToController: true,
                controller: [function () {
                    var vm = this;
                    vm._onClick = _onClick;

                    function _onClick() {
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
                inline: '@',
                onCheck: '&'
            },
            template:
                '<div class="sui-checkbox-group">' +
                    '<div ng-style="vm._getDisplayStyle()" sui-checkbox ng-repeat="r in vm.options" model="vm._checkedItems[r.value]" ' +
                        'label="{{r.label}}" ' +
                        'name="{{vm.name}}" ' +
                        'value="{{r.value}}" ' +
                        'disabled="{{vm.disabled}}" ' +
                        'on-check="vm._onCheck(r.value)">' +
                    '</div>' +
                '</div>',
            controllerAs: 'vm',
            bindToController: true,
            controller: [function () {
                var vm = this;
                vm._checkedItems = {};
                vm._onCheck = _onCheck;
                vm._getDisplayStyle = _getDisplayStyle;

                angular.forEach(vm.model, function (value) {
                   vm._checkedItems[value] = true;
                });

                function _getDisplayStyle() {
                    return {
                        "display": vm.inline ? "inline-block" : "block"
                    };
                }

                function _onCheck (item) {
                    if (vm.disabled) {
                        return;
                    }

                    var index = -1;
                    angular.forEach(vm.model, function (value, i) {
                        if (item === value) {
                            index = i;
                        }
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

/**
 * @ngdoc directive
 * @name sui.select.directive:suiSelect
 * @element ANY
 * @restrict AE
 * @scope
 * @description
 * Form select field.
 *
 * @param {string} model <i class="exchange icon"></i>Value of the selected option
 * @param {object} options <i class="exchange icon"></i>Options of the select
 * @param {string} indicating-text Text when no default option is selected
 * @param {boolean} disabled The select is disabled or not
 * @param {string} label The text shown above the select
 * @param {boolean} searchable Whether searchable or not
 * @param {string} ajax-url If specified, go to fetch options from this URL
 *
 * @example
    <example module="sui.select">
        <file name="index.html">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css">
            <div class="ui segment form" ng-controller="DemoCtrl as vm">
                <div class="fields">
                    <div class="eight wide field">
                        <div sui-select indicating-text="select a country" on-select="vm.onSelect(model)" options="vm.countryOptions" model="vm.selected" label="Country: " searchable="true" disabled=""></div>
                    </div>
                    <div class="eight wide field">
                        <div sui-select indicating-text="click to load options" ajax-url="../json/form-options-country.json" label="Load options from some URL: " selected="vm.ajaxSelected" default-option="Click to fetch country list" searchable="true"></div>
                    </div>
                </div>
                <div class="ui positive message">
                    Country: {{ vm.selected }}; From Ajax: {{ vm.ajaxSelected }}; After change: {{ vm.valueAfterSelect }}
                </div>
            <div>
        </file>
        <file name="app.js">
        angular.module('sui.select')
            .controller('DemoCtrl', function () {
                var vm = this;
                vm.selected = {
                    label: 'United States',
                    value: 'us',
                    icon: 'us flag'
                };
                vm.ajaxSelected = '';
                vm.countryOptions = [{
                    label: 'China',
                    value: 'cn',
                    icon: 'cn flag'
                }, vm.selected, {
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
                vm.onSelect = function (model) {
                    vm.valueAfterSelect = model;
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
                model: '=',
                options: '=',
                indicatingText: '@',
                disabled: '@',
                label: '@',
                searchable: '@',
                ajaxUrl: '@',
                onSelect: '&'
            },
            controllerAs: 'vm',
            bindToController: true,
            template:
                '<div class="field sui-select" ng-class="{error: vm._failed}">' +
                    '<label ng-bind="label"></label>' +
                    '<div class="ui search selection dropdown" ng-class="{active: vm._isSelecting, disabled: vm.disabled}" ng-click="vm._loadOptions($event)">' +
                        '<select ng-model="vm.model.value">' +
                           '<option ng-repeat="opt in vm.options" value="{{opt.value}}" ng-bind="opt.label"></option>' +
                        '</select>' +
                        '<i class="dropdown icon"></i><div ng-show="vm._isLoading" class="ui active mini inline loader"></div> ' +
                        '<input class="search" ng-show="vm.searchable" ng-model="vm._keyword" ng-model-options="{debounce: 300}" ng-change="vm._search(vm._keyword)">' +
                        '<div class="text" ng-hide="vm._keyword || vm._isLoading" ng-class="{default: vm._noDefaultModel() }">' +
                            '<i ng-show="vm.model.icon" class="{{ vm.model.icon }}"></i>' +
                            '<span ng-bind="vm.model.label || vm.indicatingText"></span>' +
                        '</div>' +
                        '<div class="menu transition animating slide down in" ng-class="{visible: vm._isSelecting, _hidden: !vm._isSelecting}">' +
                            '<div class="item" ng-class="{active: vm._isSelected(opt), selected: vm._isSelected(opt)}"' +
                                'ng-click="vm._onSelect(opt, $event)" ng-repeat="opt in vm.options" ng-hide="opt._hidden">' +
                                '<i ng-show="opt.icon" class="{{ opt.icon }}"></i>' +
                                '<span ng-bind="opt.label"></span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>',
            controller: ['$scope', '$timeout', function ($scope, $timeout) {

                var vm = this;
                vm._search = _search;
                vm._onSelect = _onSelect;
                vm._isSelected = _isSelected;
                vm._indexOptions = _indexOptions;
                vm._reset = _reset;
                vm._noDefaultModel = _noDefaultModel;

                _indexOptions();

                // Index the all fields of the options
                function _indexOptions() {
                    vm._indexes = [];
                    angular.forEach(vm.options, function (field, index) {
                        var chainedFields = '';
                        angular.forEach(field, function (value, key) {
                            (key.indexOf('$') < 0) && (key !== '_hidden') && (chainedFields += value.toString().toLowerCase() + '***');
                        });
                        vm._indexes.push(chainedFields);
                    });
                }

                // Search the options
                function _search(keyword) {
                    $timeout(function () {
                        findInAllFields(keyword);
                    });

                    function findInAllFields (keyword) {
                        keyword = keyword.toLowerCase();
                        angular.forEach(vm._indexes, function(fieldString, index) {
                            var opt = vm.options[index];
                            opt._hidden = true;
                            (fieldString.indexOf(keyword) >= 0) && (opt._hidden = false);
                        });
                    }
                }

                // When clicking on some option on the dropdown
                function _onSelect(opt, $event) {
                    $event.stopPropagation();
                    vm.model = opt;
                    vm._reset();
                    vm.onSelect && vm.onSelect({
                        model: vm.model
                    });
                }

                // Reset all flags on the view model
                function _reset() {
                    angular.forEach(vm.options, function (opts) {
                        opts._hidden = false;
                    });
                    vm._keyword = '';
                    vm._isSelecting = false;
                    vm._isLoading = false;
                    vm._failed = false;
                };

                // Check whether an option is selected
                function _isSelected(opt) {
                    return vm.model === opt;
                }

                function _noDefaultModel() {
                    return !(vm.model && vm.model.hasOwnProperty('value'));
                }

            }],
            link: function (scope, iElement, attrs) {
                var vm = scope.vm;
                vm._loadOptions = _loadOptions;

                function _loadOptions($event) {
                    $event.stopPropagation();

                    if (!vm.options && vm.ajaxUrl) {
                        vm._isLoading = true;
                        $http.get(vm.ajaxUrl).success(function (data) {
                            vm.options = data.options;
                            vm._indexOptions();
                            vm._reset();
                            vm._isSelecting = true;
                        }).error(function () {
                            console.error('_failed to load options from ' + scope.ajaxUrl);
                            vm._reset();
                            vm._failed = true;
                        });
                    }

                    if (vm._isSelecting && vm.searchable) {
                        return;
                    }

                    vm._isSelecting = !vm._isSelecting;
                    vm._isSelecting ? $document.on('click', clickToHideSelect) : $document.off('click', clickToHideSelect);

                    function clickToHideSelect(e) {
                        scope.$apply(function () {
                            vm._reset();
                        });
                    }
                };
            }
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

angular.module('sui.menu', [])
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
               '<div class="ui dropdown sui-dropdown-menu" ng-mouseenter="vm.active = true" ng-mouseleave="vm.active = false" ' +
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