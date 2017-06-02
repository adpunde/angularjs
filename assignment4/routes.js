(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'src/menu/home.view.html'
    })
    .state('categories', {
        url: '/categories',
        templateUrl: 'src/menu/categories.view.html',
        controller: 'CategoriesController',
        controllerAs: 'ctrl',
        resolve: {
             categories: ['MenuDataService', function (MenuDataService) {
                 return MenuDataService.getAllCategories();
             }]
        }
    })
    .state('items', {
        url: '/items/{shortName}',
        templateUrl: 'src/menu/items.view.html',
        controller: 'ItemsController',
        controllerAs: 'ctrl',
        resolve: {
            items: ['$stateParams', 'MenuDataService',
                function($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.shortName);
            }]
        }
    });
};

})();
