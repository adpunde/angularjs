(function() {
'use strict';

angular.module('FormApp', [])
.controller('RegistrationController', RegistrationController);

function RegistrationController() {
    var reg = this;

    reg.submit = function() {
        reg.completed = true;
    }
};

})();
