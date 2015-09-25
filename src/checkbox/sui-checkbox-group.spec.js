describe('sui-checkbox-group test', function () {
    var element, scope;
    beforeEach(module('sui.checkbox'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        element = $compile('<div sui-checkbox-group options="vm.options" model="vm.groupSelected"></div>')(scope);
    }));

    it("should update the model when selecting", function () {
        var vm = scope.vm = {};
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
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        expect(rootElement.attr('class')).to.contain('sui-checkbox-group');
    });
});