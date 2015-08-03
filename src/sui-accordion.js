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