(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);

function UserService() {
    var service = this;
    var userInfo = {};
    var infoStored = false;

    service.storeUserInfo = function (info) {
        userInfo = info;
        infoStored = true;
    };

    service.getUserInfo = function () {
        if (!infoStored)
            return null;
        return userInfo;
    };
};

})();
