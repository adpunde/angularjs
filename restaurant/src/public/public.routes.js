(function() {
'use strict';

angular.module('public')
.config(routeConfig);

routeConfig.$inject = ['$stateProvider'];
function routeConfig($stateProvider) {
    $stateProvider
    .state('public', {
        abstract: true,
        templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
        url: '/',
        templateUrl: 'src/public/public.home.html'
    })
    .state('public.menu', {
        url: '/menu',
        templateUrl: 'src/public/menu.html',
        controller: 'MenuController',
        controllerAs: 'menuCtrl',
        resolve: {
            menuCategories: ['MenuService', function(MenuService) {
                return MenuService.getCategories();
            }]
        }
    })
    .state('public.menuitems', {
        url: '/menu/{category}',
        templateUrl: 'src/public/menu-items.html',
        controller: 'MenuItemsController',
        controllerAs: 'menuItemsCtrl',
        resolve: {
            menuItems: ['$stateParams', 'MenuService', function($stateParams, MenuService) {
                return MenuService.getMenuItems($stateParams.category);
            }]
        }
    })
}

})();