(function() {
'use strict';

angular.module('ShoppingList')
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['items'];

function ShoppingListController(items) {
    var mainList = this;
    mainList.items = items;
};

})();
