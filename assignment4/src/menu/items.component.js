(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
    templateUrl: 'src/menu/items.component.view.html',
    bindings: {
        menuItems: '<'
    }
});


})();
