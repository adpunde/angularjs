(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['ApiPath', 'UserService'];
function MyInfoController (ApiPath, UserService) {
    var ctrl = this;
    ctrl.basePath = ApiPath;
    ctrl.user = UserService.getUserInfo();
}

})();
