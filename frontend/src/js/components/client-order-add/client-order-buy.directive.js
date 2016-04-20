(() => {
    angular
        .module('app.components')
        .directive('clientOrderBuy', clientOrderBuy);

    function clientOrderBuy() {
        return {
            scope: {
                icon: "@"
            },
            templateUrl: 'js/components/client-order-add/client-order-buy.html',
            restrict: "E"
        };
    }
})();
