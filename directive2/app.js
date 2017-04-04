(function() {
'use strict';

angular.module('directiveApp', [])
.controller('AddController', AddController)
.controller('AddController2', AddController2)
.factory('SweetsFactory', SweetsFactory)
.directive('listSweets', ListSweets);

function ListSweets() {
    var ddo = {
        templateUrl: 'listitem.html',
        restrict: 'E', // Element
        scope: {
            add: '=myAdd',
            title: '@myTitle'
        }
    };

    return ddo;
}

function SweetsFactory() {
    var factory = function() {
        return new SweetsService();
    };

    return factory;
};

AddController.$inject = ['SweetsFactory'];
function AddController(SweetsFactory) {
    var add = this;
    var service = SweetsFactory();
    add.sweet = '';
    add.addSweet = function() {
        service.addSweet(add.sweet);
    }

    add.removeSweet = function(idx) {
        service.removeSweet(idx);
    };

    add.allsweets = service.getSweets();
}

AddController2.$inject = ['SweetsFactory'];
function AddController2(SweetsFactory) {
    var add = this;
    var service = SweetsFactory();
    add.sweet = '';
    add.addSweet = function() {
        service.addSweet(add.sweet);
    }

    add.removeSweet = function(idx) {
        service.removeSweet(idx);
    };

    add.allsweets = service.getSweets();
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
