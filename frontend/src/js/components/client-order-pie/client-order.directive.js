(() => {
    angular
        .module('app.components')
        .directive('clientOrderPie', clientOrderPie);

    function clientOrderPie() {
        return {
            scope: {
                icon: "@"
            },
            templateUrl: 'js/components/client-order-pie/client-order-pie.html',
            restrict: "E"
        };
    }
})();
