(function() {
'use strict';

angular.module('ShoppingList')
.controller('ShoppingListController', ShoppingListController);

// ShoppingListController.$inject = ['ShoppingListService'];
ShoppingListController.$inject = ['items'];

// function ShoppingListController(ShoppingListService) {
function ShoppingListController(items) {
    var mainList = this;
    mainList.items = items;

    // mainList.$onInit = function() {
    //     ShoppingListService.getItems()
    //     .then(function (result) {
    //         mainList.items = result;
    //     });
    // };
};

})();
