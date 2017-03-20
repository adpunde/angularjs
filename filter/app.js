(function() {
    'use strict';

    angular.module('filterApp', [])
    .controller('FilterController', FilterController);

    function FilterController($scope, $filter) {
        $scope.name = "Welcome to Angular JS !";

        $scope.upper = function() {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };

    }
})();
