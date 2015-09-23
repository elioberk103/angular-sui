/**
 * Created by carl.cai on 9/23/2015.
 */
describe('sui-rating test', function () {
    var element, scope;
    beforeEach(module('sui.rating'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        element = $compile('<div sui-rating model="vm.value" options="vm.options" on-rate="vm.onRate(model)" on-leave="vm.onLeave(model)" on-hover="vm.onHover(model)" size="{{vm.size}}" ui-style="{{vm.uiStyle}}" disabled="{{vm.disabled}}"></div>')(scope);
    }));

    it("should have correct ui styles", function () {
        scope.vm = {
            value: 3,
            options: [1,3,5,8,13],
            uiStyle: 'heart',
            size: 'massive',
        };
        scope.$digest();

        //element.triggerHandler('mouseenter');
        expect(angular.element(element.children()[0]).attr('class')).to.equal('ui heart massive rating sui-rating');

    });

    it("should change the model correctly", function () {
        scope.vm = {
            value: 3,
            options: [1,3,5,8,13]
        };
        scope.$digest();
        var elementClicked = angular.element(element.find('i')[3]);
        elementClicked.triggerHandler('click');

        expect(scope.vm.value).to.equal(8);
    });

    it("should call the callback functions", function () {
        var vm = scope.vm = {
            value: 3,
            options: [1,3,5,8,13],
            onRate: function (model) {
                vm.rate = 'rate-' + model;
            },
            onHover: function (model) {
                vm.hover = 'hover-' + model;
            },
            onLeave: function (model) {
                vm.leave = 'leave-' + model;
            }
        };
        scope.$digest();

        var elementClicked = angular.element(element.find('i')[3]);
        elementClicked.triggerHandler('click');
        expect(vm.rate).to.equal('rate-8');

        var elementHovered = angular.element(element.find('i')[4]);
        elementHovered.triggerHandler('mouseenter');
        expect(vm.hover).to.equal('hover-13');

        var elementLeft = angular.element(element.find('i')[0]);
        elementLeft.triggerHandler('mouseleave');
        expect(vm.leave).to.equal('leave-1');

    });

    it("should be able to disable sui-rating", function () {
        var vm = scope.vm = {
            value: 3,
            options: [1,3,5,8,13],
            onRate: function (model) {
                vm.rate = 'rate-' + model;
            },
            onHover: function (model) {
                vm.hover = 'hover-' + model;
            },
            onLeave: function (model) {
                vm.leave = 'leave-' + model;
            },
            disabled: true
        };
        scope.$digest();

        var elementClicked = angular.element(element.find('i')[3]);
        elementClicked.triggerHandler('click');
        expect(vm.rate).to.equal(undefined);

        var elementHovered = angular.element(element.find('i')[4]);
        elementHovered.triggerHandler('mouseenter');
        expect(vm.hover).to.equal(undefined);

        var elementLeft = angular.element(element.find('i')[0]);
        elementLeft.triggerHandler('mouseleave');
        expect(vm.leave).to.equal(undefined);

        expect(vm.value).to.equal(3);
    });
});
