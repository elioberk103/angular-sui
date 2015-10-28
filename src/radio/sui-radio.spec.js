/**
 * Created by carl.cai on 9/23/2015.
 */
describe('sui-radio test', function () {
    var element, scope;
    beforeEach(module('sui.radio'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        scope.vm = {
            radios: [{
                label: 'Green',
                value: 'greenColor'
            }, {
                label: 'Red',
                value: 'redColor'
            }, {
                label: 'Orange',
                value: 'orangeColor'
            }]
        };
        element = $compile('<div sui-radio-group inline="{{vm.inline}}" disabled="{{vm.disabled}}" options="vm.radios" model="vm.model" name="groupColor" on-check="vm.onCheck(model)"></div>')(scope);
    }));

    it("should update the model after checking radio options", function () {
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        rootElement.find('.sui-radio').first().trigger('click');
        expect(scope.vm.model).to.equal('greenColor');

        $(rootElement.find('.sui-radio')[2]).trigger('click');
        expect(scope.vm.model).to.equal('orangeColor');
    });

    it("should invoke the callback function", function () {
        scope.vm.onCheck = function(model) {
            scope.vm.logAfterChecking = 'The callback function is invoked: ' + model;
        };
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        rootElement.find('.sui-radio').first().trigger('click');
        expect(scope.vm.logAfterChecking).to.equal('The callback function is invoked: greenColor');
    });

    it("should be able to disable the checkbox", function () {
        scope.vm.disabled = true;
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        rootElement.find('.sui-radio').first().trigger('click');
        expect(rootElement.find('.sui-radio').attr('class')).to.contain('disabled');
        expect(scope.vm.model).to.equal(undefined);
    });
});
