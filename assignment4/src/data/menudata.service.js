(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService ($http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function () {
        var promise = $http.get(ApiBasePath + '/categories.json')
            .then(function (response) {
                return response.data;
            })
            .catch (function (response) {
                console.log('Error retrieving data');
                return null;
            });

        return promise;
    };

    service.getItemsForCategory = function (categoryShortName) {
        var promise = $http({
            method: "GET",
            url: (ApiBasePath + '/menu_items.json'),
            params: {"category": categoryShortName}
        });

        return promise
            .then(function (response) {
                return response.data;
            })
            .catch (function (response) {
                console.log('Error retrieving data');
                return null;
            });
    };
};

})();
