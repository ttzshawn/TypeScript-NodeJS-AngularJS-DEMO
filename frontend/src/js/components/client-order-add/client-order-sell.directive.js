(() => {
    angular
        .module('app.components')
        .directive('clientOrderSell', clientOrderSell);

    function clientOrderSell() {
        return {
            scope: {
                icon: "@"
            },
            templateUrl: 'js/components/client-order-add/client-order-sell.html',
            restrict: "E"
        };
    }
})();
