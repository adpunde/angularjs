(function() {
'use strict';

angular.module('ShoppingList')
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['ShoppingListService'];

function ShoppingListController(ShoppingListService) {
    var mainList = this;
    mainList.items = [];

    mainList.$onInit = function() {
        ShoppingListService.getItems()
        .then(function (result) {
            mainList.items = result;
        });
    };
};

})();
