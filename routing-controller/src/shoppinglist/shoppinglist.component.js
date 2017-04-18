(function() {
'use strict';

angular.module('ShoppingList')
.component('shoppingList', {
    templateUrl: 'src/shoppinglist/shoppinglist.template.html',
    bindings: {
        items: '<'
    }
});

})();
