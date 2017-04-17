(function() {
'use strict';

angular.module('ListApp')
.factory('SweetsFactory', SweetsFactory);

function SweetsFactory() {
    var factory = function() {
        return new SweetsService();
    };

    return factory;
};

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
