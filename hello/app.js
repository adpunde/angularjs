(function() {
    'use strict';

    angular.module('myFirstApp', [])

    .controller('MyFirstController', function($scope) {
        $scope.message = "Hello world !";
        $scope.greet = function() {
            return "Welcome to Angular JS !";
        };

        $scope.name = "";
        $scope.value = 0;
        $scope.length = 0;

        $scope.keyup = function() {
            var total = calculateNumeric($scope.name);
            $scope.length = $scope.name.length;
            $scope.value = total;
        };

        function calculateNumeric(string) {
            var val = 0;
            for (var i = 0; i < string.length; i++) {
                val += string.charCodeAt(i);
            }

            return val;
        }

    });
})();
