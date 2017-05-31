(function () {

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.controller('MenuDirectiveController', MenuDirectiveController)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

function FoundItems () {
    var ddo = {
        template:
            " \
            <div id='MenuItems'> \
                <ul> \
                    <li class='well well-sm' ng-repeat='item in ctrl.items'> \
                        {{item.name}}, {{item.short_name}} \
                        <p> {{item.description}} </p> \
                        <button ng-click='ctrl.onRemove({index: $index});'> \
                            Don't want this one! \
                        </button> \
                    </li> \
                </ul> \
            </div> \
            <div ng-if='ctrl.noItems();'>Nothing found </div>",
        restrict: 'E',
        scope: {
            items: '<',
            onRemove: '&'
        },
        controller: 'MenuDirectiveController as ctrl',
        bindToController: true
    };

    return ddo;
};

function MenuDirectiveController () {
    var ctrl = this;

    ctrl.noItems = function () {
        if (ctrl.items && ctrl.items.length === 0)
            return true;
        return false;
    };
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = '';
    ctrl.found = null;

    ctrl.narrowItDown = function () {
        if (ctrl.searchTerm === '') {
            ctrl.found = [];
            return;
        }

        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

        promise.then(function (foundItems) {
            if (!foundItems)
                return;
            ctrl.found = foundItems;
        });
    };

    ctrl.removeItem = function (index) {
        ctrl.found.splice(index, 1);
    };
};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        var foundItems = [];

        var promise = $http({
            method: "GET",
            url: (ApiBasePath + '/menu_items.json')
        });

        searchTerm = searchTerm.toLowerCase();
        console.log(searchTerm);
        return promise
            .then(function (response) {
                response.data.menu_items.forEach(function (item) {
                    if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
                        foundItems.push(item);
                    }
                });

                //console.log(response.data.menu_items.length, foundItems.length);
                return foundItems;
            })
            .catch (function (response) {
                console.log('Error retrieving data');
                return null;
            });
    };
};

})();
