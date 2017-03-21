(function() {
'use strict';

angular.module('filterApp', [])
.controller('FilterController', FilterController)
.filter('custom', CustomFilterFactory);

FilterController.$inject = ['$scope', 'customFilter'];

function FilterController($scope, customFilter) {
    $scope.applyFilter = function() {
        $scope.name = customFilter($scope.name, "arg");
    };

};

function CustomFilterFactory() {
    return function(input, arg) {
        var output = "Custom filter: " + input + " " + arg;
        return output;
    }
};

})();
