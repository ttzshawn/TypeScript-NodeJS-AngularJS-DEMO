(function() {
    'use strict';

    angular
        .module('app.widgets')
        // angular-ui Modal
        .controller('ModalDemoCtrl', ModalDemoCtrl);

    ModalDemoCtrl.$inject = ['$scope', '$uibModal', '$log'];
    function ModalDemoCtrl($scope, $uibModal, $log) {
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.animationsEnabled = true;
        $scope.open = function(size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.toggleAnimation = function() {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    }
})();
