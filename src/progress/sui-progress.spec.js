describe('sui-progress test', function () {
    var element, scope;
    beforeEach(module('sui.progress'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        element = $compile(
            '<div sui-progress percentage="vm.progress.percentage" active="{{vm.progress.active}}"' +
                'show-percentage="{{vm.progress.showPercentage}}"' +
                'bottom-attached="{{vm.progress.bottomAttached}}"' +
                'top-attached="{{vm.progress.topAttached}}"' +
                'indicating="true" label="Loading ({{ vm.progress.percentage }}%)...">' +
                '<div>Then content</div>' +
            '</div>')(scope);
    }));

    it("should have correct ui styles", function () {
        var vm = scope.vm = {
            progress: {
                percentage: 33,
                showPercentage: true,
                indicating: true,
                active: true,
                bottomAttached: '',
                topAttached: ''
            }
        };
        scope.$digest();
        expect(element.find('.label').text()).to.equal('Loading (' + vm.progress.percentage + '%)...');
        expect(element.find('.bottom').attr('class')).to.contain('active');
        expect(element.find('.bottom').attr('class')).to.contain('indicating');
    });
});