(() => {
    angular.module('app.widgets')

        // angular-ui progressBar
        .controller('ProgressDemoCtrl', ProgressDemoCtrl);
    ProgressDemoCtrl.$inject = ['$scope'];

    function ProgressDemoCtrl($scope) {
        $scope.max = 200;

        $scope.random = () => {
            const value = Math.floor(Math.random() * 100 + 1);
            let type;

            if (value < 25) {
                type = 'warning';
            } else if (value < 50) {
                type = 'info';
            } else if (value < 75) {
                type = 'success';
            } else {
                type = 'success';
            }

            $scope.showWarning = type === 'danger' || type === 'warning';

            $scope.dynamic = value;
            $scope.type = type;
        };

        $scope.random();
        
        $scope.randomStacked = function() {
            $scope.stacked = [];
            var types = ['success', 'info', 'warning', 'danger'];

            // for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
            //     var index = Math.floor(Math.random() * 4);
            //     $scope.stacked.push({
            //         value: Math.floor(Math.random() * 30 + 1),
            //         type: types[index]
            //     });
            // }
        };

        $scope.randomStacked();
    }
})();