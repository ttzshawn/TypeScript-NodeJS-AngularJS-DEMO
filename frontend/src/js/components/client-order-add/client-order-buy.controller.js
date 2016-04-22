(() => {
    angular
        .module('app.components')
        .controller('clientOrderBuyCtrl', clientOrderBuyCtrl);

    /* @ngInject */
    clientOrderBuyCtrl.$inject = ['$scope'];

    function clientOrderBuyCtrl($scope) {
        $scope.stockInfo = [{ uuid: "_ABC", ric: "", name: "" },
            { uuid: "_ABC", ric: "", name: "" },
            { uuid: "_ABC", ric: "", name: "" }]
    }
})();
