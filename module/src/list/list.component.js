(function() {
'use strict';

angular.module('ListApp')
.component('listSweets', {
    templateUrl: 'src/list/list.template.html',
    controller: ListComponentController,
    bindings: {
        items: '<',
        title: '@myTitle',
        onRemove: '&'
    }
});

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

})();
