describe('sui-loader test', function () {
    var element, scope;
    beforeEach(module('sui.loader'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        element = $compile('<div sui-loader active="vm.loader.active" size="{{vm.loader.size}}" dim-whole-page="vm.loader.dimWholePage" loading-text="Loading..."></div>')(scope);
    }));

    it("should have correct ui styles", function () {
        var vm = scope.vm = {
            loader: {
                active: true,
                dimWholePage: true,
                size: 'large'
            }
        };
        scope.$digest();
        expect(element.find('.dimmer').attr('class')).to.contain('active');
        expect(element.find('.dimmer').attr('class')).to.contain('page');
        expect(element.find('.loader').attr('class')).to.contain('large');
    });
});