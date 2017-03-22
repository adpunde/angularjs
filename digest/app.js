(function() {
'use strict';

angular.module('digestApp', [])
.controller('DigestController', DigestController);

DigestController.$inject = ['$scope'];

function DigestController($scope) {
    $scope.num_watchers = 0;
    $scope.counter = 0;
    $scope.showNumberOfWatchers = function() {
        $scope.num_watchers = $scope.$$watchersCount;
    };

    $scope.countOnce = function() {
        $scope.counter++;
        $scope.num_watchers = $scope.$$watchersCount;
    }

/*    $scope.autoCounter = function() {
        setTimeout( function() {
            $scope.counter++;
            console.log("Auto incremented");
            // Inform angular to update the digest cycle
            $scope.$digest();
        }, 1000);
    };
*/
    $scope.autoCounter = function() {
        setTimeout( function() {
            // Handles exception as opposed to digest
            $scope.$apply(function (){
                $scope.counter++;
                console.log("Auto incremented");
            });
        }, 1000);
    };

    $scope.$watch(function() {
        console.log("Digest loop fired");
    });

/*
    // Do not use watch on variables in general
    $scope.$watch('counter', function(newValue, oldValue) {
        console.log("Old value: " + oldValue);
        console.log("New value: " + newValue);
    });
*/
};

})();
