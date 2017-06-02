(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
    templateUrl: 'src/menu/categories.component.view.html',
    bindings: {
        menulist: '<'
    }
});


})();
