(function () {
'use strict';

angular.module('httpApp', [])
.controller('MenuController', MenuController)
.service('MenuService', MenuService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuController.$inject = [ 'MenuService' ];

function MenuController(MenuService) {
    var menu = this;

    var promise = MenuService.getMenuCategories();

    promise
    .then (function(response) {
        menu.categories = response.data;
    })
    .catch(function(error) {
        console.log("Error retrieving menu");
    });

    menu.getMenuItems = function(shortName) {
        var promise = MenuService.getMenuItems(shortName);
        promise
        .then (function(response) {
            var items = response.data.menu_items;
            for (var i = 0; i < items.length; i++)
                console.log(items[i].name);
        })
        .catch(function(error) {
                console.log("Error retrieving menu");
        });
    };
};

MenuService.$inject = [ '$http', 'ApiBasePath' ];
function MenuService($http, ApiBasePath) {
    var service = this;

    service.getMenuCategories = function () {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        });

        return response;
    };

    service.getMenuItems = function(shortName) {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {
                category: shortName
            }
        });

        return response;
    };
};

})();
