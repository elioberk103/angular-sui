/**
 * Created by carl.cai on 9/23/2015.
 */
describe('sui-select test', function () {
    var element, scope;
    beforeEach(module('sui.select'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        var selectedOption = {
            label: 'United States',
            value: 'us',
            icon: 'us flag'
        };
        scope.vm = {
            selected: selectedOption,
            countryOptions: [{
                label: 'China',
                value: 'cn',
                icon: 'cn flag'
            }, selectedOption, {
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
            }]
        };
        element = $compile('<div sui-select indicating-text="select a country" on-select="vm.onSelect(model)" options="vm.countryOptions" model="vm.selected" label="Country: " searchable="true" disabled="vm.disabled"></div>')(scope);
    }));

    it("should be able to show options on the dropdown list", function () {
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        var selectRoot = rootElement.find('.ui.selection');
        selectRoot.trigger('click');
        expect(selectRoot.attr('class')).to.contain('active');

        var firstOption = selectRoot.find('.item').first();
        expect(firstOption.find('i').attr('class')).to.equal('cn flag');

        setTimeout(function () {
            var options = rootElement.find('.menu .item');
            expect($(options[0]).attr('class')).not.to.contain('ng-hide');
            expect($(options[1]).attr('class')).not.to.contain('ng-hide');
            expect($(options[2]).attr('class')).not.to.contain('ng-hide');
            expect($(options[3]).attr('class')).not.to.contain('ng-hide');
            expect($(options[4]).attr('class')).not.to.contain('ng-hide');
        }, 100);
    });

    it("should modify the model value after selecting", function () {
        var vm = scope.vm;
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        var selectRoot = rootElement.find('.ui.selection');
        selectRoot.trigger('click');

        var firstOption = selectRoot.find('.item').first();
        firstOption.trigger('click');
        expect(vm.selected.value).to.equal('cn');

        var secondOption = firstOption.next();
        secondOption.trigger('click');
        expect(vm.selected.value).to.equal('us');
    });

    it("should invoke callback function after selecting", function () {
        var vm = scope.vm;
        vm.onSelect = function(model) {
            vm.logAfterSelecting = 'callback is invoked: ' + model.value;
        };
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        var selectRoot = rootElement.find('.ui.selection');
        selectRoot.trigger('click');
        var firstOption = selectRoot.find('.item').first();
        firstOption.trigger('click');

        expect(vm.logAfterSelecting).to.equal('callback is invoked: cn');
    });

    it("should filter options after typing keyword for searching", function () {
        var vm = scope.vm;
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        var searchInput = rootElement.find('input');
        searchInput.val('China');

        setTimeout(function () {
            var options = rootElement.find('.menu .item');
            expect(options.last().attr('class')).to.contain('ng-hide');
        }, 100);
    });

    it("should be able to disable the select", function () {
        scope.vm.disabled = true;
        scope.$digest();

        var rootElement = angular.element(element.children()[0]);
        var selectRoot = rootElement.find('.ui.selection');
        selectRoot.trigger('click');
        expect(selectRoot.attr('class')).to.contain('disabled');
        setTimeout(function () {
            var options = rootElement.find('.menu .item');
            expect($(options[0]).attr('class')).to.contain('ng-hide');
            expect($(options[1]).attr('class')).to.contain('ng-hide');
            expect($(options[2]).attr('class')).to.contain('ng-hide');
            expect($(options[3]).attr('class')).to.contain('ng-hide');
            expect($(options[4]).attr('class')).to.contain('ng-hide');
        }, 100);
    });
});
