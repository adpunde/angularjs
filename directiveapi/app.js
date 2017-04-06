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
        bindToController: true
    };

    return ddo;
}

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
