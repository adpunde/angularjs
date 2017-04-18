(function() {
'use strict';

angular.module('ShoppingList')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'src/shoppinglist/home.template.html'
    })
    .state('mainList', {
        url: '/main-list',
        templateUrl: 'src/shoppinglist/main.template.html',
        controller: 'ShoppingListController as mainList',
        resolve: {
            items: ['ShoppingListService', function (ShoppingListService) {
                return ShoppingListService.getItems();
            }]
        }
    })
    .state('itemDetail', {
        url: '/item/{itemId}',
        templateUrl: 'src/shoppinglist/itemdetail.template.html',
        controller: 'ItemDetailController as itemdetail',
        resolve: {
            item: ['$stateParams', 'ShoppingListService',
                function($stateParams, ShoppingListService) {
                    return ShoppingListService.getItems()
                    .then(function (items) {
                        console.log("Item ID ", $stateParams.itemId);
                        console.log(items[$stateParams.itemId]);
                        return items[$stateParams.itemId];
                    });
                }]
        }
    });
};

})();
