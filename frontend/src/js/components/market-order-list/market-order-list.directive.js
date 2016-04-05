(function() {
    'use strict';

    angular
        .module('app.components')
        .directive('marketOrderList', marketOrderList);

    function marketOrderList() {
        return {
            scope: {
                icon: "@"
            },
            templateUrl: 'js/components/market-order-list/market-order-list.html',
            restrict: "E"
        };
    }


})();
