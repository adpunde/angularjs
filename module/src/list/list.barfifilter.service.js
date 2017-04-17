(function() {
'use strict';

angular.module('ListApp')
.service('BarfiCheckService', BarfiCheckService);

BarfiCheckService.$inject = ['$q', '$timeout'];
function BarfiCheckService($q, $timeout) {
    var service = this;

    service.checkName = function(name) {
        var deferred = $q.defer();
        var result = {
            message: ""
        }
        $timeout(function () {
            if (name.toLowerCase().indexOf("barfi") === -1) {
                console.log("Barfi NOT detected");
                deferred.resolve(result);
            } else {
                console.log("Barfi detected");
                deferred.reject(result);
            }
        }, 2000);

        return deferred.promise;
    }
};

})();
