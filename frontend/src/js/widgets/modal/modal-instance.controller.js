(() => {
    angular
        .module('app.widgets')

        // Please note that $uibModalInstance represents a modal window (instance) dependency.
        // It is not the same as the $uibModal service used above.
        // angular-ui Modal
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'items'];
    function ModalInstanceCtrl($scope, $uibModalInstance, items) {
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = () => {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = () => {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();