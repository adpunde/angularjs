(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['$http', 'ApiPath','UserService'];
function SignupController ($http, ApiPath, UserService) {
    var ctrl = this;
    ctrl.user = {};
    ctrl.submitDone = false;
    ctrl.menuNotFound = false;

    ctrl.Submit = function () {
        $http.get(ApiPath + '/menu_items/' + ctrl.user.menu + '.json')
        .then(function (response) {
            ctrl.user.menuData = response.data;
            UserService.storeUserInfo(ctrl.user);
            ctrl.submitDone = true;
            ctrl.menuNotFound = false;
        })
        .catch(function (response) {
            ctrl.menuNotFound = true;
        });
    };
}

})();
