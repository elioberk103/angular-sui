describe('sui-accordion test', function () {
    var element, scope;
    beforeEach(module('sui.accordion'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        element = $compile(
            '<div sui-accordion on-switch="vm.onSwitch(model)">' +
                '<div sui-accordion-item ng-repeat="acc in vm.accordions" title="{{acc.title}}" active="acc.active">' +
                    '{{ acc.content }}' +
                '</div>' +
            '</div>')(scope);
    }));

    it("should have correct ui styles", function () {
        var vm = scope.vm = {
            accordions: [{
                active: true,
                title: 'Item One',
                content: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
            }, {
                title: 'Item Two',
                content: 'There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.'
            }, {
                title: 'Item Three',
                content: 'Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters. A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.'
            }],
            onSwitch: function (model) {
                vm.model = model.title;
            }
        };
        scope.$digest();

        var accordions = element.find('.sui-accordion');

        $(accordions[0]).find('.title').triggerHandler('click');
        expect(vm.accordions[0].active).to.be.false;
        expect(vm.model).to.equal('Item One');

        $(accordions[1]).find('.title').triggerHandler('click');
        expect(vm.accordions[1].active).to.be.true;
        expect(vm.model).to.equal('Item Two');

        $(accordions[2]).find('.title').triggerHandler('click');
        expect(vm.accordions[2].active).to.be.true;
        expect(vm.model).to.equal('Item Three');

        $(accordions[0]).find('.title').triggerHandler('click');
        expect(vm.accordions[0].active).to.be.true;
        expect(vm.model).to.equal('Item One');
    });
});