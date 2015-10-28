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