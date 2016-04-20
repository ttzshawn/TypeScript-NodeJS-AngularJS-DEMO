(() => {
    angular.module('app.layout')
        // dashboard Sidebar
        .controller("SidebarCtrl", SidebarCtrl);

    SidebarCtrl.$inject = ["$scope", "$cookies"];


    function SidebarCtrl($scope, $cookies) {
        /**
         * Sidebar Toggle & Cookies Control
         */
        // const mobileView = 992;
        // $scope.getWidth = () => window.innerWidth;
        // $scope.$watch($scope.getWidth, (newValue, oldValue) => {
        //     if (newValue >= mobileView) {
        //         if (angular.isDefined($cookies.get('toggle'))) {
        //             $scope.toggle = !$cookies.get('toggle') ? true : false;
        //         } else {
        //             $scope.toggle = false;
        //         }
        //     } else {
        //         $scope.toggle = true;
        //     }
        // });
        $scope.toggleSidebar = () => {
            $scope.toggle = !$scope.toggle;
            // $cookies.put('toggle', $scope.toggle);
        };
        // window.onresize = () => {
        //     $scope.$apply();
        // };
    }
})();