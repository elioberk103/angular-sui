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