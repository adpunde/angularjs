(function() {
'use strict';

angular.module('promiseApp', [])
.controller('ShowController', ShowController)
.controller('AddController', AddController)
.service('SweetsService', SweetsService)
.service('AsyncService', AsyncService);

function SweetsFactory() {
    var factory = function() {
        return new SweetsService();
    };

    return factory;
};

ShowController.$inject = ['SweetsService'];
function ShowController(SweetsService) {
    var show = this;
    var service = SweetsService;
    InitSweets(service);

    show.sweets = service.getSweets();
}

function InitSweets(service) {
    var defaultSweets = [
        "Jalebi", "Gulabjam", "Basudi", "Pedha", "Mahim halva", "Sutarfeni",
        "Bundi ladu"
    ];

    for (var idx = 0; idx < defaultSweets.length; idx++) {
        service.addSweet(defaultSweets[idx]);
    }
};

AddController.$inject = ['SweetsService'];
function AddController(SweetsService) {
    var add = this;
    var service = SweetsService;

    add.sweet = '';
    add.addSweet = function() {
        service.addSweet(add.sweet);
    }

    add.remove = '';
    add.removeSweet = function() {
        service.removeSweet(add.remove);
    };
}

SweetsService.$inject = ['$q', 'AsyncService'];
function SweetsService($q, AsyncService) {
    var service = this;
    var sweets = [];

    service.addSweet = function(sweet) {

        /* Callback style
        var promise = AsyncService.check1(sweet);

        promise.then(function(response) {
            var nextPromise = AsyncService.check2(sweet);

            nextPromise.then(function(response) {
                console.log('Adding sweet ' + sweet);
                sweets.push(sweet);
            }, function (errorResponse) {
                console.log('Check 2 failed: ' + errorResponse.message);
            });
        }, function (errorResponse) {
            console.log('Check 1 failed: ' + errorResponse.message);
        });
        */

        /* async.series style
        var promise = AsyncService.check1(sweet);
        promise
        .then(function(response) {
            return AsyncService.check2(sweet);
        })
        .then(function(response) {
            console.log('Adding sweet ' + sweet);
            sweets.push(sweet);
        })
        .catch(function (errorResponse) {
            errorResponse.message = "Check failed";
            console.log(errorResponse.message);
        });
        */

        /* async.parallel style */
        var check1Promise = AsyncService.check1(sweet);
        var check2Promise = AsyncService.check2(sweet);
        $q.all([check1Promise, check2Promise])
        .then(function(response) {
            console.log('Adding sweet ' + sweet);
            sweets.push(sweet);
        })
        .catch(function (errorResponse) {
            errorResponse.message = "Check failed";
            console.log(errorResponse.message);
        });
    };

    service.getSweets = function() {
        return sweets;
    };

    service.removeSweet = function(sweet) {
        var idx = sweets.indexOf(sweet);
        if (idx != -1)
            sweets.splice(idx, 1);
    };
}

AsyncService.$inject = ['$q', '$timeout'];
function AsyncService($q, $timeout) {
    var service = this;

    service.check1 = function(name) {
        var deferred = $q.defer();
        var result = {
            message: ""
        }
        $timeout(function () {
            if (name.indexOf("malai") === -1) {
                deferred.resolve(result);
            } else {
                result.message = "Malai not allowed";
                deferred.reject(result);
            }
        }, 2000);

        return deferred.promise;
    }

    service.check2 = function(name) {
        var deferred = $q.defer();
        var result = {
            message: ""
        }
        $timeout(function () {
            if (name.indexOf("barfi") === -1) {
                deferred.resolve(result);
            } else {
                result.message = "Barfi not allowed";
                deferred.reject(result);
            }
        }, 1000);

        return deferred.promise;
    }
};

})();
