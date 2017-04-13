(function() {
'use strict';

angular.module('componentApp', [])
.controller('ListController', ListController)
.factory('SweetsFactory', SweetsFactory)
.component('listSweets', {
    templateUrl: 'listitem.html',
    controller: ListComponentController,
    bindings: {
        items: '<',
        title: '@myTitle',
        onRemove: '&'
    }
});

ListComponentController.$inject = [ '$scope', '$element' ];
function ListComponentController($scope, $element) {
    var lst = this;

    lst.barfiInList = function() {
        for (var i = 0; i < lst.items.length; i++) {
            var name = lst.items[i];
            if (name.toLowerCase().indexOf("barfi") !== -1)
                return true;
        }

        return false;
    }

    lst.remove = function(idx) {
        lst.onRemove( {index: idx });
    };

    // Default component methods
    lst.$onInit = function() {
        console.log("onInit");
    };

    lst.$onChanges = function(changeObj) {
        console.log("Changed object", changeObj);
    };

    lst.$postLink = function() {
        $scope.$watch('$ctrl.barfiInList()', function(newValue, oldValue) {
            console.log("Watch: ", newValue);
            if (newValue === true) {
                displayWarning();
            } else {
                removeWarning();
            }
        });

        function displayWarning() {
            var warningElem = $element.find('div.error');
            warningElem.slideDown(900);
        };

        function removeWarning() {
            var warningElem = $element.find('div.error');
            warningElem.slideUp(900);
        };
    };

    lst.$doCheck = function() {
        console.log("Digest cycle called");
    }
}

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
