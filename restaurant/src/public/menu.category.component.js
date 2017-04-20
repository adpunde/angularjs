(function() {
'use strict';

angular.module('public')
.component('menuCategory', {
    templateUrl: 'src/public/menu-category.html',
    bindings: {
        category: '<'
    }
});

})();
