(() => {
    angular
        .module('app.components')
        .controller('CoListCtrl', CoListCtrl);

    CoListCtrl.$inject = ['$scope', '$rootScope', 'clientOrder', 'marketOrder', 'mo'];

    /* @ngInject */
    function CoListCtrl($scope, $rootScope, clientOrder, marketOrder, mo) {

        $scope.selectedClientOrderId = "";
        // $scope.marketOrderList = [];
        $scope.showMarketOrderList = id => {
            if ($scope.selectedClientOrderId != id) {
                $scope.selectedClientOrderId = id;
                queryMarketOrderList(id);
            }
        }

        $scope.closeMarketOrderList = () => {
            // $scope.close = !$scope.close;
            console.log($scope.selectedClientOrderId);
            $scope.selectedClientOrderId = "";
            console.log($scope.selectedClientOrderId);
        }

        // init
        clientOrder.query({}, res => {
            $scope.clientOrderItems = res;
        });


        // $interval(queryMarketOrderList, 1000);

        const queryMarketOrderList = (id) => {
            marketOrder.query({ coId: id }, res => {
                mo.set(res);
                $scope.$broadcast('market-orde-have-been-set');
                console.log(res)
            });
        }

    }

})();
