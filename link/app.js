(function() {
'use strict';

angular.module('directiveApp', [])
.controller('ListController', ListController)
.factory('SweetsFactory', SweetsFactory)
.directive('listSweets', ListSweets)
.controller('ListDirectiveController', ListDirectiveController);

function ListSweets() {
    var ddo = {
        templateUrl: 'listitem.html',
        restrict: 'E', // Element
        scope: {
            items: '<',
            title: '@myTitle',
            badRemove: '=',
            onRemove: '&'
        },
        controller: 'ListDirectiveController as ctrl',
        // controllerAs: 'ctrl',
        bindToController: true,
        link: ListDirectiveLink
    };

    return ddo;
}

function ListDirectiveLink(scope, element, attrs, controller) {
    console.log('Link scope: ', scope);
    console.log('Link controller: ', controller);
    console.log('Link element: ', element);

    scope.$watch('ctrl.barfiInList()', function(newValue, oldValue) {
        console.log('Link old value: ', oldValue);
        console.log('Link new value: ', newValue);
        if (newValue === true) {
            displayWarning();
        } else {
            removeWarning();
        }
    });

    function displayWarning() {
/*        console.log(element.find('dom'));
        var warningElem = element.find('div');
        warningElem.css('display', 'block');*/
        var warningElem = element.find('div.error');
        warningElem.slideDown(900);
    };

    function removeWarning() {
/*        var warningElem = element.find('div');
        warningElem.css('display', 'none');*/

        var warningElem = element.find('div.error');
        warningElem.slideUp(900);
    };
};

function ListDirectiveController() {
    var lst = this;

    lst.barfiInList = function() {
        for (var i = 0; i < lst.items.length; i++) {
            var name = lst.items[i];
            if (name.toLowerCase().indexOf("barfi") !== -1)
                return true;
        }

        return false;
    }
}

function SweetsFactory() {
    var factory = function() {
        return new SweetsService();
    };

    return factory;
};

ListController.$inject = ['SweetsFactory'];
function ListController(SweetsFactory) {
    var list = this;
    var service = SweetsFactory();
    list.sweet = '';
    list.lastRemoved = '';
    list.addSweet = function() {
        service.addSweet(list.sweet);
    }

    list.removeSweet = function(idx) {
        service.removeSweet(idx);
    };

    list.removeItem = function(idx) {
        this.lastRemoved = "Last sweet removed: " + list.allsweets[idx];
        service.removeSweet(idx);
    };

    list.allsweets = service.getSweets();
}

function SweetsService() {
    var service = this;
    var sweets = [
        "Jalebi", "Gulabjam", "Basudi", "Pedha", "Mahim halva", "Sutarfeni",
        "Bundi ladu"
    ];

    service.addSweet = function(sweet) {
        console.log('Adding sweet');
        sweets.push(sweet);
        console.log(sweets);
    };

    service.getSweets = function() {
        return sweets;
    };

    service.removeSweet = function(idx) {
        if (idx != -1)
            sweets.splice(idx, 1);
    };
}

})();
