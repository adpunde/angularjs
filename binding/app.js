(function() {
    'use strict';

    angular.module('filterApp', [])
    .controller('FilterController', FilterController);

    function FilterController($scope, $filter) {
        $scope.name = "Welcome to Angular JS !";

        $scope.keyup = function() {
            console.log("Input text: " + $scope.name);
        };

        // Change in the variable updates the input field
        $scope.nameChange = function() {
            $scope.name = "Changed";
            console.log("Change input value");
        }

        $scope.setOnetime = function() {
            $scope.onetime = $scope.input2;
            console.log("onetime value: " + $scope.onetime);
        }
    }
})();
