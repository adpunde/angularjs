(function() {
'use strict';

var foodItems = [
    "Jalebi", "Gulabjam", "Basudi", "Pedha", "Mahim halva", "Sutarfeni",
    "Bundi ladu"
];

angular.module('loopApp', [])
.controller('LoopController', LoopController);

LoopController.$inject = ['$scope'];

function LoopController($scope) {
    $scope.foodItems = foodItems;
}
})();
