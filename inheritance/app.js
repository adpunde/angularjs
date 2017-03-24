(function() {
'use strict';

var foodItems = [
    "Jalebi", "Gulabjam", "Basudi", "Pedha", "Mahim halva", "Sutarfeni",
    "Bundi ladu"
];

angular.module('loopApp', [])
.controller('LoopController', LoopController)
.controller('ParentCtrl', ParentController)
.controller('ChildCtrl', ChildController)
.controller('ParentCtrl2', ParentController2)
.controller('ChildCtrl2', ChildController2);

LoopController.$inject = ['$scope'];
function LoopController($scope) {
    $scope.foodItems = foodItems;
}

ParentController.$inject = ['$scope'];
function ParentController($scope) {
    $scope.parentValue = 'parentValue';
    $scope.commonValue = 'commonValue';
    $scope.pc = this;
    this.value = "parentValue";
}

ChildController.$inject = ['$scope'];
function ChildController($scope) {
    $scope.childValue = 'childValue';

    console.log("scope.child: ", $scope.parentValue);
    console.log("scope.child.common", $scope.commonValue);
    $scope.commonValue = 'Modified child value';
    console.log("scope.child.common", $scope.commonValue);

    console.log("scope.child.pc.value", $scope.pc.value);
    $scope.pc = this;
    $scope.pc.value = "childValue";
    console.log("scope.child.pc.value", $scope.pc.value);

    console.log("scope.parent: ", $scope.parentValue);
    console.log("scope.parent.common", $scope.commonValue);
    console.log("scope.parent.pc.value", $scope.pc.value);
}

ParentController2.$inject = ['$scope'];
function ParentController2($scope) {
    var parent = this;
    parent.value = "Parent";
    parent.common = "Common";
}

ChildController2.$inject = ['$scope'];
function ChildController2($scope) {
    var child = this;
    child.value = "Child";
}

})();
