(() => {
    angular
        .module('app.widgets')
        // angular-ui Modal
        .controller('ModalDemoCtrl', ModalDemoCtrl);

    ModalDemoCtrl.$inject = ['$scope', '$uibModal', '$log'];
    function ModalDemoCtrl($scope, $uibModal, $log) {
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.animationsEnabled = true;
        $scope.open = size => {
            const modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size,
                resolve: {
                    items() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(selectedItem => {
                $scope.selected = selectedItem;
            }, () => {
                $log.info(`Modal dismissed at: ${new Date()}`);
            });
        };
        $scope.toggleAnimation = () => {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    }
})();
