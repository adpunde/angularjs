(function() {
'use strict';

angular.module('ListApp')
.controller('ListController', ListController);

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

})();
