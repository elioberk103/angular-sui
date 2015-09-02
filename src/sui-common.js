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