/**
 * Created by carl.cai on 9/23/2015.
 */
describe('sui-checkbox test', function () {
    var element, scope;
    beforeEach(module('sui.checkbox'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        element = $compile('<div sui-checkbox disabled="{{vm.data.disabled}}" label="{{vm.data.label}}" on-check="vm.onCheck(model)" model="vm.data.checked" ui-style="slider"></div>')(scope);
    }));

    it("should show correct UI style", function () {
        scope.$digest();
        var rootElement = angular.element(element.children()[0]);
        expect(rootElement.attr('class')).to.contain('slider');
    });

    it("should invoke the callback function", function () {
        var vm = scope.vm = {
            data: {
                label: 'My Checkbox',
                checked: false
            },
            onCheck: function (model) {
                vm.value = 'onCheck is called: ' + model;
            }
        };
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        rootElement.triggerHandler('click');
        expect(vm.value).to.equal('onCheck is called: true');
        rootElement.triggerHandler('click');
        expect(vm.value).to.equal('onCheck is called: false');
    });

    it("should be able to disable the checkbox", function () {
        var vm = scope.vm = {
            data: {
                label: 'My Checkbox',
                checked: true,
                disabled: true
            },
            onCheck: function (model) {
                vm.value = 'onCheck is called: ' + model;
            }
        };
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        expect(rootElement.attr('class')).to.contain('disabled');
        rootElement.triggerHandler('click');
        expect(vm.value).to.equal(undefined);
        rootElement.triggerHandler('click');
        expect(vm.value).to.equal(undefined);
    });
});
