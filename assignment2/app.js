(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
    var buyCtrl = this;
    var service = ShoppingListCheckOffService;

    buyCtrl.list = service.getListToBuy();

    buyCtrl.buyItem = function (item) {
        service.buyItem(item);
    };

    buyCtrl.isEmpty = function () {
        return (buyCtrl.list.length === 0) ? true : false;
    };
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
    var boughtCtrl = this;
    var service = ShoppingListCheckOffService;

    boughtCtrl.list = service.getListBought();

    boughtCtrl.isEmpty = function () {
        return (boughtCtrl.list.length === 0) ? true : false;
    };
};

function ShoppingListCheckOffService () {
    var service = this;

    var listToBuy = [
        { name: 'Cookies', quantity: 50 },
        { name: 'Biscuits', quantity: 20 },
        { name: 'Cakes', quantity: 10 },
        { name: 'Pizza', quantity: 4 },
        { name:'Pasta', quantity: 2 }
    ];

    var listBought = [];

    service.buyItem = function (item) {
        var removedItem;

        for (var i = 0; i < listToBuy.length; i++) {
            if (listToBuy[i].name === item.name) {
                removedItem = listToBuy[i];
                listToBuy.splice(i, 1);
                break;
            }
        }

        listBought.push(removedItem);
    };

    service.getListToBuy = function () {
        return listToBuy;
    };

    service.getListBought = function () {
        return listBought;
    };
};

})();
