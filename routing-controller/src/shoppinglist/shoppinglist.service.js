(function() {
'use strict';

angular.module('ShoppingList')
.service('ShoppingListService', ShoppingListService);

ShoppingListService.$inject = ['$q', '$timeout'];

function ShoppingListService($q, $timeout) {
    var service = this;

    var items = [];

    items.push({
        name: "Jalebi",
        quantity: "1 kg",
        description: "Main sweet for festivals"
    });

    items.push({
        name: "Gulabjam",
        quantity: "2 kg",
        description: "Kids love gulabjamun"
    });

    items.push({
        name: "Shrikhand",
        quantity: "4 kg",
        description: "Elaichi topped sweet"
    });

    items.push({
        name: "Fruit Salad",
        quantity: "10 kg",
        description: "A blend of delicious fruits mixed with custard"
    });

    service.getItems = function() {
        var deferred = $q.defer();

        $timeout(function () {
            deferred.resolve(items);
        }, 1000);

        return deferred.promise;
    }
};

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
