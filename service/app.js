(function() {
'use strict';

angular.module('serviceApp', [])
.controller('ShowController', ShowController)
.controller('AddController', AddController)
.service('SweetsService', SweetsService);

ShowController.$inject = ['SweetsService'];
function ShowController(SweetsService) {
    var show = this;
    show.sweets = SweetsService.getSweets();
}

AddController.$inject = ['SweetsService'];
function AddController(SweetsService) {
    var add = this;
    add.sweet = '';
    add.addSweet = function() {
        SweetsService.addSweet(add.sweet);
    }

    add.remove = '';
    add.removeSweet = function() {
        SweetsService.removeSweet(add.remove);
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
