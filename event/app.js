(function() {
'use strict';

angular.module('componentApp', [])
.controller('ListController', ListController)
.factory('SweetsFactory', SweetsFactory)
.service('BarfiCheckService', BarfiCheckService)
.component('listSweets', {
    templateUrl: 'listitem.html',
    controller: ListComponentController,
    bindings: {
        items: '<',
        title: '@myTitle',
        onRemove: '&'
    }
})
.component('spinner', {
    templateUrl: 'spinner.html',
    controller: SpinnerController
});

SpinnerController.$inject = [ '$rootScope' ];
function SpinnerController($rootScope) {
    var $ctrl = this;

    var cancelListener = $rootScope.$on('sweets:processing', function (event, data) {
        console.log('event: ', event);
        console.log('data: ', data);

        if (data.on) {
            $ctrl.showSpinner = true;
        }
        else {
            $ctrl.showSpinner = false;
        }
    });

    // Deregsiter the listener on rootScope
    $ctrl.$onDestroy = function() {
        cancelListener();
    };
};

ListComponentController.$inject = [ '$rootScope', '$element',
    '$q', 'BarfiCheckService'];
function ListComponentController($rootScope, $element, $q, BarfiCheckService) {
    var lst = this;
    var totalItems;

    lst.remove = function(idx) {
        lst.onRemove( {index: idx });
    };

    // Default component methods
    lst.$onInit = function() {
        console.log("onInit");
        totalItems = 0;
    };

    lst.$onChanges = function(changeObj) {
        console.log("Changed object", changeObj);
    };

    lst.$doCheck = function() {
        console.log("Digest cycle called, length: ", lst.items.length);
        if (lst.items.length !== totalItems) {
            totalItems = lst.items.length;

            $rootScope.$broadcast('sweets:processing', {on: true});
            var promises = [];
            for (var i = 0; i < lst.items.length; i++) {
                promises.push(BarfiCheckService.checkName(lst.items[i]));
            }

            $q.all(promises)
            .then(function (result) {
                console.log("then");
                var warningElem = $element.find('div.error');
                warningElem.slideUp(900);
            })
            .catch(function (result){
                console.log("catch");
                var warningElem = $element.find('div.error');
                warningElem.slideDown(900);
            })
            .finally(function () {
                $rootScope.$broadcast('sweets:processing', {on: false});
            });
        }
    }
}

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

function SweetsFactory() {
    var factory = function() {
        return new SweetsService();
    };

    return factory;
};

ListController.$inject = ['SweetsFactory'];
function ListController(SweetsFactory) {
    var list = this;
    var service = SweetsFactory();
    list.sweet = '';
    list.lastRemoved = '';

    list.addSweet = function() {
        service.addSweet(list.sweet);
    }

    list.removeSweet = function(idx) {
        service.removeSweet(idx);
    };

    list.removeItem = function(idx) {
        this.lastRemoved = "Last sweet removed: " + list.allsweets[idx];
        service.removeSweet(idx);
    };

    list.allsweets = service.getSweets();
}

function SweetsService() {
    var service = this;
    var sweets = [
        "Jalebi", "Gulabjam", "Basudi", "Pedha", "Mahim halva", "Sutarfeni",
        "Bundi ladu"
    ];

    service.addSweet = function(sweet) {
        console.log('Adding sweet');
        sweets.push(sweet);
        console.log(sweets);
    };

    service.getSweets = function() {
        return sweets;
    };

    service.removeSweet = function(idx) {
        if (idx != -1)
            sweets.splice(idx, 1);
    };
}

})();
