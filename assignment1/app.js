(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
    $scope.lunchMenu = '';

    $scope.checkMenu = function () {

        if ($scope.lunchMenu === '') {
            bindMessage('Please enter data first');
            setLunchMenuBorderStyle('red');
            setMessageFontColor('red');
        }
        else {
            var items = $scope.lunchMenu.split(',');
            if (items.length <= 3) {
                bindMessage('Enjoy!');
            } else {
                bindMessage('Too much!');
            }
            setLunchMenuBorderStyle('green');
            setMessageFontColor('green');
        }
    };

    function bindMessage (message) {
        $scope.message = message;
    };

    function setLunchMenuBorderStyle (color) {
        $scope.lunchMenuStyle = {
            'border': '1px solid ' + color
        }
    }

    function setMessageFontColor (color) {
        $scope.messageStyle = {
            'color': color
        }
    }
};

}());
