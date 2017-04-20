(function() {
'use strict';

angular.module('public')
.config(routeConfig);

routeConfig.$inject = ['$stateProvider'];
function routeConfig($stateProvider) {
    $stateProvider
    .state('public', {
        abstract: true,
        templateUrl: 'src/public.html'
    })
    .state('public.home', {
        url: '/',
        templateUrl: 'src/public.home.html'
    })
}

})();
