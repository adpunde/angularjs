(function() {
'use strict';

angular.module('serviceApp', [])
.controller('ShowController', ShowController)
.controller('AddController', AddController)
.provider('SweetsService', SweetsProvider)
.config(Config);

Config.$inject = ['SweetsServiceProvider'];
function Config(SweetsServiceProvider) {
    SweetsServiceProvider.defaults.sweets = [
        "Jalebi", "Gulabjam", "Basudi", "Pedha", "Mahim halva", "Sutarfeni",
        "Bundi ladu"
    ];
}

function SweetsProvider() {
    var provider = this;

    provider.defaults = {
    };

    provider.$get = function() {
        var swServ = new SweetsService(provider.defaults.sweets);
        return swServ;
    };
};

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
        add.errorMessage = '';
        try {
            SweetsService.addSweet(add.sweet);
        } catch (error) {
            add.errorMessage = error.message;
        }
    }

    add.remove = '';
    add.removeSweet = function() {
        SweetsService.removeSweet(add.remove);
    };
}

function SweetsService(defaultSweets) {
    var service = this;
    var sweets = [];

    console.log(defaultSweets);
    for (var idx = 0; idx < defaultSweets.length; idx++) {
        sweets.push(defaultSweets[idx]);
    }

    service.addSweet = function(sweet) {
        if (sweet === '')
            throw new Error('Empty sweet name');
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
