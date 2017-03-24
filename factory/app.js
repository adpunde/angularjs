(function() {
'use strict';

angular.module('serviceApp', [])
.controller('ShowController', ShowController)
.controller('AddController', AddController)
.factory('SweetsFactory', SweetsFactory);

function SweetsFactory() {
    var factory = function() {
        return new SweetsService();
    };

    return factory;
};

ShowController.$inject = ['SweetsFactory'];
function ShowController(SweetsFactory) {
    var show = this;
    var service = SweetsFactory();
    show.sweets = service.getSweets();
}

AddController.$inject = ['SweetsFactory'];
function AddController(SweetsFactory) {
    var add = this;
    var service = SweetsFactory();
    add.sweet = '';
    add.addSweet = function() {
        service.addSweet(add.sweet);
    }

    add.remove = '';
    add.removeSweet = function() {
        service.removeSweet(add.remove);
    };
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
    };

    service.getSweets = function() {
        return sweets;
    };

    service.removeSweet = function(sweet) {
        var idx = sweets.indexOf(sweet);
        if (idx != -1)
            sweets.splice(idx, 1);
    };
}

})();
